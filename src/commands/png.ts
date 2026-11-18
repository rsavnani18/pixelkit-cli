#!/usr/bin/env node
import path from "node:path";
import chalk from "chalk";

import { parseArguments } from "../cli/arguments.js";
import { scanImages } from "../core/scanner.js";
import {
  validateImage,
  validateImages
} from "../core/file-validator.js";
import { convertToPng } from "../converters/png/index.js";
import { getConverter } from "../converters/registry.js";
import { selectImages } from "../ui/image-selector.js";
import { renderProgress } from "../ui/progress.js";
import {
  success,
  error,
  warning,
  heading,
  info
} from "../ui/messages.js";

async function main(): Promise<void> {
  try {
    const parsed = parseArguments(process.argv.slice(2));
    const input = parsed.input;

    const converter = getConverter("png");

    heading("PIXELKIT PNG CONVERTER");

    let files;

    // Single image mode
    if (input.type === "file") {
      const extension = path.extname(input.path).toLowerCase();

      if (!converter.supportedExtensions.includes(extension)) {
        throw new Error(`Unsupported image format: ${extension}`);
      }

      const validation = await validateImage({
        name: path.basename(input.path),
        path: input.path,
        extension,
        size: 0
      });

      if (!validation.valid) {
        throw new Error(
          `Invalid image: ${validation.error ?? "Unable to read image"}`
        );
      }

      files = [validation.file];
      info("Single image detected. Starting direct conversion.");
    } else {
      // Directory mode
      const scannedImages = await scanImages(
        input.path,
        "png"
      );

      if (scannedImages.length === 0) {
        warning("No supported images found in this directory.");
        return;
      }

      info(`${scannedImages.length} image(s) found.`);

      const validationResults = await validateImages(scannedImages);

      const validImages = validationResults
        .filter((result) => result.valid)
        .map((result) => result.file);

      const invalidCount = scannedImages.length - validImages.length;

      if (invalidCount > 0) {
        warning(`${invalidCount} invalid image(s) skipped.`);
      }

      if (validImages.length === 0) {
        warning("No valid images available for conversion.");
        return;
      }

      files = await selectImages(validImages);

      if (files.length === 0) {
        warning("No images selected. Conversion cancelled.");
        return;
      }
    }

    // Conversion
    heading("CONVERSION STARTED");

    let successful = 0;
    let failed = 0;

    for (let index = 0; index < files.length; index++) {
      const file = files[index]!;

      const result = await convertToPng(file.path);

      if (result.success) {
        successful++;
        success(`${file.name} → ${path.basename(result.outputPath)}`);
      } else {
        failed++;
        error(`${file.name}: ${result.error ?? "Conversion failed"}`);
      }

      renderProgress(index + 1, files.length, "Converting");
    }

    // Summary
    heading("CONVERSION SUMMARY");

    success(`Successful: ${successful}`);

    if (failed > 0) {
      error(`Failed: ${failed}`);
    }

    info(`Total selected: ${files.length}`);

    console.log(
      chalk.green("\nPNG conversion process completed!\n")
    );

    if (failed > 0) {
      process.exitCode = 1;
    }
  } catch (err) {
    error(
      err instanceof Error
        ? err.message
        : "An unexpected error occurred."
    );

    process.exitCode = 1;
  }
}

void main();
