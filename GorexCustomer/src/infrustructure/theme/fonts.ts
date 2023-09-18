interface Fonts {
  [key: string]: string;
}

interface FontWeights {
  [key: string]: number;
}

interface FontSizes {
  [key: string]: string;
}

export const fonts: Fonts = {
  body: 'Oswald_400Regular',
  heading: 'Lato_400Regular',
  monospace: 'Oswald_400Regular',
  soraThin: 'Sora-Thin',
  soraLight: 'Sora-Light',
  soraMedium: 'Sora-Medium',
  soraRegular: 'Sora-Regular',
  soraExtraLight: 'Sora-ExtraLight',
  soraBold: 'Sora-Bold',
  soraSemiBold: 'Sora-SemiBold',
  soraExtraBold: 'Sora-ExtraBold',
};

export const fontWeights: FontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  xBold: 800,
  xxBold: 900,
};

export const fontSizes: FontSizes = {
  label: '10px',
  caption: '12px',
  button: '14px',
  body: '16px',
  title: '20px',
  h5: '24px',
  h4: '34px',
  h3: '45px',
  h2: '56px',
  h1: '112px',
};
