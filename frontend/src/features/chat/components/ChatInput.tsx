import { useState } from "react";

// type ChatInputProps = {
//   onSend: (prompt: string) => void;
// };

type Props = {
  onSend(prompt: string): Promise<void>;
  loading: boolean;
};

export default function ChatInput({
  onSend,
  loading
}: Props) {
  // const [prompt, setPrompt] = useState("");

  const [value, setValue] = useState("");

  async function handleSubmit(
    e: React.SubmitEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    if (!value.trim()) {
      return;
    }

    await onSend(value);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2"
    >
      <input
        className="
          flex-1
          rounded-md
          border
          p-3
        "
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        disabled={loading}
        className="
          rounded-md
          bg-blue-600
          px-4
          text-white
        "
      >
        Send
      </button>
    </form>
  );
}
