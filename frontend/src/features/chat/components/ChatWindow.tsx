import ChatMessage from "./ChatMessage";
// import type { Message } from "../types/message";

// type ChatWindowProps = {
//   messages: Message[];
// };

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
};

export default function ChatWindow({
  messages,
}: Props) {
  return (
    <div className="flex overflow-y-auto p-6 space-y-6">
      {messages.map((m) => (
        <ChatMessage
          key-={m.id}
          // role={message.role}
          // content={message.content}
          message={m}
        />
      ))}
    </div>
  );
}