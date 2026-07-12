export type ToolResult = {
  success: boolean;
  output: string;
};

export interface Tool {
  name: string;
  description: string;
  execute(
    input: string
  ): Promise<ToolResult>;
}
