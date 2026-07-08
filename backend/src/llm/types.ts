export type LLMMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export interface LLMProvider {
  generateResponse(
    messages: LLMMessage[]
  ): Promise<string>;

  stream(
    messages: LLMMessage[]
  ): AsyncGenerator<string>;
}
