
import type {
  ConverterDefinition,
  ConverterId
} from "./types.js";

const converters: Record<ConverterId, ConverterDefinition> = {
  webp: {
    id: "webp",
    name: "WebP Converter",
    command: "webpkit",
    description: "Convert images into optimized WebP format.",
    outputFormat: "webp",
    supportedExtensions: [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".avif",
      ".tif",
      ".tiff",
      ".bmp"
    ],
    qualitySupported: true
  },

  png: {
    id: "png",
    name: "PNG Converter",
    command: "pngkit",
    description: "Convert images into PNG format.",
    outputFormat: "png",
    supportedExtensions: [
      ".jpg",
      ".jpeg",
      ".webp",
      ".gif",
      ".avif",
      ".tif",
      ".tiff",
      ".bmp"
    ],
    qualitySupported: false
  }
};

export function getConverter(
  id: ConverterId
): ConverterDefinition {
  return converters[id];
}

export function getAllConverters(): ConverterDefinition[] {
  return Object.values(converters);
}

export function isConverterAvailable(
  id: string
): id is ConverterId {
  return Object.hasOwn(converters, id);
}
