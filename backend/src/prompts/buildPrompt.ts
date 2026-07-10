import type { LLMMessage } from "../llm/types.js";

export type PromptType =
  | "general"
  | "summarize";

const SYSTEM_PROMPTS: Record<
  PromptType,
  string
> = {
  general: `
    You are a helpful AI assistant.
    Answer using the retrieved context whenever possible.
    If the answer cannot be found inside the retrieved context,
    say that you don't know instead of inventing information.
  `,
  summarize: `
    Summarize the following conversation.
  `,
};

export function buildPrompt(
  type: PromptType,
  history: LLMMessage[],
  context = ""
): LLMMessage[] {
  const prompt: LLMMessage[] = [];
  prompt.push({
    role: "system",
    content: SYSTEM_PROMPTS[type],
  });

  if (context.trim().length > 0) {
    prompt.push({
      role: "system",
      content: `
        Retrieved Context
        ${context}
      `,
    });
  }

  prompt.push(...history);

  return prompt;
}
