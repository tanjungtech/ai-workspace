export const logger = {
  info(message: string) {
    console.log(
      `[INFO] ${message}`
    );
  },

  warn(message: string) {
    console.warn(
      `[WARN] ${message}`
    );
  },

  error(message: string) {
    console.error(
      `[ERROR] ${message}`
    );
  },
};

export function logInfo(
  message: string,
  data?: unknown
) {
  console.log(
    `[INFO] ${message}`,
    data ?? ""
  );
}

export function logError(
  message: string,
  error: unknown
) {
  console.error(
    `[ERROR] ${message}`,
    error
  );
}