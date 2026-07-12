import { chooseTool } from "./planner.js";

import { executeTool } from "./toolExecutor.js";

export async function runAgent(
  prompt: string
) {
  const tool = chooseTool(prompt);

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
  };
}
