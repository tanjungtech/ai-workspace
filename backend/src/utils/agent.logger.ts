export function logPlanner(
  prompt: string,
  tool: string | null
) {
  console.log(
    "[Planner]",
    {
      prompt,
      tool,

    }
  );
}