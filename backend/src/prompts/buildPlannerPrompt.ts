import type { LLMMessage } from "../llm/types.js";

export interface PlannerTool {

  name: string;

  description: string;

}

export function buildPlannerPrompt(

  prompt: string,

  tools: PlannerTool[]

): LLMMessage[] {

  const toolList = tools
    .map(
      tool =>
`Tool: ${tool.name}
Description: ${tool.description}`
    )
    .join("\n\n");

  return [

    {

      role: "system",

      content:
`You are an AI planner.

Your task is to decide whether one of the available tools
should be used before answering the user's question.

Return ONLY valid JSON.

Example:

{
  "tool":"retrieve",
  "reason":"The question refers to uploaded documents."
}

Example:

{
  "tool":null,
  "reason":"No tool is required."
}

Available tools:

${toolList}
`

    },

    {

      role: "user",

      content: prompt

    }

  ];

}