
import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  rm,
  stat
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const projectRoot = process.cwd();

const webpCommand = path.join(
  projectRoot,
  "src/commands/webp.ts"
);

const pngCommand = path.join(
  projectRoot,
  "src/commands/png.ts"
);

function runCommand(
  commandPath: string,
  imagePath: string
) {
  return spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      commandPath,
      imagePath
    ],
    {
      cwd: projectRoot,
      encoding: "utf8",
      timeout: 30000
    }
  );
}

test("webpkit converts a single PNG image", async () => {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "pixelkit-command-webp-")
  );

  try {
    const input = path.join(directory, "logo.png");
    const output = path.join(directory, "logo.webp");

    await sharp({
      create: {
        width: 50,
        height: 50,
        channels: 3,
        background: { r: 255, g: 0, b: 0 }
      }
    })
      .png()
      .toFile(input);

    const result = runCommand(webpCommand, input);

    assert.equal(
      result.status,
      0,
      result.stderr || result.stdout
    );

    const outputStats = await stat(output);

    assert.ok(outputStats.size > 0);
    assert.match(result.stdout, /CONVERSION SUMMARY/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("pngkit converts a single WebP image", async () => {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "pixelkit-command-png-")
  );

  try {
    const input = path.join(directory, "logo.webp");
    const output = path.join(directory, "logo.png");

    await sharp({
      create: {
        width: 50,
        height: 50,
        channels: 3,
        background: { r: 0, g: 150, b: 255 }
      }
    })
      .webp()
      .toFile(input);

    const result = runCommand(pngCommand, input);

    assert.equal(
      result.status,
      0,
      result.stderr || result.stdout
    );

    const outputStats = await stat(output);

    assert.ok(outputStats.size > 0);
    assert.match(result.stdout, /CONVERSION SUMMARY/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("webpkit rejects unsupported image extensions", async () => {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "pixelkit-command-invalid-")
  );

  try {
    const input = path.join(directory, "document.pdf");

    const { writeFile } = await import("node:fs/promises");

    await writeFile(input, "sample");

    const result = runCommand(webpCommand, input);

    assert.notEqual(result.status, 0);

    assert.match(
      result.stdout + result.stderr,
      /Unsupported image format/
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
