🚀 PixelKit CLI

A modular command-line image conversion toolkit built for developers.

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=20&pause=1000&color=38BDF8&center=true&vCenter=true&width=650&lines=Convert+images+with+simple+commands.;PNG+to+WebP+%7C+WebP+to+PNG;Fast+image+conversion+from+your+terminal.;Built+with+TypeScript+%26+Sharp." alt="PixelKit CLI animated typing" />
</p><p align="center">
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 20+" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License" />
</p><p align="center">
  <b>One toolkit. Multiple image converters. Zero complicated workflows.</b>
</p>---

✨ Overview

PixelKit CLI is an open-source command-line image conversion toolkit designed to simplify image format conversion directly from your terminal.

Instead of opening image editors or manually converting files one by one, PixelKit lets you convert images using simple commands.

Navigate to your assets directory, run a converter, select your images, and let PixelKit handle the conversion.

Why PixelKit?

- ⚡ Simple terminal-based image conversion.
- 🎯 Interactive image selection using arrow keys and Space.
- 📁 Convert images from any specified directory.
- 🖼️ Convert individual image files directly.
- 🔄 Preserve original files.
- 🌈 Preserve transparency when converting transparent PNG images to WebP.
- 🧩 Modular architecture designed for future converters.
- 💻 Developer-friendly command-line interface.

🛠️ Available Converters

Command| Conversion| Availability
"webpkit"| Supported image formats → WebP| Available
"pngkit"| Supported image formats → PNG| Available

---

📦 Installation

You can install PixelKit CLI globally using npm or run it through npx without a permanent global installation.

Option 1: Install globally with npm

npm install -g pixelkit-cli

After installation, use the commands from any directory:

pixelkit-cli --help
webpkit
pngkit

Option 2: Use with npx

Don't want to install PixelKit globally?

You can use "npx" to execute the package directly.

Display help:

npx --yes pixelkit-cli --help

List available converters:

npx --yes pixelkit-cli --list

Display version:

npx --yes pixelkit-cli --version

Display project information:

npx --yes pixelkit-cli --info

Run the WebP converter:

npx --yes --package=pixelkit-cli webpkit

Run the PNG converter:

npx --yes --package=pixelkit-cli pngkit

Use npx with a specific path:

npx --yes --package=pixelkit-cli webpkit ./my-app/public

npx --yes --package=pixelkit-cli pngkit ./my-app/public

«npx downloads and executes the package when needed. Global installation is recommended if you use PixelKit regularly.»

---

🚀 Quick Start

1. Convert images in the current directory

Navigate to your assets directory:

cd my-app/public

Run:

webpkit

PixelKit scans the current directory and displays supported images in an interactive selector.

2. Convert images from another directory

You don't need to navigate into the target directory.

webpkit ./my-app/public

3. Convert a single image

webpkit ./my-app/public/logo.png

A single image path starts direct conversion without opening the interactive selector.

4. Convert WebP images to PNG

pngkit

Or specify a directory:

pngkit ./my-app/public

Convert one image:

pngkit ./my-app/public/logo.webp

---

🎮 Interactive Image Selection

PixelKit includes an interactive terminal image selector.

Key| Action
↑ / ↓| Navigate through images
Space| Select or deselect an image
Enter| Confirm selection and start conversion

Select exactly the images you want to convert.

⚙️ Global CLI Options

PixelKit provides global commands for accessing help and project information.

pixelkit-cli --help

Command| Description
"pixelkit-cli --help"| Display CLI usage instructions
"pixelkit-cli --list"| List available converters
"pixelkit-cli --version"| Display installed version
"pixelkit-cli --info"| Display project information

Short options:

pixelkit-cli -h
pixelkit-cli -l
pixelkit-cli -v

---

🖼️ Image Conversion Features

WebP Conversion

Convert supported image formats into optimized WebP images.

webpkit ./assets

Example:

logo.png   → logo.webp
banner.jpg → banner.webp

PNG Conversion

Convert supported image formats into PNG images.

pngkit ./assets

Example:

logo.webp → logo.png
photo.jpg → photo.png

Transparency Preservation

PixelKit preserves transparency when converting transparent PNG images into WebP.

This allows transparent logos, icons and other graphics to retain their alpha channel.

Original File Protection

PixelKit generates converted images alongside the original files.

assets/
├── logo.png
└── logo.webp

Original files are not intentionally replaced during conversion.

Existing output files are protected against accidental overwriting.

Directory Scanning

PixelKit scans the specified directory without recursively scanning its subdirectories.

Already-existing files in the target output format are excluded from the conversion list.

---

🧰 Technology Stack

PixelKit is built using a modern Node.js and TypeScript toolchain.

Technology| Purpose
Node.js| Runtime environment
TypeScript| Type-safe application development
Sharp| Image processing and conversion
@inquirer/prompts| Interactive terminal selection
Chalk| Terminal colors and styling
pnpm| Package management
Node.js Test Runner| Automated testing
tsx| TypeScript development execution
Prettier| Code formatting

🧪 Testing

PixelKit uses the Node.js test runner with TypeScript execution through "tsx".

Current automated test coverage includes:

- CLI command handling
- PNG to WebP conversion
- WebP to PNG conversion
- Unsupported image validation
- PNG transparency preservation
- Existing output protection
- Invalid image handling
- Directory scanning
- Path resolution
- Image filtering

Run tests:

pnpm test

Run TypeScript checks:

pnpm typecheck

Build the project:

pnpm build

Run complete verification:

pnpm check

🗺️ Roadmap

PixelKit is designed to grow into a modular image conversion toolkit.

- [x] TypeScript CLI foundation
- [x] Global CLI command registration
- [x] Interactive image selector
- [x] WebP converter
- [x] PNG converter
- [x] Direct file conversion
- [x] Directory-based conversion
- [x] Transparency preservation for PNG to WebP
- [x] Existing output protection
- [x] Automated tests
- [x] Modular converter registry
- [ ] AVIF converter
- [ ] JPEG converter
- [ ] GIF converter
- [ ] Batch conversion improvements
- [ ] Advanced conversion options
- [ ] Conversion quality configuration

🤝 Contributing

Contributions, bug reports and feature suggestions are welcome!

If you want to contribute to PixelKit, please read "CONTRIBUTING.md" (CONTRIBUTING.md) before submitting changes.

📄 License

PixelKit CLI is open-source software licensed under the "MIT License" (LICENSE).

Copyright © 2026 Rahul Savnani.

👨‍💻 Author

Rahul Savnani

Independent developer building practical developer tools with modern technologies.

- GitHub: "@rsavnani18" (https://github.com/rsavnani18)
- Website: "rahulsavnani.vercel.app" (https://rahulsavnani.vercel.app)

⭐ Support the Project

If PixelKit CLI is useful to you:

- Give the repository a ⭐ star.
- Report bugs and suggest improvements.
- Share it with other developers.
- Contribute new converters and features.

---

<p align="center">
  <b>Built for developers. Powered by PixelKit.</b>
</p><p align="center">
  <img src="https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="Made with TypeScript" />
  <img src="https://img.shields.io/badge/Open%20Source-MIT-green?style=flat-square" alt="Open Source MIT" />
</p>