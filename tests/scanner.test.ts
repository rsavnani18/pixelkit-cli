
import test from "node:test";
import assert from "node:assert/strict";

import {
  mkdtemp,
  mkdir,
  rm,
  writeFile
} from "node:fs/promises";

import os from "node:os";
import path from "node:path";

import { scanImages } from "../src/core/scanner.js";

async function createTestDirectory(): Promise<string> {
  return mkdtemp(
    path.join(os.tmpdir(), "pixelkit-scan-")
  );
}

test("finds supported images in a directory", async () => {
  const directory = await createTestDirectory();

  try {
    await writeFile(path.join(directory, "logo.png"), "test");
    await writeFile(path.join(directory, "photo.jpg"), "test");
    await writeFile(path.join(directory, "banner.jpeg"), "test");
    await writeFile(path.join(directory, "document.pdf"), "test");

    const images = await scanImages(directory, "webp");

    assert.equal(images.length, 3);

    assert.deepEqual(
      images.map((image) => image.name),
      ["banner.jpeg", "logo.png", "photo.jpg"]
    );
  } finally {
    await rm(directory, {
      recursive: true,
      force: true
    });
  }
});

test("excludes existing WebP files from WebP conversion", async () => {
  const directory = await createTestDirectory();

  try {
    await writeFile(path.join(directory, "logo.png"), "test");
    await writeFile(path.join(directory, "photo.webp"), "test");

    const images = await scanImages(directory, "webp");

    assert.equal(images.length, 1);
    assert.equal(images[0]!.name, "logo.png");
  } finally {
    await rm(directory, {
      recursive: true,
      force: true
    });
  }
});

test("excludes existing PNG files from PNG conversion", async () => {
  const directory = await createTestDirectory();

  try {
    await writeFile(path.join(directory, "logo.png"), "test");
    await writeFile(path.join(directory, "photo.webp"), "test");

    const images = await scanImages(directory, "png");

    assert.equal(images.length, 1);
    assert.equal(images[0]!.name, "photo.webp");
  } finally {
    await rm(directory, {
      recursive: true,
      force: true
    });
  }
});

test("does not scan subdirectories", async () => {
  const directory = await createTestDirectory();

  try {
    const nested = path.join(directory, "nested");

    await mkdir(nested);
    await writeFile(path.join(nested, "hidden.png"), "test");

    const images = await scanImages(directory, "webp");

    assert.equal(images.length, 0);
  } finally {
    await rm(directory, {
      recursive: true,
      force: true
    });
  }
});

test("returns file size and absolute path", async () => {
  const directory = await createTestDirectory();

  try {
    const filePath = path.join(directory, "logo.png");

    await writeFile(filePath, "sample-image");

    const images = await scanImages(directory, "webp");

    assert.equal(images[0]!.size, 12);
    assert.equal(images[0]!.path, filePath);
  } finally {
    await rm(directory, {
      recursive: true,
      force: true
    });
  }
});
