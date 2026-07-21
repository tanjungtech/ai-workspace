// export type ToolResult = {
//   success: boolean;
//   output: string;
// };

import type {
  AgentSource,
  AgentState,
} from "./types.js";

export interface ToolResult {
  // Human-readable output
  output: string;
  // Optional context appended to the agent context
  context?: string;
  sources?: AgentSource[];
}

export interface Tool {
  name: string;
  description: string;
  // execute(
  //   state: AgentState
  // ): Promise<ToolResult>;
  execute(
    state: AgentState
  ): Promise<ToolResult>;
}
