type Props = {
  status?: string;
  history?: string[];
};

export default function AgentStatus({
  status,
  history
}: Props) {
  if (!status && !history?.length) {
    return null;
  }
  return (
    <div className="
      mb-2
      rounded-lg
      border
      bg-slate-50
      p-3
    ">
      <div className="
        mb-2
        text-xs
        font-semibold
        uppercase
        tracking-wide
        text-slate-500
      ">
        Agent
      </div>
      {
        history?.map((step, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              gap-2
              py-1
              text-sm
            "
          >
            <span>
              ✅
            </span>
            <span>
              {step}
            </span>
          </div>
        ))
      }
      {
        status && (
          <div className="
            mt-2
            rounded-full
            bg-blue-100
            px-3
          ">
            {status}
          </div>
        )
      }
    </div>
  );
}
