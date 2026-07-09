import type { Document } from "../types/document";

type Props = {
  documents: Document[];
}

export default function Documentlist({
  documents,
}: Props) {
  return (
    <div className="space-y-3">
      {documents.map((document) => (
        <div
          key={document.id}
          className="
            rounded-lg
            border
            p-4
          "
        >
          <div>{document.originalName}</div>

          <div className="
            text-sm
            text-gray-500
          "
          >
            {document.size} bytes
          </div>
        </div>
      ))}
    </div>
  );
}