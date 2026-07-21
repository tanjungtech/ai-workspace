import * as retrieverService from "../../services/retriever.service.js";

import type {
  AgentState,
  AgentSource
} from "../../agent/types.js";

import type {
  Tool,
  // ToolResult,
} from "../tool.js";

export const retrieveTool: Tool = {
  name: "retrieve",

  description:
    "Retrieve relevant document chunks.",

  async execute(
    state: AgentState
  ) {
    const chunks = await retrieverService.retrieve(state.userPrompt);

    const context =
      chunks.map(
        chunk => chunk.content
      )
      .join("\n\n");

    const sources: AgentSource[] =
      chunks.map(chunk => ({
        id: chunk.document_id,
        chunkIndex: chunk.chunk_index,
        similarity: chunk.similarity,
        preview: chunk.content.substring(0, 150),
      }));

    return {
      output: `Retrieved ${chunks.length} chunks.`,
      context,
      sources,
    };
  },
}
