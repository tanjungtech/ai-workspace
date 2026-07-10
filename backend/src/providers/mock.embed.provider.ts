import type { EmbedProvider } from "../llm/embed.provider.js";

export const mockEmbedProvider:EmbedProvider = {
  async embed(text: string) {
    const embedding: number[] = [];

    let seed = 0;

    for (const c of text) {
      seed += c.charCodeAt(0);
    }

    for (let i = 0; i<128; i++) {
      embedding.push(
        Math.sin(seed + 1)
      );
    }

    return embedding;
  }
}