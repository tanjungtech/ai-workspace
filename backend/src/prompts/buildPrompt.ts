import type { LLMMessage } from "../llm/types.js";
import { getPrompt } from "./prompt.factory.js";

export function buildPrompt(
  assistant: string,
  messages: LLMMessage[]
): LLMMessage[] {
  return [
    {
      role: "system",
      content: getPrompt(
        assistant
      ),
    },
    ...messages,
  ];
}