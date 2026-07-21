import type { RetrievedMemory } from "../types/memory.js";

export function formatMemoryContext(
  memories: RetrievedMemory[]
): string {
  if (!memories.length) {
    return "";
  }
  return [
    "Relevant Memories:",
    ...memories.map(
      memory => `- ${memory.content}`
    ),
  ].join("\n");
}
