import type { Source } from "../types/chat";

type Props = {
  source: Source;
};

export default function SourceCard({
  source,
}: Props) {
  return (
    <div className="
      rounded-md
      border
      p-3
    ">
      <div className="flex justify-between">
        <div className="font-medium">
          {source.documentName}
        </div>
        <div className="text-xs text-gray-500">
          Chunk {source.chunkIndex}
        </div>
      </div>
      <div className="
        mt-1
        text-sm
        text-green-600
      ">
        Similarity
        {" "}
        {(source.similarity * 100).toFixed(1)}%
      </div>
      <div className="
        mt-2
        text-sm
        text-gray-700
      ">
        {source.preview}
      </div>
    </div>
  );
}
