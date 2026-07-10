import * as documentRepository from "../repositories/document.repository.js";
import * as chunkRepository from "../repositories/documentChunk.repository.js";

import { createParser } from "../parsers/parser.factory.js";
import { mockEmbedProvider } from "../providers/mock.embed.provider.js";
import { findByDocumentId } from "../repositories/documentChunk.repository.js";

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

  return document;
}

export async function list() {
  return documentRepository.findAll();
}

function splitIntoChunks(
  text: string,
  chunkSize: number
) {
  const chunks: string[] = [];

  for (
    let i=0; i < text.length; i+= chunkSize
  ) {
    chunks.push(
      text.slice(i, i + chunkSize)
    );
  }

  return chunks;
}
