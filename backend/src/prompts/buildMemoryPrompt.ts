import type { LLMMessage } from "../llm/types.js";

function buildMemoryExtractionPrompt(
  userPrompt: string,
  assistantResponse: string
): string {
  return `
    You are a memory extraction system.
    Extract ONLY long-term useful information.
    Examples:
    - user preferences
    - skills
    - career goals
    - personal facts
    - long-term projects
    Ignore:
    - greetings
    - temporary questions
    - chit-chat
    Return ONLY valid JSON.
    Example:
    [
      {
        "type":"career",
        "content":"User is preparing for senior backend interviews.",
        "importance":0.9
      }
    ]
    Conversation
    User:
    ${userPrompt}
    Assistant:
    ${assistantResponse}
  `;
}

export function buildMemoryPrompt(
  userPrompt: string,
  assistantResponse: string
): LLMMessage[] {

  return [
    {
      role: "system",
      content:
        "You are a memory extraction system."
    },
    {
      role: "user",
      content:
        buildMemoryExtractionPrompt(
          userPrompt,
          assistantResponse
        )
    }
  ];
}