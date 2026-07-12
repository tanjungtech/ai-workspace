// import { useRef, useState } from "react";
import { useState } from "react";

// import { sendMessage as sendMessageApi } from "../api/chat.api";
// import { streamMessage } from "../api/chat.api";

import type {
  ChatMessage,
  // StreamState,
  // Source,
} from "../types/chat";

type SendMessageInput = {
  prompt: string;
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [loading, setLoading] = useState(false);

  const [conversationId, setConversationId] = useState<string>();

  // const [state, setState] = useState<StreamState>("idle");

  // const controller = useRef<AbortController>(null);

  async function sendMessage({
    prompt,
  }: SendMessageInput) {
    setLoading(true);

    // Add User Message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
    };

    setMessages(prev => [
      ...prev,
      userMessage,
    ]);

    // Placeholder assistant
    const assistantId =
      crypto.randomUUID();

    setMessages(prev => [
      ...prev,
      {
        id: assistantId,
        role: "assistant",
        content: "",
        sources: [],
      },
    ]);

    // Stream Request
    const response =
      await fetch(
        "/api/chat/stream",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversationId,
            prompt,
          }),
        }
      );

    if (!response.body) {
      setLoading(false);
      return;
    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let fullResponse = "";
    
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const token = decoder.decode(value);
      fullResponse += token;

      setMessages(prev => 
        prev.map(message => 
          message.id === assistantId
            ? {
              ...message,
              content: fullResponse,
            }
            : message
        )
      );
    }

    // Optional metadata request
    const metadata =
      await fetch(
        "api/chat/latest",
        { method: "GET" },
      ).then(r => r.json());

    setConversationId(metadata.conversation.id);
    setMessages(prev => 
      prev.map(message =>
        message.id === assistantId
          ? {
            ...message,
            sources: metadata.sources,
          }
          : message
      )
    );

    setLoading(false);
  }

  // function cancelGeneration() {
  //   controller.current?.abort();

  //   setState("idle");
  // }

  return {
    messages,
    loading,
    sendMessage,
    // cancelGeneration,
  };

}
