import { llm } from "../llm/llm.provider.js";
import type { LLMMessage } from "../llm/types.js";
import type { AgentResult } from "./types.js";
import { prepareAgent } from "./prepareAgent.js";

export interface RunAgentStreamInput {
  prompt: string;
  history: LLMMessage[];
  onToken?(
    token: string
  ): Promise<void> | void;
}

export async function runAgentStream(
  input: RunAgentStreamInput
): Promise<AgentResult> {
  const prepared =
    await prepareAgent(
      input.prompt,
      input.history
    );

  let answer = "";
  for await (
    const token of llm.stream(prepared.prompt)
  ) {
    answer += token;
    if (input.onToken) {
      await input.onToken(token);
    }
  }
  return {
    answer,
    context: prepared.context,
    sources: prepared.sources,
    toolHistory: prepared.toolHistory,
    statusHistory: prepared.statusHistory,
  };
}
