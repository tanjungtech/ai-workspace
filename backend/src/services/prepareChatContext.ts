import * as messageRepository
  from "../repositories/message.repository.js";

import * as retrieverService
  from "./retriever.service.js";

import * as memoryService
  from "../memory/memory.service.js";

import type { LLMMessage } from "../llm/types.js";
import { formatMemoryContext } from "../memory/formatMemoryContext.js";

export interface PreparedChatContext {
  history: LLMMessage[];
  context: string;
  sources: {
    id: string;
    chunkIndex: number;
    similarity: number;
    preview: string;
  }[];
  memories: Awaited<
    ReturnType<
      typeof memoryService.retrieveMemories
    >
  >;
}

export async function prepareChatContext(
  conversationId: string | "",
  prompt: string
): Promise<PreparedChatContext> {
  // Conversation history
  const message =
    await messageRepository.findByConversationId(conversationId);

  const history: LLMMessage[] =
    message.map(message => ({
      role: message.role,
      content: message.content,
    }));

  // Retrieve document chunks
  const retrievedDocuments = await retrieverService.retrieve(prompt);

  const documentContext =
    retrievedDocuments
      .map(chunk => chunk.content)
      .join("\n\n");

  // Retrieve memories
  const memories =
    await memoryService.retrieveMemories(
      conversationId,
      prompt
    );

  const memoryContext = formatMemoryContext(memories);

  // Merge every context source
  const context = [
    documentContext,
    memoryContext,
  ].filter(Boolean)
  .join("\n\n");

  // Sources for frontend/debug
  const sources =
    retrievedDocuments.map(chunk => ({
      id: chunk.document_id,
      chunkIndex: chunk.chunk_index,
      similarity: chunk.similarity,
      preview: chunk.content.substring(0, 150),
    }));

  return {
    history,
    context,
    sources,
    memories
  };
}
