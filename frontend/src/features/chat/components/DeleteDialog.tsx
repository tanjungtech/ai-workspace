import type { Conversation } from "../types/conversation";
import Button from "../../../components/ui/Button";

type Props = {
  conversation: Conversation;
  onConfirm: (id: string) => void;
  onClose: () => void;
}

export default function DeleteDialog({
  conversation,
  onConfirm,
  onClose
}: Props) {
  return (
    <div className="
      fixed
      inset-0
      flex
      items-center
      justify-center
      bg-black/50
    ">
      <div className="
        w-96
        rounded-lg
        bg-white
        p-6
      ">
        <h2 className="text-lg font-bold">
          Delete Conversation
        </h2>

        <p className="mt-4">
          {conversation.title}
        </p>

        <div className="
          mt-6
          flex
          justify-end
          gap-2
        ">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="text-red-600"
            onClick={() => onConfirm(conversation.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
