
import { existsSync, statSync } from "node:fs";
import path from "node:path";

export type InputType = "directory" | "file";

export interface ParsedInput {
  type: InputType;
  path: string;
}

export interface ParsedArguments {
  input: ParsedInput;
}

export function parseArguments(args: string[]): ParsedArguments {
  // Remove the argument separator sometimes forwarded by package managers.
  const cleanArgs = args.filter((arg) => arg !== "--");

  if (cleanArgs.length === 0) {
    return {
      input: {
        type: "directory",
        path: process.cwd()
      }
    };
  }

  if (cleanArgs.length > 1) {
    throw new Error(
      "Only one directory or image path can be provided."
    );
  }

  const providedPath = cleanArgs[0];

  if (!providedPath) {
    throw new Error("Please provide a valid path.");
  }

  const absolutePath = path.resolve(process.cwd(), providedPath);

  if (!existsSync(absolutePath)) {
    throw new Error(`Path does not exist: ${providedPath}`);
  }

  const stats = statSync(absolutePath);

  if (stats.isDirectory()) {
    return {
      input: {
        type: "directory",
        path: absolutePath
      }
    };
  }

  if (stats.isFile()) {
    return {
      input: {
        type: "file",
        path: absolutePath
      }
    };
  }

  throw new Error(`Unsupported path type: ${providedPath}`);
}
