import CodeBlock from "./CodeBlock";

export const markdownComponents = {
  h1: (props: any) => (
    <h1
      className="mb-4 mt-6 text-3xl font-bold"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mb-3 mt-5 text-2xl font-semibold"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="leading-8"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="ml-6 list-disc"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="ml-6 list-decimal"
      {...props}
    />
  ),
  code({
    inline,
    className,
    children
  }: any) {
    const match =
      /language-(\w+)/.exec(
        className || ""
      );
    if (inline) {
      return (
        <code
          className="
            rounded bg-gray-700 px-1
          "
        >
          {children}
        </code>
      );
    }

    return (
      <CodeBlock
        language={
          match?.[1] ?? "text"
        }
        code={String(children)}
      />
    );
  }
}
