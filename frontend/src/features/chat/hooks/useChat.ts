import { useRef, useState } from "react";

// import { sendMessage as sendMessageApi } from "../api/chat.api";
import { streamMessage } from "../api/chat.api";

import type {
  ChatMessage,
  StreamState
} from "../types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [state, setState] = useState<StreamState>("idle");

  const controller = useRef<AbortController>(null);

  const conversationId = "demo";

  async function sendMessage(
    content: string
  ) {
    controller.current = new AbortController();

    setState("streaming");

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content,
    };

    const assistantId = crypto.randomUUID();

    setMessages((previous) => [
      ...previous,

      userMessage,

      {
        id: assistantId,

        role: "assistant",

        content: "",
      },
    ]);

    await streamMessage(
      conversationId,
      content,
      controller.current.signal,

      (chunk) => {
        setMessages(
          (previous) =>
            previous.map(
              (message) =>
                message.id === assistantId ?
                  {
                    ...message,

                    content:
                      message.content + chunk,
                  }
                  : message
            )
        );
      }
    );

    setState("idle");
  }

  function cancelGeneration() {
    controller.current?.abort();

    setState("idle");
  }

  return {
    messages,

    sendMessage,

    cancelGeneration,

    streaming: state === "streaming",
  };

}
