import ChatMessage from "./ChatMessage";
import type { Message } from "../types/message";

type ChatWindowProps = {
  messages: Message[];
};

export default function ChatWindow({
  messages,
}: ChatWindowProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
      {messages.map((message) => (
        <ChatMessage
          key-={message.id}
          message={message}
        />
      ))}
    </div>
  );
}