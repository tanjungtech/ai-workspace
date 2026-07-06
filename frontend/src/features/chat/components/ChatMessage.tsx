import type { Message } from "../types/message";

type ChatMessageProps = {
  message: Message;
};

export default function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl rounded-xl px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white" : "bg-white border"
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
