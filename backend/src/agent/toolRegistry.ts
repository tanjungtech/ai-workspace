// import { retrieve } from "../services/retriever.service.js";
import type {
  Tool,
} from "./tool.js";

import {
  retrieveTool
} from "./tools/retrieve.tool.js";

import {
  summarizeTool
} from "../tools/summarize.tool.js";

// export interface ToolDefinition {
//   name: string;
//   description: string;
//   execute: (...args: any[]) => Promise<any>;
// }

const registry: Tool[] = [
  retrieveTool,
  summarizeTool,
];

export function getTool(
  name: string
): Tool | undefined {
  return registry.find(
    tool => tool.name === name
  );
}

export function listToolDescriptions() {
  return registry.map(
    tool => ({
      name: tool.name,
      description: tool.description,
    })
  );
}
