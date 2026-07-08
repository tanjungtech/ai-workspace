type Props = {
  onClick: () => void;
};

export default function NewChatButton({
  onClick, 
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        rounded-lg
        bg-blue-600
        px-4
        py-3
        text-white
      "
    >
      New Chat
    </button>
  );
}
