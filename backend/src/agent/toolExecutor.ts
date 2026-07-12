import {
  getTool,
} from "./toolRegistry.js";

export async function executeTool(
  toolName: string,
  input: string
) {
  const tool = getTool(toolName);

  if (!tool) {
    throw new Error(
      `Unknown tool: ${toolName}`
    );
  }

  return tool.execute(input);
}
