
import {
  access,
  constants
} from "node:fs/promises";

import path from "node:path";

export type OutputFormat = "webp" | "png";

export interface OutputInfo {
  outputPath: string;
  exists: boolean;
}

export function getOutputPath(
  inputPath: string,
  format: OutputFormat
): string {
  const directory = path.dirname(inputPath);
  const filename = path.basename(inputPath, path.extname(inputPath));

  return path.join(directory, `${filename}.${format}`);
}

export async function checkOutput(
  outputPath: string
): Promise<OutputInfo> {
  try {
    await access(outputPath, constants.F_OK);

    return {
      outputPath,
      exists: true
    };
  } catch {
    return {
      outputPath,
      exists: false
    };
  }
}

export async function prepareOutput(
  inputPath: string,
  format: OutputFormat
): Promise<OutputInfo> {
  const outputPath = getOutputPath(inputPath, format);
  return checkOutput(outputPath);
}
