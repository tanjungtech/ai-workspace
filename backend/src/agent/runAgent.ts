import { chooseTool } from "./planner.js";

import { executeTool, } from "./toolExecutor.js";

import type { AgentState, } from "./state.js";

const MAX_ITERATIONS = 3;

export async function runAgent(
  state: AgentState
) {
  let iteration = 0;
  
  while (
    !state.completed &&
    iteration < MAX_ITERATIONS
  ) {
    iteration++;
    state.statusHistory.push(
      `Planning (${iteration})`
    );

    const tool =
      await chooseTool(state);

    if (!tool) {
      state.statusHistory.push("No tool required");
      state.completed = true;
      break;
    }

    await executeTool(
      tool,
      state
    );

    state.completed = true;
  }

  return state;
}
