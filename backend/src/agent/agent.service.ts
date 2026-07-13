import { chooseTool } from "./planner.js";

import { executeTool } from "./toolExecutor.js";

import type { AgentState } from "./state.js";

export async function runAgent(
  // prompt: string
  prompt: AgentState
) {
  const tool = await chooseTool(prompt);

  if (!tool) {
    return {
      context: "",
      toolUsed: null,
    };
  } 

  const result =
    await executeTool(tool, prompt);

  return {
    context: result.output,
    toolUsed: tool,
    status:
      tool ?
        "Tool executed"
        : "Direct answer",
  };
}
