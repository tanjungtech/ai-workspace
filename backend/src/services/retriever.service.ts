import { mockEmbedProvider } from "../providers/mock.embed.provider.js";

import * as chunkRepository from "../repositories/documentChunk.repository.js";

import { cosineSimilarity } from "../utils/cosineSimilarity.js";

const TOP_K = 3;

export async function retrieve(
  question: string
) {
  const queryEmbedding =
    await mockEmbedProvider.embed(question);

  const chunks =
    await chunkRepository.findAll();

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

  return ranked.slice(0, TOP_K);
}
