import { useState } from "react";

import { sendMessage as sendMessageApi } from "../api/chat.api";

import type { ChatMessage } from "../types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const conversationId = "demo-conversation";

  async function sendMessage(content: string) {
    if (!content.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    try {
      const response = await sendMessageApi({
        conversationId,
        message: content,
      });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.reply,
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(error);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Something went wrong while contacting the AI.",
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);
    }
  }

  return {
    messages,
    sendMessage
  }

}
