
import sharp from "sharp";
import path from "node:path";

import type { OutputFormat } from "./output-manager.js";
import { prepareOutput } from "./output-manager.js";

export interface ConversionOptions {
  format: OutputFormat;
  quality?: number;
  overwrite?: boolean;
}

export interface ConversionResult {
  inputPath: string;
  outputPath: string;
  success: boolean;
  inputSize?: number;
  outputSize?: number;
  error?: string;
}

export async function convertImage(
  inputPath: string,
  options: ConversionOptions
): Promise<ConversionResult> {
  try {
    const output = await prepareOutput(
      inputPath,
      options.format
    );

    if (output.exists && !options.overwrite) {
      throw new Error(
        `Output already exists: ${path.basename(output.outputPath)}`
      );
    }

    const image = sharp(inputPath);

    if (options.format === "webp") {
      await image
        .webp({
          quality: options.quality ?? 80,
          effort: 4
        })
        .toFile(output.outputPath);
    } else {
      await image
        .png({
          compressionLevel: 6
        })
        .toFile(output.outputPath);
    }

    const fs = await import("node:fs/promises");

    const [inputStats, outputStats] = await Promise.all([
      fs.stat(inputPath),
      fs.stat(output.outputPath)
    ]);

    return {
      inputPath,
      outputPath: output.outputPath,
      success: true,
      inputSize: inputStats.size,
      outputSize: outputStats.size
    };
  } catch (error) {
    return {
      inputPath,
      outputPath: "",
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown conversion error."
    };
  }
}
