type Props = {
  status?: string;
};

export default function AgentStatus({
  status,
}: Props) {
  if (!status) {
    return null;
  }
  return (
    <div className="
      mb-2
      text-sm
      italic
      text-gray-500
    ">
      {status}
    </div>
  );
}
