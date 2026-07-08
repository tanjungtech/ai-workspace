type TokenUsage = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

export function logTokenUsage(
  usage: TokenUsage
) {
  console.table({
    Prompt: usage.promptTokens,
    Completion: usage.completionTokens,
    Total: usage.totalTokens,
  });
}
