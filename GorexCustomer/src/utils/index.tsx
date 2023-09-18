import {Platform} from 'react-native';

// const MAIN_URL = 'https://'; // Live URL
// const MAIN_URL = 'http://localhost:5001'; // Development URL


export const isAndroid: boolean = Platform.OS === 'android';
export const isIOS: boolean = Platform.OS === 'ios';
// export const isDevelopment = process.env.NODE_ENV === 'development';
export const isMock: boolean = true;
// export const host = !isDevelopment || isAndroid ? liveHost : localHost;
