// export type ToolResult = {
//   success: boolean;
//   output: string;
// };

import type { AgentSource } from "./types.js";

export interface ToolResult {
  output: string;
  sources: AgentSource[];
}

export interface Tool {
  name: string;
  description: string;
  execute(
    input: string
  ): Promise<ToolResult>;
}
