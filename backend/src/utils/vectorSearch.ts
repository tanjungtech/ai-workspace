import { cosineSimilarity } from "./cosineSimilarity.js";

export interface VectorItem {
  embedding: number[];
}

// export interface RankedVector<T>
//   extends T {
//     similarity: number;
// }

export type RankedVector<T> = T & {
  similarity: number;
};

export function vectorSearch
<T extends VectorItem>(
  queryEmbedding: number[],
  items: T[],
  threshold = 0.65,
  topK = 3
): RankedVector<T>[] {
  return items
    .map(item => ({
      ...item,
      similarity:
        cosineSimilarity(
          queryEmbedding,
          item.embedding
        ),
    }))
    .filter(
      item => item.similarity >= threshold
    )
    .sort((a, b) =>
      b.similarity - a.similarity
    )
    .slice(0, topK);
}
