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
    <div className="flex h-screen">
      <ConversationSidebar />
      <main className="flex flex-1 flex-col">
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
