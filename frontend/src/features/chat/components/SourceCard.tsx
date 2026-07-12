import type { Source } from "../types/chat";

type Props = {
  source: Source;
};

export default function SourceCard({
  source,
}: Props) {

  const badgeClass =
    source.similarity >= 0.85
      ?
      "bg-green-100 text-green-700"
      : source.similarity >= 0.70
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

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
      {/* <div className="
        mt-1
        text-sm
        text-green-600
      ">
        Similarity
        {" "}
        {(source.similarity * 100).toFixed(1)}%
      </div> */}
      <div className="
        flex
        items-center
        gap-2
      ">
        <span className="font-medium">
          {source.documentName}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-xs ${badgeClass}`}>
          {(source.similarity * 100).toFixed(1)}%
        </span>
      </div>
      <p className="
        mt-2
        line-clamp-3
        text-sm
        text-gray-600
      ">
        {source.preview}
      </p>
    </div>
  );
}
