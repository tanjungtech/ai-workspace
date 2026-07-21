import { generateResponse } from "../llm/chat.js";
import { buildPrompt } from "../prompts/buildPrompt.js";
import type { Tool } from "../agent/tool.js";
import type { AgentState } from "../agent/types.js"; 

// export interface Tool {
//   name: string;
//   description: string;
//   execute(
//     state: AgentState
//   ): Promise<ToolResult>;
// }

export const summarizeTool: Tool = {
  name: "summarize",
  description: "Summarize retrieved context.",
  async execute(
    state: AgentState
  ) {
    if (!state.context.trim()) {
      return {
        output: "No context available."
      };
    }
    const prompt = buildPrompt(
      "summarize",
      [],
      state.context
    );
    const summary = await generateResponse(prompt);
    return {
      output: "Summary generated.",
      context: summary
    }
  }
}

// export async function summarizeTool(
//   state: AgentState
// ): Promise<string> {
//   if (!state.context.trim()) {
//     return "No context available.";
//   }
//   const prompt = buildPrompt(
//     "summarize",
//     [],
//     state.context
//   );
//   const summary = await generateResponse(prompt);
//   return summary;
// }
