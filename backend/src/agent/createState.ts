import type { AgentState } from "./state.js";
import type { LLMMessage } from "../llm/types.js";

export function createState(
  prompt: string,
  history: LLMMessage[]
): AgentState {
  return {
    prompt,
    history,
    context: "",
    sources: [],
    toolHistory: [],
    statusHistory: [
      "Agent initialized",
    ],
    completed: false,
  };
}
