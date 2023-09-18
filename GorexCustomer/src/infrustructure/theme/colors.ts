export interface Colors {
  [key: string]: {
    main: string;
    light: string;
    dark: string;
  };
}

export const colors: Colors = {
  primary: {
    main: '#17B26A',
    light: '#4AD5941A',
    dark: '#4AD594',
  },
  secondary: {
    main: '#21F0D7',
    light: '#DBFFFB',
    dark: '#D0FFF9',
  },
  tertiary: {
    main: '#0000001A',
    light: '',
    dark: '',
  },
  errors: {
    main: '#FF2C3C',
    light: '#FFEDEE',
    dark: '',
  },
  disabled: {
    main: '#B8B9C1',
    light: '#0000001A',
    dark: '#B8B9C133',
  },
  text: {
    main: '#000000',
    light: '#fffdf6',
    dark: '#FF2C3C',
  },
  info: {
    main: '',
    light: '#E9FAF2',
    dark: '#4AD5940F',
  },
  background: {
    main: '#B0B3BA19',
    light: '#ffffff',
    dark: '',
  },
};
