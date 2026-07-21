import { generateResponse } from "../llm/chat.js";

import { buildPlannerPrompt, } from "../prompts/buildPlannerPrompt.js";
// import { logPlanner } from "../utils/agent.logger.js";

import { listToolDescriptions } from "./toolRegistry.js";

// import type { PlannerResponse, } from "./types.js";

import type { 
  AgentState,
  PlannerDecision,
} from "./types.js";

export async function planner(
  state: AgentState
): Promise<PlannerDecision> {
  
  const prompt = buildPlannerPrompt(
    state.userPrompt,
    listToolDescriptions(),
    state.toolHistory.map(
      item => item.tool
    )
  );

  const raw = await generateResponse(prompt);

  try {
    const parsed =
      JSON.parse(raw) as PlannerDecision;

    return {
      action: parsed.action,
      tool: parsed.tool,
      reason: parsed.reason,
      done: parsed.done,
    };
  } catch {
    return {
      action: "answer",
      tool: null,
      reason: "Planner response could not be parsed",
      done: true,
    };
  }
}

export async function chooseTool(
  state: AgentState
): Promise<string | null> {

  const prompt =
    buildPlannerPrompt(
      state.userPrompt,
      listToolDescriptions(),
      state.toolHistory.map(
        item => item.tool
      )
    );

  const answer =
    await generateResponse(prompt);

  try {
    const parsed =
      JSON.parse(
        answer
      ) as PlannerDecision;

    return parsed.tool;
  } catch {
    return null;
  }
}