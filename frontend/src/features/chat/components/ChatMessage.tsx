// import type { Message } from "../types/message";
import MarkdownMessage from "./MarkdownMessage";

// type ChatMessageProps = {
//   message: Message;
// };

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessage({
  role,
  content,
}: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-4xl rounded-xl px-5 py-4 shadow ${
          isUser
            ? "bg-blue-600 text-white" : "bg-white"
        }`}
      >
        <MarkdownMessage
          content={content}
        />
      </div>
    </div>
  )
}
