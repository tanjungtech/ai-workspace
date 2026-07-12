import { mockEmbedProvider } from "../providers/mock.embed.provider.js";

import * as chunkRepository from "../repositories/documentChunk.repository.js";

import { cosineSimilarity } from "../utils/cosineSimilarity.js";

import { memoryCache } from "../cache/memory.provider.js";
import type { RetrieveOptions } from "../types/retriever.js";
import { RAG_CONFIG } from "../config/rag.config.js";

// const TOP_K = 3;

export async function retrieve(
  question: string,
  options: RetrieveOptions = {}
) {

  // Step 1
  // Embedding Cache

  const embeddingKey =
    `embedding:${question}`;

  const cachedEmbedding =
    await memoryCache.get<number[]>(
      embeddingKey
    );

  let queryEmbedding: number[];

  if (cachedEmbedding) {
    queryEmbedding = cachedEmbedding;
  } else {
    queryEmbedding =
      await mockEmbedProvider.embed(question);

    await memoryCache.set(
      embeddingKey,
      queryEmbedding,
      RAG_CONFIG.embeddingCacheTTL
    );
  }

  // Step 2
  // Load Chunks

  const chunks =
    options.documentId ?
      await chunkRepository.findByDocumentId(options.documentId)
      :
      await chunkRepository.findAll();

  // Step 3
  // Rank by Similarity

  const ranked =
    chunks.map(chunk => ({
      ...chunk,
      similarity:
        cosineSimilarity(
          queryEmbedding,
          chunk.embedding
        ),
    }))
    .sort(
      (a, b) => b.similarity - a.similarity
    );

  // Step 4
  // Apply Threshold

  const threshold =
    options.similarityThreshold ?? RAG_CONFIG.similarityThreshold;

  const filtered =
    ranked.filter(
      chunk =>
          chunk.similarity >= threshold
    );

  // Step 5
  // Top K

  const topK =
    options.topK ?? RAG_CONFIG.topK;

  return filtered.slice(0, topK);

  // // Step 4
  // await memoryCache.set(
  //   `retrieve:${question}`,
  //   ranked.slice(
  //     0, TOP_K
  //   ),
  //   300
  // );

  // // Step 5
  // return ranked.slice(0, TOP_K);
}
