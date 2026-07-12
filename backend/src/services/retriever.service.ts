import { mockEmbedProvider } from "../providers/mock.embed.provider.js";

import * as chunkRepository from "../repositories/documentChunk.repository.js";

import { cosineSimilarity } from "../utils/cosineSimilarity.js";

import { memoryCache } from "../cache/memory.provider.js";
import type { RetrieveOptions } from "../types/retriever.js";

const TOP_K = 3;

export async function retrieve(
  question: string,
  options: RetrieveOptions = {}
) {

  // Step 1

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
      3600
    );
  }

  // Step 2
  const chunks =
    options.documentId ?
      await chunkRepository.findByDocumentId(options.documentId)
      :
      await chunkRepository.findAll();

  // Step 3
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

  const threshold =
    options.similarityThreshold ?? 0.65;

  const topK =
    options.topK ?? 3;

  const filtered =
    ranked.filter(
      chunk =>
          chunk.similarity >= threshold
    );

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
