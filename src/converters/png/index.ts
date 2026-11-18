
import {
  convertImage,
  type ConversionResult
} from "../../core/converter.js";

import {
  DEFAULT_PNG_OPTIONS,
  type PngOptions
} from "./options.js";

export async function convertToPng(
  inputPath: string,
  options: Partial<PngOptions> = {}
): Promise<ConversionResult> {
  const settings = {
    ...DEFAULT_PNG_OPTIONS,
    ...options
  };

  if (
    !Number.isInteger(settings.compressionLevel) ||
    settings.compressionLevel < 0 ||
    settings.compressionLevel > 9
  ) {
    throw new Error(
      "PNG compression level must be between 0 and 9."
    );
  }

  if (
    settings.quality !== undefined &&
    (
      !Number.isInteger(settings.quality) ||
      settings.quality < 1 ||
      settings.quality > 100
    )
  ) {
    throw new Error("PNG quality must be between 1 and 100.");
  }

  return convertImage(inputPath, {
    format: "png"
  });
}
