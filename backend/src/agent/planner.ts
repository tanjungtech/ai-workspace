export function chooseTool(
  prompt: string
) {
  const lower = prompt.toLowerCase();
  if (
    lower.includes("document") ||
    lower.includes("pdf") ||
    lower.includes("file")
  ) {
    return "retrieve";
  }

  return null;
}