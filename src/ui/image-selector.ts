
import { checkbox } from "@inquirer/prompts";
import chalk from "chalk";

import type { ImageFile } from "../core/scanner.js";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export async function selectImages(
  images: ImageFile[]
): Promise<ImageFile[]> {
  if (images.length === 0) {
    console.log(
      chalk.yellow("\nNo images available for conversion.\n")
    );

    return [];
  }

  console.log(
    chalk.gray("\n↑/↓ Navigate  Space Select/Deselect  Enter Confirm\n")
  );

  const selectedImages = await checkbox({
    message: "Select images to convert",

    choices: images.map((image) => ({
      name: `${image.name} (${formatFileSize(image.size)})`,
      value: image
    })),

    pageSize: 12,
    required: false
  });

  console.log(
    chalk.cyan(`\n${selectedImages.length} image(s) selected.\n`)
  );

  return selectedImages;
}
