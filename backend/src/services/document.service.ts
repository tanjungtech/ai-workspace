import * as documentRepository from "../repositories/document.repository.js";
import * as chunkRepository from "../repositories/documentChunk.repository.js";

import { createParser } from "../parsers/parser.factory.js";
import { mockEmbedProvider } from "../providers/mock.embed.provider.js";
import { findByDocumentId } from "../repositories/documentChunk.repository.js";

import { memoryCache } from "../cache/memory.provider.js";

type CreateDocumentInput = {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  filePath: string;
};

const CHUNK_SIZE = 1000;

export async function create(
  input: CreateDocumentInput
) {
  const parser = createParser(input.mimeType);
  
  const text = await parser.parse(input.filePath);

  const document =
    await documentRepository.create({
      filename: input.filename,
      originalName: input.originalName,
      mimeType: input.mimeType,
      size: input.size
    });

  const chunks = splitIntoChunks(
    text,
    CHUNK_SIZE
  );

  await chunkRepository.createMany(
    chunks.map(
      (
        content: string,
        index: number
      ) => ({
        documentId: document.id,
        chunkIndex: index,
        content,
      })
    )
  );

  // Set embedding
  // Modify chunk for embedding

  const savedChunks =
    await chunkRepository.findByDocumentId(document.id);

  for (const chunk of savedChunks) {
    const embedding =
      await mockEmbedProvider.embed(chunk.content);

    await chunkRepository.updateEmbedding({
      id: chunk.id,
      embedding,
    });
  }

  await memoryCache.clear();
  
  return document;
}

export async function list() {
  return documentRepository.findAll();
}

function splitIntoChunks(
  text: string,
  chunkSize = 1000,
  overlap = 200
) {
  const chunks: string[] = [];

  let start = 0;

  while (start < text.length) {

    const end =
      Math.min(
        start + chunkSize,
        text.length
      );

    chunks.push(
      text.slice(start, end)
    );

    if (end >= text.length) {
      break;
    }

    start = end - overlap;
  }

  return chunks;
}
