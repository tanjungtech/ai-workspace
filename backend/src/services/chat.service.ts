import type { Request, Response } from 'express';

// import * as conversationRepository from "../repositories/conversation.repository.js";
import * as messageRepository from "../repositories/message.repository.js";

// import * as retrieverService from "./retriever.service.js";

import { generateResponse } from "../llm/chat.js";
// import { generateResponse } from "../providers/mock.provider.js";

import { llm } from "../llm/llm.provider.js";

import type { LLMMessage } from "../llm/types.js";
import { buildPrompt } from "../prompts/buildPrompt.js";
import { formatResponse } from '../prompts/response.format.js';

import { logTokenUsage } from '../utils/token.logger.js';
import { prepareChatContext } from './chatContext.service.js';
import * as memoryService from "../memory/memory.service.js";

import {
  runAgent,
  runAgentStream,
} from "../agent/index.js";

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
    // retrieved
  } = await prepareChatContext (
    conversationId,
    prompt
  );

  // Run Agent
  const result = await runAgent({
    prompt,
    history,
  });

  // Format
  const formatted = formatResponse(result.answer);

  // Save Assistant
  const assistantMessage = saveAssistantMessage(conversation.id, formatted, prompt);
  
  // Response
  return {
    conversation,
    assistantMessage,
    sources: result.sources,
    toolHistory: result.toolHistory,
    statusHistory: result.statusHistory,
  };

}

export async function stream(
  req: Request,
  res: Response
) {

  // Prepare Conversation

  const {
    conversation,
    history,
    // retrieved,
    // context,
  } = await prepareChatContext(
    req.body.conversationId,
    req.body.prompt
  );

  // Run Agent
  // const result = await runAgent({
  //   prompt: req.body.prompt,
  //   history,
  // });

  // SSE Headers

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Run Streaming Runtime
  const result =
    await runAgentStream({
      prompt: req.body.prompt,
      history,
      async onToken(token) {
        res.write(
          `event: token\n`
        );
        res.write(
          `data: ${token}\n\n`
        );
      },
    });

  // Stream Status
  for (
    const status
    of result.statusHistory
  ) {
    res.write(`event: status\n`);
    res.write(`data: ${status}\n\n`);
  }

  // Save Assistant Message

  const formatted = formatResponse(result.answer);

  saveAssistantMessage(conversation.id, formatted, req.body.prompt);

  // Token Usage
  logTokenUsage({
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0
  });

  // Return sources
  res.write("event: sources\n");
  res.write(`data: ${JSON.stringify(result.sources)}\n\n`);

  // Finish
  res.write("event: done\n");
  res.write("data: complete\n\n");

  res.end();

  // // Stream

  // let fullResponse = "";

  // const prompt: LLMMessage[] = [
  //   {
  //     role: "assistant",
  //     content: result.answer,
  //   },
  // ];

  // // const setupPrompt =
  // //   buildPrompt(
  // //     "general",
  // //     history,
  // //     // context
  // //   );

  // for await (const token of llm.stream(prompt)) {
  //   fullResponse += token;
  //   res.write(`event: token\n`);
  //   res.write(`data: ${token}\n\n`);
  // }

  // // Finish
  // res.write(
  //   "event: done\n"
  // );

  // res.write(
  //   "data: complete\n\n"
  // );

  // res.end();
}

async function saveAssistantMessage(
  conversationId: string,
  formatted: string,
  prompt: string
) {
  await memoryService.extractAndStoreMemory({
    conversationId,
    userPrompt: prompt,
    assistantResponse: formatted,
  });
  return await messageRepository.create({
    conversationId,
    role: "assistant",
    content: formatted,
  });
}
