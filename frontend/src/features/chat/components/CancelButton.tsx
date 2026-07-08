type Props = {
  onCancel: () => void;
};

export default function CancelButton({
  onCancel,
}: Props) {
  return (
    <button
      onClick={onCancel}
      className="
        rounded-lg
        bg-red-500
        px-4
        py-2
        text-white
      "
    >
      Stop Generating
    </button>
  )
}
