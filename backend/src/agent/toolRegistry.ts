// import { retrieve } from "../services/retriever.service.js";
import type {
  Tool,
} from "./tool.js";

import {
  retrieveTool,
} from "./tools/retrieve.tool.js";

const registry = new Map<string, Tool>();

registry.set(
  retrieveTool.name,
  retrieveTool
);

export function registerTool(
  tool: Tool
) {
  registry.set(
    tool.name,
    tool
  );
  // return tools.get(name);
}

export function getTool(
  name: string
) {
  return registry.get(name);
}

export function listTools() {
  return Array.from(
    registry.values()
  );
}

export function listToolDescriptions() {
  return listTools().map(
    tool => ({
      name: tool.name,
      description: tool.description,
  }));
}
