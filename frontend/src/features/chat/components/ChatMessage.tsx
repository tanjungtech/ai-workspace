// import type { Message } from "../types/message";
// import MarkdownMessage from "./MarkdownMessage";

// type ChatMessageProps = {
//   message: Message;
// };

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage as ChatMessageType } from "../types/chat";

// type Props = {
//   role: "user" | "assistant";
//   content: string;
// };

import SourceList from "./SourceList";
import AgentStatus from "../../../components/AgentStatus";
// import Agents from "../../../pages/Agents/Agents";

type Props = {
  message: ChatMessageType;
}

export default function ChatMessage({
  message,
}: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`
        mb-6
        flex
        ${isUser
          ? "justify-end"
          : "justify-start"
        }
      `
    }>
      <div className={`
        max-w-3xl
        rounded-lg
        px-4
        py-3
        ${isUser
          ? "bg-blue-600 text-white"
          : "bg-slate-100"
        }
      `}>
        {
          !isUser && (
            <AgentStatus
              status={ message.status }
              history={ message.statusHistory }
            />
          )
        }
        <Markdown
          remarkPlugins={[ remarkGfm, ]}
        >
          {message.content}
        </Markdown>
        {
          message.sources &&
          message.sources.length > 0 && (
            <SourceList
              sources={ message.sources }
            />
          )
        }
      </div>
    </div>
  );
}
