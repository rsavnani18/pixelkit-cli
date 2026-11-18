
export interface WebPOptions {
  quality: number;
  effort: number;
  lossless: boolean;
  nearLossless: boolean;
  smartSubsample: boolean;
}

export const DEFAULT_WEBP_OPTIONS: Readonly<WebPOptions> = {
  quality: 80,
  effort: 4,
  lossless: false,
  nearLossless: false,
  smartSubsample: true
};
