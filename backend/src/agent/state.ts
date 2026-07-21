import type { LLMMessage } from "../llm/types.js";
import type {
  AgentSource,
  AgentToolHistory,
} from "./types.js";

export type AgentState = {
  userPrompt: string;
  history: LLMMessage[];
  context: string;
  sources: AgentSource[];
  toolHistory: AgentToolHistory[];
  statusHistory: string[];
  completed: boolean;
};
