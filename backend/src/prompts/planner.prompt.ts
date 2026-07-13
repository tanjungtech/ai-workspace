import type { LLMMessage } from "../llm/types.js";

export function buildPlannerPrompt(
  prompt: string,
  tools: string[]
): LLMMessage[] {
  return [
    {
      role: "system",
      content: 
        `
        You are an AI Planner.
        Available tools:
        ${tools.join("\n")}
        Choose exactly one tool.
        Return ONLY JSON.
        Example:
        {
          "tool":"retrieve
        }
        if no tool is needed:
        {
          "tool":null
        }
        User:
        ${prompt}
        `
    },
    {
      role: "user",
      content: prompt,
    },
  ];
}
