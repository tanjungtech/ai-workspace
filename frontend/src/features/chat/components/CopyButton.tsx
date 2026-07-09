import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "../../../components/ui/Button";

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
      <Button
        variant="primary"
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
    </CopyToClipboard>
  );
}