import { TextParser } from "./text.parser.js";

import type { DocumentParser } from "./parser.js";

export function createParser(
  mimeType: string
): DocumentParser {
  switch (mimeType) {
    case "text/plain":
      return new TextParser();

    // case "application/pdf":
    //   return new PdfParser();

    default:
      throw new Error(
        `Unsupported mime type: ${mimeType}`
      );
  }
}
