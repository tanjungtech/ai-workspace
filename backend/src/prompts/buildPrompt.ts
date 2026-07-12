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

    Always answer using the retrieved document context whenever it is relevant.

    If the retrieved context contains the answer,
    prefer it over your own knowledge.

    If the retrieved context does not contain enough
    information, clearly say that the uploaded documents
    do not provide the answer.

    Never invent facts that are not supported by the
    retrieved context.

    When no retrieved context is available,
    answer using your general knowledge only if you
    are confident.
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

  // System Prompt

  prompt.push({
    role: "system",
    content: SYSTEM_PROMPTS[type],
  });

  // Retrieved Context

  if (context.trim().length > 0) {
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
      If the user asks about the uploaded documents,
      reply that the documents do not contain the answer.

      Otherwise answer normally using your own knowledge.
      `
    });
  }

  // Conversation History
  prompt.push(...history);

  return prompt;
}
