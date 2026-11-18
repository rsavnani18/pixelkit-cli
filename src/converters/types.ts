
import type { OutputFormat } from "../core/output-manager.js";

export interface ConverterDefinition {
  id: string;
  name: string;
  command: string;
  description: string;
  outputFormat: OutputFormat;
  supportedExtensions: readonly string[];
  qualitySupported: boolean;
}

export type ConverterId = "webp" | "png";
