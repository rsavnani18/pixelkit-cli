
import {
  convertImage,
  type ConversionResult
} from "../../core/converter.js";

import {
  DEFAULT_WEBP_OPTIONS,
  type WebPOptions
} from "./options.js";

export async function convertToWebP(
  inputPath: string,
  options: Partial<WebPOptions> = {}
): Promise<ConversionResult> {
  const settings = {
    ...DEFAULT_WEBP_OPTIONS,
    ...options
  };

  if (
    !Number.isInteger(settings.quality) ||
    settings.quality < 1 ||
    settings.quality > 100
  ) {
    throw new Error("WebP quality must be between 1 and 100.");
  }

  if (
    !Number.isInteger(settings.effort) ||
    settings.effort < 0 ||
    settings.effort > 6
  ) {
    throw new Error("WebP effort must be between 0 and 6.");
  }

  return convertImage(inputPath, {
    format: "webp",
    quality: settings.quality
  });
}
