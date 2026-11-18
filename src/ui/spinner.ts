
import chalk from "chalk";

const frames = ["◐", "◓", "◑", "◒"];

export class Spinner {
  private timer?: ReturnType<typeof setInterval>;
  private frame = 0;
  private message: string;

  constructor(message = "Processing") {
    this.message = message;
  }

  start(): void {
    if (this.timer) {
      return;
    }

    this.frame = 0;

    this.timer = setInterval(() => {
      const symbol = frames[this.frame % frames.length];
      this.frame++;

      process.stdout.write(
        `\r\x1b[2K${chalk.cyan(symbol)} ${this.message}`
      );
    }, 100);
  }

  update(message: string): void {
    this.message = message;
  }

  stop(finalMessage?: string): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }

    process.stdout.write("\r\x1b[2K");

    if (finalMessage) {
      console.log(finalMessage);
    }
  }
}
