import type {
  Tool,
  ToolResult,
} from "../tool.js";

import {
  retrieve,
} from "../../services/retriever.service.js";

export const retrieveTool: Tool = {
  name: "retrieve",

  description:
    "Search uploaded documents.",

  async execute(
    input: string
  ): Promise<ToolResult> {
    const chunks = await retrieve(input);

    const output =
      chunks
        .map(
          chunk => chunk.content
        )
        .join("\n\n");

    return {
      success: true,
      output,
    }
  },
}
