export type DotType = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type ColorType = 'single' | 'gradient';
export type GradientType = 'linear' | 'radial';

export interface QROptions {
  data: string;
  image: string | null;
  imageName: string | null;
  width: number;
  height: number;
  margin: number;
  dotsOptions: {
    type: DotType;
    colorType: ColorType;
    gradientType: GradientType;
    color1: string;
    color2: string;
  };
  cornersSquareOptions: {
    colorType: ColorType;
    gradientType: GradientType;
    color: string;
  };
  backgroundOptions: {
    colorType: ColorType;
    gradientType: GradientType;
    color: string;
  };
}

export const INITIAL_QR_OPTIONS: QROptions = {
  data: 'https://qr-code-styling.com',
  image: null,
  imageName: null,
  width: 300,
  height: 300,
  margin: 0,
  dotsOptions: {
    type: 'square',
    colorType: 'single',
    gradientType: 'linear',
    color1: '#000000',
    color2: '#000000',
  },
  cornersSquareOptions: {
    colorType: 'single',
    gradientType: 'linear',
    color: '#000000',
  },
  backgroundOptions: {
    colorType: 'single',
    gradientType: 'linear',
    color: '#ffffff',
  },
};
