import type { LLMMessage } from "../llm/types.js";

export interface PlannerTool {
  name: string;
  description: string;
}

export function buildPlannerPrompt(
  prompt: string,
  tools: PlannerTool[],
  toolHistory: string[],
): LLMMessage[] {

  const toolList = tools
    .map(
      tool =>
        `Tool: ${tool.name}
        Description: ${tool.description}`
    )
    .join("\n\n");

  const previousTools =
    toolHistory.length ?
      toolHistory.join("\n")
      : "None";

  return [
    {
      role: "system",
      content:
        `
        You are an AI planning engine.

        Your task is to decide whether another tool
        should be executed.

        Return ONLY valid JSON.

        If another tool is required:

        {
          "action":"tool",
          "tool":"retrieve",
          "reason":"Need information from uploaded documents.",
          "done":false
        }

        If enough information has been collected:

        {
          "action":"answer",
          "tool":null,
          "reason":"Ready to answer.",
          "done":true
        }

        Available tools:

        ${toolList}

        Already executed:

        ${previousTools}
        `

    },
    {
      role: "user",
      content: prompt
    }
  ];
}