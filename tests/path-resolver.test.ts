
import test from "node:test";
import assert from "node:assert/strict";

import {
  mkdtempSync,
  rmSync,
  writeFileSync
} from "node:fs";

import os from "node:os";
import path from "node:path";

import { resolveInputPath } from "../src/core/path-resolver.js";
import { parseArguments } from "../src/cli/arguments.js";

test("resolves current working directory when no path is provided", () => {
  const result = resolveInputPath();

  assert.equal(result.type, "directory");
  assert.equal(result.absolutePath, process.cwd());
});

test("resolves a relative directory path", () => {
  const directory = mkdtempSync(
    path.join(os.tmpdir(), "pixelkit-path-")
  );

  try {
    const result = resolveInputPath(directory);

    assert.equal(result.type, "directory");
    assert.equal(result.absolutePath, directory);
  } finally {
    rmSync(directory, {
      recursive: true,
      force: true
    });
  }
});

test("identifies a file path", () => {
  const directory = mkdtempSync(
    path.join(os.tmpdir(), "pixelkit-path-")
  );

  const filePath = path.join(directory, "sample.png");

  try {
    writeFileSync(filePath, "test");

    const result = resolveInputPath(filePath);

    assert.equal(result.type, "file");
    assert.equal(result.absolutePath, filePath);
  } finally {
    rmSync(directory, {
      recursive: true,
      force: true
    });
  }
});

test("throws an error for a missing path", () => {
  const directory = mkdtempSync(
    path.join(os.tmpdir(), "pixelkit-missing-")
  );

  const missingPath = path.join(directory, "missing.png");

  try {
    assert.throws(
      () => resolveInputPath(missingPath),
      /Path does not exist/
    );
  } finally {
    rmSync(directory, {
      recursive: true,
      force: true
    });
  }
});

test("parseArguments defaults to current directory", () => {
  const result = parseArguments([]);

  assert.equal(result.input.type, "directory");
  assert.equal(result.input.path, process.cwd());
});

test("parseArguments rejects multiple paths", () => {
  assert.throws(
    () => parseArguments(["./images", "./other"]),
    /Only one directory or image path/
  );
});
