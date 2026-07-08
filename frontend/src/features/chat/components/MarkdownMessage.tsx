import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { markdownComponents } from "./StyledMarkdown";

// type MarkdownMessageProps = {
//   content: string;
// };

type Props = {
  content: string;
};

export default function MarkdownMessage({
  content,
}: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
