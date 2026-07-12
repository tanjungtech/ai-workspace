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

  if (context.trim().length) {
    prompt.push({
      role: "system",
      content: `
        Retrieved Context
        ${context}
      `,
    });
  } else {
    prompt.push({
      role: "system",
      content:
      `
      No relevant document context was found.
      Answer only if you are confident.
      Otherwise reply that
      the uploaded documents
      do not contain the answer.
      `
    });
  }

  // prompt.push(...history);

  return prompt;
}
