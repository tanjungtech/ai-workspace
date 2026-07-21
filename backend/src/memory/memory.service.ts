import * as memoryRepository
  from "../repositories/memory.repository.js";

import { mockEmbedProvider } from "../providers/mock.embed.provider.js";
import { vectorSearch } from "../utils/vectorSearch.js";
import { generateResponse } from "../llm/chat.js";
import { buildMemoryPrompt } from "../prompts/buildMemoryPrompt.js";

import type {
  RetrievedMemory,
} from "../types/memory.js";

type ExtractedMemory = {
  type: string;
  content: string;
  importance: number;
};

export async function CreateMemory(
  conversationId: string,
  type: string,
  content: string,
  importance = 0.5,
  metadata: Record<string, unknown> = {}
) {
  const embedding =
    await mockEmbedProvider.embed(content);

  return memoryRepository.create({
    conversation_id: conversationId,
    type,
    content,
    embedding,
    importance,
    metadata,
  });
}

export async function retrieveMemories(
  conversationId: string,
  question: string
): Promise<RetrievedMemory[]> {
  const memories =
    await memoryRepository.findByConversationId(conversationId);

  if (!memories.length) {
    return [];
  }
  
  const embedding =
    await mockEmbedProvider.embed(question);

  return vectorSearch(
    embedding,
    memories,
    0.65,
    5
  );
}

export async function extractAndStoreMemory({
  conversationId,
  userPrompt,
  assistantResponse
}: {
  conversationId: string;
  userPrompt: string;
  assistantResponse: string;
}) {
  const prompt =
    buildMemoryPrompt(userPrompt, assistantResponse);

  const response =
    await generateResponse(prompt);
    
  let memories: ExtractedMemory[];

  try {
    memories = JSON.parse(response);
  } catch {
    return [];
  }

  const saved = [];

  for (const memory of memories) {
    if (
      !memory.content ||
      !memory.type
    ) {
      continue;
    }

    const created =
      await CreateMemory(
        conversationId,
        memory.type,
        memory.content,
        memory.importance ?? 0.5
      )

    saved.push(created);
  }

  return saved;
}
