import {
  getTool,
} from "./toolRegistry.js";

import type { AgentState, } from "./state.js";

export async function executeTool(
  toolName: string,
  state: AgentState
) {
  const tool = getTool(toolName);

  if (!tool) {
    throw new Error(
      `Unknown tool: ${toolName}`
    );
  }

  state.statusHistory.push(
    `Executing ${tool.name}`
  );

  const result =
    await tool.execute(state.prompt);

  state.toolHistory.push({
    tool: tool.name,
    input: state.prompt,
    output: result.output,
  });

  state.context = result.output;

  state.statusHistory.push(
    `${tool.name} completed`
  );

  return tool.execute(state.prompt);
}
