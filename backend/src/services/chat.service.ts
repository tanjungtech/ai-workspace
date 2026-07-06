import { generateResponse } from "../llm/chat.js";

export async function chat(
  prompt: string
) {
  return generateResponse(prompt);
}