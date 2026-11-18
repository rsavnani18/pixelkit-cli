
import chalk from "chalk";

export function success(message: string): void {
  console.log(`${chalk.green("✔")} ${message}`);
}

export function error(message: string): void {
  console.error(`${chalk.red("✖")} ${message}`);
}

export function warning(message: string): void {
  console.log(`${chalk.yellow("⚠")} ${message}`);
}

export function info(message: string): void {
  console.log(`${chalk.cyan("ℹ")} ${message}`);
}

export function heading(message: string): void {
  console.log(`\n${chalk.bold.cyan(message)}\n`);
}

export function muted(message: string): void {
  console.log(chalk.gray(message));
}

export function divider(): void {
  console.log(chalk.gray("─".repeat(45)));
}
