import type { Conversation } from "../types/conversation";

type Props = {
  conversation: Conversation;
  selected?: boolean;
  onSelect: (id: string) => void;
  onRename: (conversation: Conversation) => void;
  onDelete: (conversation: Conversation) => void;
};

export default function ConversationItem({
  conversation,
  selected,
  onSelect,
  onRename,
  onDelete,
}: Props) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        rounded-lg
        p-3
        cursor-pointer
        transition
        ${
          selected ? "bg-blue-100" : "hover:bg-gray-100"
        }
      `}
      onClick={() => onSelect(conversation.id)}
    >
      <span className="truncate">
        {conversation.title}
      </span>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRename(conversation);
          }}
        >
          ✏️
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(conversation);
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
