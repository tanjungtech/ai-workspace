import type {
  LLMMessage,
  LLMProvider,
} from "./types.js";

export class MockProvider implements LLMProvider {
  async generateResponse(
    messages: LLMMessage[]
  ): Promise<string> {
    const last = messages[messages.length - 1];

    return `Mock response: ${last?.content}`;

  }

  async *stream(
    messages: LLMMessage[]
  ): AsyncGenerator<string> {
    const last = messages[messages.length - 1];

    const response = `Mock response: ${last?.content}`;

    const words = response.split(" ");

    for (const word of words) {
      await new Promise(resolve => 
        setTimeout(resolve, 120)
      );

      yield word + " ";
    }

  }
}