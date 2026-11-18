
export interface PngOptions {
  compressionLevel: number;
  progressive: boolean;
  palette: boolean;
  quality?: number;
}

export const DEFAULT_PNG_OPTIONS: Readonly<PngOptions> = {
  compressionLevel: 6,
  progressive: false,
  palette: false
};
