import {I18nManager} from 'react-native';
const isRTL = I18nManager.isRTL;
export const defaultConfig = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': isRTL ? 'ar' : 'en',
    },
  };
  return config;
};

// export const mediaUrl = 'https://gorex-pre-prod.softoo-dev.com/media/images/';
export const mediaUrl = 'https://api2.gorex.ai/media/images/';
// export const mediaUrl = 'https://api.gorex.ai/media/images/';
// export const mediaUrl = 'https://gorex.softoo-dev.com/media/images/';
// export const mediaUrl = 'https://gorex-qa.softoo-dev.com/media/images/';
