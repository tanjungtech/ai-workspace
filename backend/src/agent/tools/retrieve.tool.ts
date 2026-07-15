import * as retrieverService from "../../services/retriever.service.js";

import type {
  Tool,
  ToolResult,
} from "../tool.js";

export const retrieveTool: Tool = {
  name: "retrieve",

  description:
    "Search uploaded documents for information related to the user's question",

  async execute(
    input: string
  ): Promise<ToolResult> {
    const chunks = await retrieverService.retrieve(input);

    return {
      output:
        chunks
          .map(
            chunk => chunk.content
          )
          .join("\n\n"),
      sources:
        chunks.map(chunk => ({
          documentId: chunk.document_id,
          documentName: chunk.document_name,
          chunkIndex: chunk.chunk_index,
          similarity: chunk.similarity,
          preview:
            chunk.content.substring(
              chunk.content.substring(0, 150)
            )
        }))
    };
  },
}
