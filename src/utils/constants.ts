
export const APP_NAME = "PixelKit";

export const PACKAGE_NAME = "pixelkit-cli";

export const SUPPORTED_FORMATS = [
  "webp",
  "png"
] as const;

export const DEFAULT_WEBP_QUALITY = 80;

export const DEFAULT_WEBP_EFFORT = 4;

export const DEFAULT_PNG_COMPRESSION = 6;

export const MAX_WEBP_QUALITY = 100;

export const MIN_WEBP_QUALITY = 1;

export const MAX_PNG_COMPRESSION = 9;

export const MIN_PNG_COMPRESSION = 0;

export const DEFAULT_PAGE_SIZE = 12;

export const SUPPORTED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".avif",
  ".tif",
  ".tiff",
  ".bmp"
] as const;

export const CLI_OPTIONS = {
  HELP: "--help",
  LIST: "--list",
  VERSION: "--version",
  INFO: "--info"
} as const;
