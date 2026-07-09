import { useState } from "react";

import type { Conversation } from "../types/conversation";
import Button from "../../../components/ui/Button";

type Props = {
  conversation: Conversation;
  onSave: (
    id: string,
    title: string
  ) => void;
  onClose: () => void;
};

export default function RenameDialog({
  conversation,
  onSave,
  onClose,
}: Props) {
  const [title, setTitle] = useState(conversation.title);

  return (
    <div
      className="
        fixed
        inset-0
        flex
        items-center
        justify-center
        bg-black/50
      "
    >
      <div className="
        w-96
        rounded-lg
        bg-white
        p-6
      ">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            rounded
            border
            p-2
          "
        />

        <div
          className="
            mt-4
            flex
            justify-end
            gap-2
          "
        >
          <Button variant="danger" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            onClick={() => onSave(conversation.id, title)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}