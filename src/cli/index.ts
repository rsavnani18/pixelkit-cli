#!/usr/bin/env node
import path from "node:path";
import { pathToFileURL } from "node:url";
import chalk from "chalk";

import { handleGlobalCommand, showHelp } from "./commands.js";

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  // Detect the executable name used by the user.
  const executableName = path
    .basename(process.argv[1] ?? "")
    .replace(/\.(js|ts|mjs|cjs)$/i, "")
    .toLowerCase();

  let converterCommand: "webpkit" | "pngkit" | undefined;

  if (executableName === "webpkit" || executableName === "pngkit") {
    converterCommand = executableName;
  } else if (args[0] === "webpkit" || args[0] === "pngkit") {
    // Also supports: pixelkit-cli webpkit ./images
    converterCommand = args[0];
    process.argv.splice(2, 1);
  }

  // Run the selected converter.
  if (converterCommand) {
    if (converterCommand === "webpkit") {
      await import("../commands/webp.js");
    } else {
      await import("../commands/png.js");
    }

    return;
  }

  // Handle global CLI options.
  if (handleGlobalCommand(args)) {
    return;
  }

  if (args.length === 0) {
    showHelp();
    return;
  }

  console.error(
    chalk.red(`Unknown command or option: ${args[0]}`)
  );

  console.log(
    chalk.gray("Run pixelkit-cli --help for usage information.")
  );

  process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error(
    chalk.red(
      error instanceof Error
        ? error.message
        : "An unexpected error occurred."
    )
  );

  process.exitCode = 1;
});
