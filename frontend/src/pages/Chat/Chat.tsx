import ConversationSidebar from "../../features/chat/components/ConversationSidebar";
import ChatInput from "../../features/chat/components/ChatInput";
import ChatMessage from "../../features/chat/components/ChatMessage";

// import ChatWindow from "../../features/chat/components/ChatWindow";
import { useChat } from "../../features/chat/hooks/useChat";

export default function Chat() {
  const {
    messages,
    loading,
    sendMessage,
  } = useChat();

  return (
    <div className="
      mx-auto
      flex
      h-screen
      max-w-5xl
      flex-col
      p-6
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
      <main className="
        flex-1
        space-y-4
        overflow-y-auto
      ">
        {/* <ChatWindow
          messages={messages}
        /> */}
        {
          messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))
        }
        
        <ChatInput
          loading={loading}
          onSend={prompt =>
            sendMessage({prompt})
          }
        />
      </main>
    </div>
  );
}
