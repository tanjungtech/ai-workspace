// import type { Message } from "../types/message";
// import MarkdownMessage from "./MarkdownMessage";

// type ChatMessageProps = {
//   message: Message;
// };

import Markdown from "react-markdown";
import type { ChatMessage, } from "../types/chat";

// type Props = {
//   role: "user" | "assistant";
//   content: string;
// };

import SourceList from "./SourceList";
import AgentStatus from "../../../components/AgentStatus";

type Props = {
  message: ChatMessage;
}

export default function ChatMessage({
  message,
}: Props) {
  // const isUser = role === "user";

  return (
    <div className={
      message.role === "user" ?
        "flex justify-end"
        : "flex justify-start"
    }>
      <div className="
        max-w-3xl
        rounded-lg
        border
        p-4
      ">
        <AgentStatus />
        <Markdown>{message.content}</Markdown>
        {
          message.role ===
          "assistant" && (
            <SourceList sources={message.sources}/>
          )
        }
      </div>
    </div>
  );
}
