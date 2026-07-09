import ConversationSidebar from "../../features/chat/components/ConversationSidebar";
import ChatInput from "../../features/chat/components/ChatInput";

import ChatWindow from "../../features/chat/components/ChatWindow";
import { useChat } from "../../features/chat/hooks/useChat";

export default function Chat() {
  const {
    messages,
    sendMessage,
  } = useChat();

  return (
    <div className="
      flex
      h-screen
      flex-col
      md:flex-row
      "
    >
      <div className="
        h-72
        md:h-full
        md:w-80
        "
      >
        <ConversationSidebar />
      </div>
      <main className="flex-1 overflow-hidden">
        <ChatWindow
          messages={messages}
        />
        
        <ChatInput
          onSend={sendMessage}
        />
      </main>
    </div>
  );
}
