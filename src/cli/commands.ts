
import { readFileSync } from "node:fs";
import path from "node:path";
import chalk from "chalk";

import { getAllConverters } from "../converters/registry.js";
import {
  APP_NAME,
  PACKAGE_NAME
} from "../utils/constants.js";

interface PackageInfo {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  repository?: {
    url?: string;
  };
  homepage?: string;
}

function getPackageInfo(): PackageInfo {
  const packagePath = new URL("../../package.json", import.meta.url);
  return JSON.parse(
    readFileSync(packagePath, "utf8")
  ) as PackageInfo;
}

export function showHelp(): void {
  console.log(`
${chalk.bold.cyan("PIXELKIT CLI")}
${chalk.gray("Modern image conversion toolkit for developers")}

${chalk.bold("USAGE")}
  pixelkit-cli [options]
  webpkit [path]
  pngkit [path]

${chalk.bold("GLOBAL OPTIONS")}
  ${chalk.green("--help, -h")}       Display CLI help
  ${chalk.green("--list, -l")}       List available converters
  ${chalk.green("--version, -v")}   Display installed version
  ${chalk.green("--info")}           Display project information

${chalk.bold("CONVERTER COMMANDS")}
  ${chalk.yellow("webpkit [path]")}  Convert images to WebP
  ${chalk.yellow("pngkit [path]")}   Convert images to PNG

${chalk.bold("EXAMPLES")}
  webpkit
  webpkit ./my-app/public
  webpkit ./my-app/public/logo.png

  pngkit
  pngkit ./my-app/public
  pngkit ./my-app/public/logo.webp

${chalk.cyan("Use pixelkit-cli --list to see available converters.")}
`);
}

export function showConverterList(): void {
  console.log(`\n${chalk.bold.cyan("AVAILABLE CONVERTERS")}\n`);

  for (const converter of getAllConverters()) {
    console.log(
      `  ${chalk.yellow(converter.command)}`
    );
    console.log(
      `  ${chalk.gray(converter.description)}`
    );
    console.log(
      `  Output: ${chalk.green(converter.outputFormat.toUpperCase())}\n`
    );
  }
}

export function showVersion(): void {
  const packageInfo = getPackageInfo();

  console.log(
    `${chalk.bold.cyan(APP_NAME)} ${chalk.green(`v${packageInfo.version}`)}`
  );
}

export function showInfo(): void {
  const packageInfo = getPackageInfo();

  console.log(`
${chalk.bold.cyan(APP_NAME)}
${chalk.gray(packageInfo.description)}

${chalk.bold("PROJECT INFORMATION")}
  Package:    ${chalk.green(packageInfo.name || PACKAGE_NAME)}
  Version:    ${chalk.green(packageInfo.version)}
  Author:     ${packageInfo.author}
  License:    ${packageInfo.license}

${chalk.bold("PROJECT LINKS")}
  GitHub:     ${packageInfo.repository?.url ?? "Not configured"}
  Homepage:   ${packageInfo.homepage ?? "Not configured"}
  npm:        https://www.npmjs.com/package/${packageInfo.name}

${chalk.cyan("Built for developers, powered by PixelKit.")}
`);
}

export function handleGlobalCommand(args: string[]): boolean {
  const cleanArgs = args.filter((arg) => arg !== "--");

  if (cleanArgs.length === 0) {
    return false;
  }

  if (cleanArgs.length > 1) {
    return false;
  }

  const command = cleanArgs[0];

  switch (command) {
    case "--help":
    case "-h":
      showHelp();
      return true;

    case "--list":
    case "-l":
      showConverterList();
      return true;

    case "--version":
    case "-v":
      showVersion();
      return true;

    case "--info":
      showInfo();
      return true;

    default:
      return false;
  }
}
