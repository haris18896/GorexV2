import {Dimensions, PixelRatio, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const scrWidth = Dimensions.get('window').width;
const scrHeight = Dimensions.get('window').height;
const widthPercentageToDP = (widthPercent: any) => {
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((scrWidth * elemWidth) / 100);
};
const heightPercentageToDP = (heightPercent: any) => {
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((scrHeight * elemHeight) / 100);
};

const platformOrientedCode = (androidVal: any, iOSVal: any) =>
  Platform.select({android: androidVal, ios: iOSVal});

export {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
  RFValue as RF,
  scrWidth,
  scrHeight,
  platformOrientedCode,
};
