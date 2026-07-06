import ReactMarkdown from "react-markdown";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AI Chat</h1>
      <div id="conversation"></div>
      <div id="conversation-form">
        <div>
          <ReactMarkdown></ReactMarkdown>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button>
      </div>
    </div>
  );
}
