import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  text: string;
};

export default function CopyButton({
  text,
}: Props) {
  const [copied, setCopied] = useState(false);

  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
    >
      <button
        className="
          rounded
          bg-gray-700
          px-3
          py-1
          text-sm
          text-white
        "
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </CopyToClipboard>
  );
}