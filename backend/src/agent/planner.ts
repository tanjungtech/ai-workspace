import { generateResponse } from "../llm/chat.js";

import { buildPlannerPrompt, } from "../prompts/planner.prompt.js";
import { logPlanner } from "../utils/agent.logger.js";

import { listTools, listToolDescriptions } from "./toolRegistry.js";

import type { PlannerResponse, } from "./types.js";

import type { AgentState, } from "./state.js";

export async function chooseTool(
  state: AgentState
): Promise<string | null> {

  const prompt =
    buildPlannerPrompt(
      state.prompt,
      listToolDescriptions()
    );

  const answer =
    await generateResponse(prompt);

  try {
    const parsed =
      JSON.parse(
        answer
      ) as PlannerResponse;

    return parsed.tool;
  } catch {
    return null;
  }
}