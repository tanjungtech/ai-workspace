import { CODING_PROMPT } from "./coding.prompt.js";
import { GENERAL_PROMPT } from "./general.prompt.js";

export function getPrompt(
  assistant: string
): string {
  switch (assistant) {
    case "coding":
      return CODING_PROMPT;
    
    default:
      return GENERAL_PROMPT;
  }
}
