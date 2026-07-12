import type { Source } from "../types/chat";

import SourceCard from "./SourceCard";

type Props = {
  sources?: Source[];
};

export default function SourceList({
  sources,
}: Props) {
  if (
    !sources || sources.length === 0
  ) {
    return null;
  }
  return (
    <div className="mt-3">
      <div className="
        mb-2
        text-sm
        font-semibold
      ">
        Sources
      </div>
      <div className="space-y-2">
        {sources.map(source => (
          <SourceCard
            key={
              `${source.documentId}-${source.chunkIndex}`
            }
            source={source}
          />
        ))}
      </div>
    </div>
  );
}
