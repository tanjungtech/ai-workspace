import { useState } from "react";

type ChatInputProps = {
  onSend: (prompt: string) => void;
};

export default function ChatInput({
  onSend,
}: ChatInputProps) {
  const [prompt, setPrompt] = useState("");

  function handleSubmit() {
    const value = prompt.trim();

    if (!value) return;

    onSend(value);

    setPrompt("");
  }

  return (
    <div className="border-t bg-white p-4">
      <textarea
        value={prompt}
        onChange={(event) =>
          setPrompt(event.target.value)
        }
        className="w-full rounded-lg border p-3"
        rows={4}
      />
      <button
        onClick={handleSubmit}
        className="mt-3 rounded-lg bg-blue-600 px-5 py-2 text-white"
      >
        Send
      </button>
    </div>
  )
}
