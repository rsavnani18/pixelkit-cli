
import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  rm,
  stat
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

import { convertImage } from "../src/core/converter.js";

test("converts PNG to WebP", async () => {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "pixelkit-convert-")
  );

  try {
    const input = path.join(directory, "sample.png");

    await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 1 }
      }
    })
      .png()
      .toFile(input);

    const result = await convertImage(input, {
      format: "webp"
    });

    assert.equal(result.success, true);
    assert.equal(result.outputPath, path.join(directory, "sample.webp"));

    const outputStats = await stat(result.outputPath);

    assert.ok(outputStats.size > 0);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("preserves transparency when converting PNG to WebP", async () => {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "pixelkit-alpha-")
  );

  try {
    const input = path.join(directory, "transparent.png");

    await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 0 }
      }
    })
      .png()
      .toFile(input);

    const result = await convertImage(input, {
      format: "webp"
    });

    assert.equal(result.success, true);

    const metadata = await sharp(result.outputPath).metadata();

    assert.equal(metadata.hasAlpha, true);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("converts WebP to PNG", async () => {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "pixelkit-png-")
  );

  try {
    const input = path.join(directory, "sample.webp");

    await sharp({
      create: {
        width: 80,
        height: 80,
        channels: 3,
        background: { r: 0, g: 150, b: 255 }
      }
    })
      .webp()
      .toFile(input);

    const result = await convertImage(input, {
      format: "png"
    });

    assert.equal(result.success, true);

    const metadata = await sharp(result.outputPath).metadata();

    assert.equal(metadata.format, "png");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("does not overwrite an existing output file", async () => {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "pixelkit-overwrite-")
  );

  try {
    const input = path.join(directory, "sample.png");
    const output = path.join(directory, "sample.webp");

    await sharp({
      create: {
        width: 20,
        height: 20,
        channels: 3,
        background: { r: 0, g: 0, b: 255 }
      }
    })
      .png()
      .toFile(input);

    await sharp(input).webp().toFile(output);

    const result = await convertImage(input, {
      format: "webp"
    });

    assert.equal(result.success, false);
    assert.match(result.error ?? "", /already exists/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("returns an error for an invalid image", async () => {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "pixelkit-invalid-")
  );

  try {
    const input = path.join(directory, "invalid.png");

    const { writeFile } = await import("node:fs/promises");

    await writeFile(input, "not-an-image");

    const result = await convertImage(input, {
      format: "webp"
    });

    assert.equal(result.success, false);
    assert.ok(result.error);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
