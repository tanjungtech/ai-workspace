import fs from "node:fs/promises";
import type { DocumentParser } from "./parser.js";

export class TextParser
  implements DocumentParser {
    async parse(
      filePath: string
    ) {

      return fs.readFile(
        filePath,
        "utf8"
      );
    }
}
