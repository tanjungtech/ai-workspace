import { openai } from "../providers/openai.provider.js";
import { SYSTEM_PROMPT } from "../prompts/system.prompt.js";

export async function generateResponse(
  prompt: string
){
  const response =
    await openai.chat.completions.create({
      model: process.env.MODEL!,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
  return response.choices[0]?.message.content;
}