import type { Request, Response } from 'express';

import * as conversationRepository from "../repositories/conversation.repository.js";
import * as messageRepository from "../repositories/message.repository.js";

import * as retrieverService from "./retriever.service.js";

import { generateResponse } from "../llm/chat.js";
// import { generateResponse } from "../providers/mock.provider.js";
import { llm } from "../llm/llm.provider.js";

import type { LLMMessage } from "../llm/types.js";
import { buildPrompt } from "../prompts/buildPrompt.js";
import { formatResponse } from '../prompts/response.format.js';

import { logTokenUsage } from '../utils/token.logger.js';

type ChatInput = {
  conversationId?: string;
  prompt: string;
};

export async function chat({
  conversationId,
  prompt
}: ChatInput) {

  // Step 1
  // Find existing conversation
  let conversation = null;

  if (conversationId) {
    conversation = await conversationRepository.findById(conversationId);
  }

  // Step 2
  // If conversation doesn't exist, create one
  if (!conversation) {
    conversation =
      await conversationRepository.create(
        prompt.substring(0, 40)
      );
  }

  // Step 3
  // Save user message
  await messageRepository.create({
    conversationId: conversation.id,
    role: "user",
    content: prompt,
  });

  // Step 4
  // Load all messages
  const messages =
    await messageRepository.findByConversationId(conversation.id);

  // Step 5
  // Convert database rows into OpenAI format
  const history: LLMMessage[] = messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));

  const retrieved =
    await retrieverService.retrieve(prompt);

  const context =
    retrieved
      .map(
        (chunk) => chunk.content
      )
      .join("\n\n");

  // Step 6
  // Ask AI
  const setupPromp = buildPrompt(
    "general",
    history,
    context
  );

  const answer = await generateResponse(setupPromp);

  const formatted = formatResponse(answer);

  // Step 7
  // Save assistant response
  const assistantMessage =
    await messageRepository.create({
      conversationId: conversation.id,
      role: "assistant",
      content: formatted,
    });

  // Step 8
  // Return response
  return {
    conversation,
    assistantMessage,
    sources:
      retrieved.map(
        (chunk) => ({
          id: chunk.document_id,
          chunkIndex: chunk.chunk_index,
          similarity: chunk.similarity,
          preview: chunk.content.substring(0, 150),
        })
      )
  };
}

export async function stream(
  req: Request,
  res: Response
) {

  const {
    conversationId,
  } = req.body;

  // Find or create conversation
  let conversation = null;

  if (conversationId) {
    conversation = await conversationRepository.findById(conversationId);
  }

  if (!conversation) {
    conversation = await conversationRepository.create(
      req.body.prompt.substring(0, 40)
    );
  }

  // Save user message
  await messageRepository.create({
    conversationId: conversation.id,
    role: "user",
    content: req.body.prompt,
  });

  // Load history
  const messages =
    await messageRepository.findByConversationId(
      conversation.id
    );
  
  const history: LLMMessage[] =
    messages.map((item) => ({
      role: item.role,
      content: item.content
    }));

  const retrieved =
    await retrieverService.retrieve(req.body.prompt);

  const context =
    retrieved
      .map(
        (chunk) => chunk.content
      )
      .join("\n\n");

  const setupPrompt =
    buildPrompt(
      "general",
      history,
      context
    );

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  // req.on("close", () =>{
  //   console.log("Client disconnected.");
  // });

  // const timeout = setTimeout(() => {
  //   res.end();
  // }, 60_000);

  for await (const token of llm.stream(setupPrompt)) {
    fullResponse +=token;
    res.write(token);
  }

  const formatted = formatResponse(fullResponse);

  logTokenUsage({
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0
  });

  await messageRepository.create({
    conversationId: conversation.id,
    role: "assistant",
    content: formatted,
  });

  res.end();
}
