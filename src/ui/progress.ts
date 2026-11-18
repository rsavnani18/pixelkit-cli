
import chalk from "chalk";

export function renderProgress(
  current: number,
  total: number,
  label = "Processing"
): void {
  if (total <= 0) {
    return;
  }

  const percentage = Math.min(
    100,
    Math.max(0, Math.round((current / total) * 100))
  );

  const barWidth = 24;
  const filled = Math.round(
    (percentage / 100) * barWidth
  );

  const bar =
    chalk.green("█".repeat(filled)) +
    chalk.gray("░".repeat(barWidth - filled));

  const output =
    `${chalk.cyan(label)} ` +
    `${bar} ` +
    `${chalk.bold(`${percentage}%`)} ` +
    chalk.gray(`(${current}/${total})`);

  process.stdout.write(`\r${output}`);

  if (current >= total) {
    process.stdout.write("\n");
  }
}

export function clearProgress(): void {
  process.stdout.write("\r\x1b[2K");
}
