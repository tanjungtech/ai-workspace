import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import CopyButton from "./CopyButton";

type Props = {
  language: string;
  code: string;
}

export default function CodeBlock({
  language,
  code,
}: Props){
  return (
    <div className="relative my-4">
      <div className="absolute right-2 top-2">
        <CopyButton text={code} />
      </div>

      <SyntaxHighlighter
        language={language}
        style={atomDark}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
