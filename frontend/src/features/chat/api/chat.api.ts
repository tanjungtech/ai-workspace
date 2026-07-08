const API_URL =
  import.meta.env.VITE_API_URL;

  export async function streamMessage(
    conversationId: string,
    message: string,
    signal: AbortSignal,
    onChunk: (chunk: string) => void
  ) {
    const response = await fetch(
      `${API_URL}/chat/stream`,
      {
        method: "POST",

        signal,

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          conversationId,
          message,
        }),
      }
    );

    const reader =
      response.body?.getReader();

    if (!reader) {
      throw new Error(
        "No stream"
      );
    }

    const decoder = new TextDecoder();

    while (true) {
      const result = await reader.read();

      if (result.done) {
        break;
      }

      const chunk = decoder.decode(result.value);

      onChunk(chunk);
    }

  }