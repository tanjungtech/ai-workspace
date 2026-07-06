export async function generateResponse(prompt: string) {
  return `Mock AI Response:

You said:

${prompt}

This response came from the mock provider.`;
}