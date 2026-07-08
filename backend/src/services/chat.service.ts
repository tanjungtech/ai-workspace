import type { Request, Response } from 'express';

import * as conversationRepository from "../repositories/conversation.repository.js";
import * as messageRepository from "../repositories/message.repository.js";

import { generateResponse } from "../llm/chat.js";
// import { generateResponse } from "../providers/mock.provider.js";

import type { LLMMessage } from "../llm/types.js";
import { buildPrompt } from "../prompts/buildPrompt.js";

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

  // Step 6
  // Ask AI
  const setupPromp = buildPrompt(
    "general",
    history
  );

  const answer = await generateResponse(setupPromp);

  // Step 7
  // Save assistant response
  const assistantMessage =
    await messageRepository.create({
      conversationId: conversation.id,
      role: "assistant",
      content: answer,
    });

  // Step 8
  // Return response
  return {
    conversation,
    assistantMessage,
  };
}

export async function stream(
  req: Request,
  res: Response
) {

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const tokens = [
    "Hello ",
    "this ",
    "is ",
    "a ",
    "streaming ",
    "response.",
  ];

  for (const token of tokens) {
    res.write(token);

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          200
        )
    );
  }

  res.end();
  req.on("close", () => {
    console.log("Client disconnected.");
  });
  
  const timeout =
    setTimeout(() => {
      res.end();
    }, 60_000);
  
  res.on("close", () => {
    clearTimeout(timeout);
  });
}
