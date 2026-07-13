import type { Request, Response } from 'express';

// import * as conversationRepository from "../repositories/conversation.repository.js";
import * as messageRepository from "../repositories/message.repository.js";

// import * as retrieverService from "./retriever.service.js";

import { generateResponse } from "../llm/chat.js";
// import { generateResponse } from "../providers/mock.provider.js";
import { llm } from "../llm/llm.provider.js";

// import type { LLMMessage } from "../llm/types.js";
import { buildPrompt } from "../prompts/buildPrompt.js";
import { formatResponse } from '../prompts/response.format.js';

import { logTokenUsage } from '../utils/token.logger.js';
import { prepareChatContext } from './chatContext.service.js';

type ChatInput = {
  conversationId?: string;
  prompt: string;
};

export async function chat({
  conversationId,
  prompt
}: ChatInput) {
  // Shared Preparation
  const {
    conversation,
    history,
    retrieved
  } = await prepareChatContext (
    conversationId,
    prompt
  );

  // Build Prompt
  const setupPrompt =
    buildPrompt(
      "general",
      history,
      // context
    );

  // Generate Response
  const answer =
    await generateResponse(setupPrompt);

  const formatted = formatResponse(answer);

  //Save Assistant Message
  const assistantMessage =
    await messageRepository.create({
      conversationId: conversation.id,
      role: "assistant",
      content: formatted,
    });

  // Return
  return {
    conversation,
    assistantMessage,
    sources:
      retrieved.map(chunk => ({
        documentId: chunk.document_id,
        documentName: chunk.document_name,
        chunkIndex: chunk.chunk_index,
        similarity: chunk.similarity,
        preview: chunk.content.substring(0, 150),
      })),
  };

}

export async function stream(
  req: Request,
  res: Response
) {

  // Shared Preparation

  const {
    conversation,
    history,
    retrieved,
    context,
  } = await prepareChatContext(
    req.body.conversationId,
    req.body.prompt
  );

  const setupPrompt =
    buildPrompt(
      "general",
      history,
      context
    );

  // SSE Headers

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Stream

  let fullResponse = "";

  for await (const token of llm.stream(setupPrompt)) {
    fullResponse +=token;
    res.write(token);
  }

  // Save Assistant Message

  const formatted = formatResponse(fullResponse);

  await messageRepository.create({
    conversationId: conversation.id,
    role: "assistant",
    content: formatted,
  });

  logTokenUsage({
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0
  });

  // Finish
  res.write(
    "event: done\n"
  );

  res.write(
    "data: complete\n\n"
  );

  res.end();
}
