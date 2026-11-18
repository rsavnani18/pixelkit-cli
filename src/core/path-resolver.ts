
import {
  existsSync,
  statSync,
  realpathSync
} from "node:fs";

import path from "node:path";

export interface ResolvedPath {
  absolutePath: string;
  type: "directory" | "file";
}

export function resolveInputPath(
  inputPath?: string
): ResolvedPath {
  const targetPath = inputPath
    ? path.resolve(process.cwd(), inputPath)
    : process.cwd();

  if (!existsSync(targetPath)) {
    throw new Error(`Path does not exist: ${targetPath}`);
  }

  const absolutePath = realpathSync(targetPath);
  const stats = statSync(absolutePath);

  if (stats.isDirectory()) {
    return {
      absolutePath,
      type: "directory"
    };
  }

  if (stats.isFile()) {
    return {
      absolutePath,
      type: "file"
    };
  }

  throw new Error(`Unsupported path type: ${absolutePath}`);
}
