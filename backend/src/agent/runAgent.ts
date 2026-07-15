import { generateResponse } from "../llm/chat.js";
import { buildPrompt } from "../prompts/buildPrompt.js";
import { createState } from "./createState.js";

import { planner, chooseTool } from "./planner.js";

import { executeTool, } from "./toolExecutor.js";
import type { AgentResult } from "./types.js";
import type { LLMMessage } from "../llm/types.js";

// import type { AgentState, } from "./state.js";

export interface RunAgentInput {
  prompt: string;
  history: LLMMessage[];
}

const MAX_ITERATIONS = 3;

export async function runAgent(
  input: RunAgentInput
): Promise<AgentResult> {

  // Create Runtime State
  const state = createState(
    input.prompt,
    input.history
  );

  // Agent Loop

  let iteration = 0;
  
  while (
    !state.completed &&
    iteration < MAX_ITERATIONS
  ) {
    iteration++;
    state.statusHistory.push(
      `Planning (${iteration})`
    );

    const decision = await planner(state);

    state.statusHistory.push(decision.reason);

    // Planner decided no tool
    if (!decision.tool) {
      state.completed = true;
      break;
    }

    // Execute Tool
    await executeTool(
      decision.tool,
      state
    );

    // Execute one tool only: for now
    state.completed = true;

    // const tool =
    //   await chooseTool(state);

    // if (!tool) {
    //   state.statusHistory.push("No tool required");
    //   state.completed = true;
    //   break;
    // }
  }

  // Build Final Prompt
  const llmPrompt = buildPrompt(
    "general",
    state.history,
    state.context
  );

  // Generate Final Answer
  const answer = await generateResponse(llmPrompt);

  // Return Runtime Result

  return {
    answer,
    context: state.context,
    sources: state.sources,
    toolHistory: state.toolHistory,
    statusHistory: state.statusHistory,
  };
}
