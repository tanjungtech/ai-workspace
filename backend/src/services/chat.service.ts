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

// export async function chat({
//   conversationId,
//   prompt
// }: ChatInput) {

//   // Step 1
//   // Find existing conversation
//   let conversation = null;

//   if (conversationId) {
//     conversation = await conversationRepository.findById(conversationId);
//   }

//   // Step 2
//   // If conversation doesn't exist, create one
//   if (!conversation) {
//     conversation =
//       await conversationRepository.create(
//         prompt.substring(0, 40)
//       );
//   }

//   // Step 3
//   // Save user message
//   await messageRepository.create({
//     conversationId: conversation.id,
//     role: "user",
//     content: prompt,
//   });

//   // Step 4
//   // Load all messages
//   const messages =
//     await messageRepository.findByConversationId(conversation.id);

//   // Step 5
//   // Convert database rows into OpenAI format
//   const history: LLMMessage[] = messages.map((message) => ({
//     role: message.role,
//     content: message.content,
//   }));

//   const retrieved =
//     await retrieverService.retrieve(prompt);

//   const context =
//     retrieved
//       .map(
//         (chunk) => chunk.content
//       )
//       .join("\n\n");

//   // Step 6
//   // Ask AI
//   const setupPrompt = buildPrompt(
//     "general",
//     history,
//     context
//   );

//   const answer = await generateResponse(setupPrompt);

//   const formatted = formatResponse(answer);

//   // Step 7
//   // Save assistant response
//   const assistantMessage =
//     await messageRepository.create({
//       conversationId: conversation.id,
//       role: "assistant",
//       content: formatted,
//     });

//   // Step 8
//   // Return response
//   return {
//     conversation,
//     assistantMessage,
//     sources:
//       retrieved.map(
//         (chunk) => ({
//           documentId: chunk.document_id,
//           documentname: chunk.document_name,
//           chunkIndex: chunk.chunk_index,
//           similarity: chunk.similarity,
//           preview: chunk.content.substring(0, 150),
//         })
//       )
//   };
// }

export async function chat({
  conversationId,
  prompt
}: ChatInput) {
  // Shared Preparation
  const {
    conversation,
    history,
    retrieved,
    context,
  } = await prepareChatContext (
    conversationId,
    prompt
  );

  // Build Prompt
  const setupPrompt =
    buildPrompt(
      "general",
      history,
      context
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
  res.end();
}
