// import { openai } from "../providers/openai.provider.js";
import { openai } from "../providers/openai.provider.js";
import { SYSTEM_PROMPT } from "../prompts/system.prompt.js";
import type { LLMMessage } from "./types.js";

export async function generateResponse(
  history: LLMMessage[]
): Promise<string> {
  const response =
    await openai.chat.completions.create({
      model: process.env.MODEL!,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...history,
      ],
    });
  return (
    response.choices[0]?.message.content ??
    ""
  );
}