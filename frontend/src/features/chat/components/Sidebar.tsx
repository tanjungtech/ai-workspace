import ConversationItem from "./ConversationItem";
import NewChatButton from "./NewChatButton";

import type { Conversation } from "../types/conversation";

type Props = {
  conversations: Conversation[];
  selectedId?: string;

  onSelect: (id: string) => void;
  onCreate: () => void;
  onRename: (conversation: Conversation) => void;
  onDelete: (conversation: Conversation) => void;
};

export default function Sidebar({
  conversations,
  selectedId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
}: Props) {
  return (
    <aside
      className="
        flex
        h-full
        w-80
        flex-col
        border-r
        bg-white
      "
    >
      <div className="p-4">
        <NewChatButton onClick={onCreate} />
      </div>

      <div
        className="
          flex-1
          space-y-2
          overflow-y-auto
          p-4
        "
      >
        {conversations.map(
          (conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              selected={
                conversation.id === selectedId
              }
              onSelect={onSelect}
              onRename={onRename}
              onDelete={onDelete}
            />
          )
        )}
      </div>
    </aside>
  )
}
