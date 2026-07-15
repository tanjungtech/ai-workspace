import { generateResponse } from "../llm/chat.js";

import { buildPlannerPrompt, } from "../prompts/buildPlannerPrompt.js";
// import { logPlanner } from "../utils/agent.logger.js";

import { listToolDescriptions } from "./toolRegistry.js";

import type { PlannerResponse, } from "./types.js";

import type { AgentState, } from "./state.js";

export interface PlannerDecision {
  tool: string | null;
  reason: string;
}

export async function planner(
  state: AgentState
): Promise<PlannerDecision> {
  
  const prompt = buildPlannerPrompt(
    state.prompt,
    listToolDescriptions()
  );

  const response = await generateResponse(prompt);

  try {
    const parsed =
      JSON.parse(response) as PlannerDecision;

    return {
      tool: parsed.tool,
      reason:
        parsed.reason ??
        "Planner selected tool"
    };
  } catch {
    return {
      tool: null,
      reason:
        "Planner returned invalid JSON"
    };
  }
}

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