Contributing to PixelKit CLI

First of all, thank you for your interest in contributing to PixelKit CLI! 💙

PixelKit is an open-source, modular command-line image conversion toolkit built with TypeScript and Node.js.

We welcome contributions that improve the codebase, fix bugs, improve performance, enhance the CLI experience, add image converters, or improve documentation.

This guide explains how to set up the project, understand its architecture, follow coding rules, and submit contributions.

---

📌 Before You Start

Before contributing, make sure you have:

- Node.js 20 or later
- pnpm package manager
- Git
- Basic knowledge of TypeScript and Node.js

Important: This project uses pnpm.

Please use pnpm for installing dependencies, running scripts, and managing packages.

Do not use npm or yarn to install project dependencies.

---

📥 Getting Started

1. Fork the repository

Visit the official repository:

https://github.com/rsavnani18/pixelkit-cli

Click the Fork button to create your own copy.

2. Clone your fork

Replace "YOUR_USERNAME" with your GitHub username.

git clone https://github.com/YOUR_USERNAME/pixelkit-cli.git

Navigate into the project:

cd pixelkit-cli

3. Install dependencies

pnpm install

This installs the dependencies defined in "package.json" and uses "pnpm-lock.yaml" to maintain consistent versions.

4. Verify the project

Run the following commands:

pnpm typecheck
pnpm test
pnpm build

All checks should pass before you begin making changes.

---

🏗️ Project Architecture

PixelKit uses a modular architecture. Each part of the application has a specific responsibility.

Here are the main files contributors should understand.

CLI ("src/cli/")

File| Responsibility
"index.ts"| Main CLI entry point and command dispatching
"arguments.ts"| Parses user-provided arguments and paths
"commands.ts"| Handles global options such as help, list, version and info

Commands ("src/commands/")

File| Responsibility
"webp.ts"| WebP converter command
"png.ts"| PNG converter command

Command files connect user input with the appropriate converter and CLI interface.

Converters ("src/converters/")

File| Responsibility
"registry.ts"| Registers and exposes available converters
"types.ts"| Shared TypeScript types for converter definitions
"webp/"| WebP-specific conversion implementation
"png/"| PNG-specific conversion implementation

New image formats should follow the existing modular converter architecture.

Core ("src/core/")

File| Responsibility
"converter.ts"| Coordinates image conversion operations
"file-validator.ts"| Validates image files
"output-manager.ts"| Manages output paths and existing files
"path-resolver.ts"| Resolves user-provided file and directory paths
"scanner.ts"| Scans directories for supported image files

Core modules should contain reusable application logic rather than converter-specific terminal presentation.

UI ("src/ui/")

File| Responsibility
"image-selector.ts"| Interactive image selection
"messages.ts"| Terminal messages and user feedback
"progress.ts"| Conversion progress display
"spinner.ts"| Terminal loading indicators

Utilities ("src/utils/")

File| Responsibility
"constants.ts"| Shared application constants
"errors.ts"| Common error definitions and handling
"logger.ts"| Logging utilities

Tests ("tests/")

Automated tests verify CLI behavior, image conversion, path resolution, and directory scanning.

Existing test files include:

- "commands.test.ts"
- "converter.test.ts"
- "path-resolver.test.ts"
- "scanner.test.ts"

When adding a feature or fixing a bug, add or update the relevant tests.

---

📏 Contribution Rules

Please follow these rules when contributing.

1. Package Manager

pnpm is mandatory.

Use:

pnpm install
pnpm add package-name
pnpm add -D package-name
pnpm remove package-name

Do not commit "package-lock.json" or "yarn.lock".

The "pnpm-lock.yaml" file must be committed whenever dependency changes require an updated lockfile.

2. TypeScript

- Write new application code in TypeScript.
- Prefer explicit and meaningful types.
- Avoid using "any" unless there is a clear technical reason.
- Use the existing ESM import conventions.
- Keep functions small and focused.
- Avoid unnecessary dependencies.

3. Code Organization

- Keep converter-specific logic inside its respective converter module.
- Keep reusable processing logic inside "src/core/".
- Keep terminal presentation inside "src/ui/".
- Keep shared constants and utilities inside "src/utils/".
- Do not place all application logic inside the CLI entry point.
- Follow the existing architecture when adding new features.

4. Image Processing

