
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

export type OutputFormat = "webp" | "png";

export interface ImageFile {
  name: string;
  path: string;
  extension: string;
  size: number;
}

const SUPPORTED_IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".tif",
  ".tiff",
  ".bmp"
]);

export async function scanImages(
  directoryPath: string,
  outputFormat: OutputFormat
): Promise<ImageFile[]> {
  const absolutePath = path.resolve(directoryPath);

  const entries = await readdir(absolutePath, {
    withFileTypes: true
  });

  const images: ImageFile[] = [];

  for (const entry of entries) {
    // Only scan files in the current directory.
    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    // Ignore unsupported extensions.
    if (!SUPPORTED_IMAGE_EXTENSIONS.has(extension)) {
      continue;
    }

    // Ignore files already in the target format.
    if (extension === `.${outputFormat}`) {
      continue;
    }

    const filePath = path.join(absolutePath, entry.name);
    const fileStats = await stat(filePath);

    images.push({
      name: entry.name,
      path: filePath,
      extension,
      size: fileStats.size
    });
  }

  return images.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}
