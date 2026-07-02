export interface VersionInfo {
  name: string;
  version: string;
  environment: string;
}

export function getVersionInfo(): VersionInfo {
  return {
    name: 'AI Workspace API',
    version: '1.0.0',
    environment: process.env.NODE_ENV ?? 'development',
  };
}