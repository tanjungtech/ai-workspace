import type { LLMMessage } from "../llm/types.js";

export function buildPlannerPrompt(
  prompt: string,
  tools: {
    name: string;
    description: string;
  }[]
): LLMMessage[] {
  return [
    {
      role: "system",
      content:
        `
        You are an AI Planner.

        Your job is to decide
        whether one of the available tools should be used.

        Return ONLY JSON.

        Example:
        {
          "tool":"retrieve"
        }
          or
        {
          "tool":null
        }
        Available tools:
        ${tools
          .map(
            tool =>
              `${tool.name}
              ${tool.description}`
          )
          .join("\n\n")
        }
        `
    },
    {
      role: "user",
      content: prompt,
    }
  ];
}
