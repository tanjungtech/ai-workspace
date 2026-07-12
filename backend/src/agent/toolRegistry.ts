import { retrieve } from "../services/retriever.service.js";
import type {
  Tool,
} from "./tool.js";

import {
  retrieveTool,
} from "./tools/retrieve.tool.js";

const tools =
  new Map<string, Tool>();

tools.set(
  retrieveTool.name,
  retrieveTool
);

export function getTool(
  name: string
) {
  return tools.get(name);
}

export function listTools() {
  return Array.from(
    tools.values()
  );
}
