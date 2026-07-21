import type { AgentState } from "./state.js";
import type { LLMMessage } from "../llm/types.js";

export function createState(
  userPrompt: string,
  history: LLMMessage[]
): AgentState {
  return {
    userPrompt,
    history,
    context: "",
    sources: [],
    toolHistory: [],
    statusHistory: [],
    completed: false,
  };
}
