
import sharp from "sharp";
import type { ImageFile } from "./scanner.js";

export interface ValidationResult {
  file: ImageFile;
  valid: boolean;
  format?: string;
  width?: number;
  height?: number;
  error?: string;
}

export async function validateImage(
  file: ImageFile
): Promise<ValidationResult> {
  try {
    const metadata = await sharp(file.path).metadata();

    if (!metadata.format || !metadata.width || !metadata.height) {
      throw new Error("Invalid or unreadable image.");
    }

    return {
      file,
      valid: true,
      format: metadata.format,
      width: metadata.width,
      height: metadata.height
    };
  } catch (error) {
    return {
      file,
      valid: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown image validation error."
    };
  }
}

export async function validateImages(
  files: ImageFile[]
): Promise<ValidationResult[]> {
  return Promise.all(
    files.map((file) => validateImage(file))
  );
}
