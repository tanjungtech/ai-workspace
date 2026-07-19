import { buildPrompt } from "../prompts/buildPrompt.js";
import type { LLMMessage } from "../llm/types.js";
import { createState } from "./createState.js";
import { planner } from "./planner.js";
import { executeTool } from "./toolExecutor.js";
import type { AgentSource } from "./types.js";

export interface PreparedAgent {
  userPrompt: string;
  history: LLMMessage[];

  prompt: LLMMessage[];
  context: string;
  sources: AgentSource[];
  toolHistory: {
    tool: string;
    input: string;
    output: string;
  } [];
  statusHistory: string[];
}

const MAX_ITERATIONS = 3;

export async function prepareAgent(
  prompt: string,
  history: LLMMessage[]
): Promise<PreparedAgent> {
  const state = createState(
    prompt,
    history
  );
  let iteration = 0;
  while (
    !state.completed && iteration < MAX_ITERATIONS
  ) {
    iteration++;
    state.statusHistory.push(`Planning (${iteration})`);
    const decision = await planner(state);
    state.statusHistory.push(decision.reason);
    if (!decision.tool) {
      state.completed = true;
      break;
    }
    await executeTool(
      decision.tool,
      state
    );

    // Current Implementation
    // Next: support multiple planning loops
    state.completed = true;
  }
  const llmPrompt = buildPrompt(
    "general",
    history,
    state.context
  );
  return {
    userPrompt: prompt,
    history,

    prompt: llmPrompt,
    context: state.context,
    sources: state.sources,
    toolHistory: state.toolHistory,
    statusHistory: state.statusHistory
  };
}