- Preserve original input files.
- Never overwrite an existing output file without an explicit user-approved feature.
- Validate input files before processing.
- Handle invalid or unsupported image files gracefully.
- Preserve image transparency where the target format supports it.
- Handle conversion errors without crashing the entire application unnecessarily.

5. CLI Experience

- Keep commands simple and predictable.
- Provide clear error messages.
- Maintain consistent terminal styling using the existing UI utilities.
- Support paths containing spaces.
- Avoid unnecessary terminal output.
- Keep interactive selection behavior consistent with the existing interface.

6. Dependencies

Before adding a new dependency:

- Check whether existing packages can handle the requirement.
- Prefer lightweight and actively maintained packages.
- Avoid adding dependencies for trivial functionality.
- Explain the reason for introducing a new dependency in your Pull Request.

7. Documentation

Update relevant documentation when changing:

- CLI commands
- Installation instructions
- Converter behavior
- Package configuration
- Supported image formats
- Development workflows

---

🔧 Development Commands

Use the existing project scripts.

Command| Purpose
"pnpm dev"| Run the main CLI in development mode
"pnpm dev:webp"| Run the WebP command
"pnpm dev:png"| Run the PNG command
"pnpm typecheck"| Check TypeScript types
"pnpm test"| Run automated tests
"pnpm test:watch"| Run tests in watch mode
"pnpm build"| Generate production files
"pnpm clean"| Remove the production build
"pnpm check"| Run typecheck, tests and build
"pnpm format"| Format project files
"pnpm format:check"| Check formatting

Before submitting a Pull Request, run:

pnpm check

Make sure all checks pass.

---

🌿 Branch Naming

Use descriptive branch names.

Examples:

feature/avif-converter
feature/conversion-quality
fix/png-transparency
fix/path-validation
docs/update-readme
test/converter-coverage

Recommended prefixes:

- "feature/" for new functionality
- "fix/" for bug fixes
- "docs/" for documentation
- "test/" for tests
- "refactor/" for code improvements

---

🔄 How to Contribute

Follow this workflow:

1. Create a branch

git checkout -b feature/your-feature-name

2. Make your changes

Implement your feature or bug fix while following the project architecture and coding rules.

3. Test your changes

pnpm typecheck
pnpm test
pnpm build

4. Review your changes

git status
git diff

Make sure you are not committing unnecessary files, generated build artifacts, local test images, or personal configuration.

5. Commit your changes

Use clear and descriptive commit messages.

Examples:

git add .
git commit -m "feat: add AVIF converter"

git commit -m "fix: preserve PNG transparency"

git commit -m "docs: improve installation guide"

6. Push your branch

git push origin feature/your-feature-name

7. Open a Pull Request

Go to your fork on GitHub and open a Pull Request against the original repository's "main" branch.

Include:

- A clear title
- Description of the changes
- Reason for the contribution
- Related issue, if applicable
- Testing performed
- Screenshots or terminal output when useful

---

📝 Pull Request Guidelines

A good Pull Request should:

- Solve one focused problem.
- Follow the existing project architecture.
- Include tests for new behavior.
- Pass TypeScript checks.
- Pass automated tests.
- Build successfully.
- Update documentation when necessary.
- Avoid unrelated changes.

Pull Requests may be reviewed and requested to be revised before merging.

---

🐛 Reporting Bugs

Found a bug?

Please open a GitHub Issue:

https://github.com/rsavnani18/pixelkit-cli/issues

Include:

1. A clear description of the problem.
2. Steps to reproduce it.
3. Expected behavior.
4. Actual behavior.
5. Node.js and operating system versions.
6. Relevant terminal output or screenshots.

Please avoid including private information in issue reports.

---

💡 Suggesting Features

Have an idea for PixelKit?

We welcome suggestions for:

- New image converters
- Better image optimization
- Improved terminal interactions
- Batch conversion capabilities
- Performance improvements
- Developer experience enhancements

Open a GitHub Issue and describe the problem your proposed feature solves.

For larger changes, discuss the idea before investing time in implementation.

---

📜 License

By contributing to PixelKit CLI, you agree that your contributions will be licensed under the project's "MIT License" (LICENSE).

---

💙 Thank You

Every bug report, documentation improvement, test, suggestion, and Pull Request helps PixelKit become better.

Thank you for helping build an open-source image conversion toolkit for developers.

<p align="center">
  <b>Built for developers. Powered by PixelKit.</b>
</p><p align="center">
  Made with ❤️ by <a href="https://github.com/rsavnani18">Rahul Savnani</a>
</p>