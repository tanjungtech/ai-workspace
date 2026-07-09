import Button from "../../../components/ui/Button";

type Props = {
  onClick: () => void;
};

export default function NewChatButton({
  onClick, 
}: Props) {
  return (
    <Button
      variant="primary"
      onClick={onClick}
    >
      New Chat
    </Button>
  );
}
