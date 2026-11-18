
import chalk from "chalk";

export type LogLevel =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "debug";

const prefixes: Record<LogLevel, string> = {
  success: chalk.green("✔"),
  error: chalk.red("✖"),
  warning: chalk.yellow("⚠"),
  info: chalk.cyan("ℹ"),
  debug: chalk.gray("◆")
};

export function log(
  level: LogLevel,
  message: string
): void {
  const output = `${prefixes[level]} ${message}`;

  if (level === "error") {
    console.error(output);
    return;
  }

  if (level === "debug") {
    if (process.env.PIXELKIT_DEBUG === "1") {
      console.log(output);
    }

    return;
  }

  console.log(output);
}

export const logger = {
  success: (message: string) => log("success", message),

  error: (message: string) => log("error", message),

  warning: (message: string) => log("warning", message),

  info: (message: string) => log("info", message),

  debug: (message: string) => log("debug", message)
};
