import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Platform} from 'react-native';
import {WP} from '../infrustructure/theme/responsive';

export const setData = async (name: any, data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(`${name}`, jsonValue);
  } catch (e) {
    // error reading value
  }
};
export const removeData = async (name: any) => {
  try {
    await AsyncStorage.removeItem(`${name}`);
  } catch (e) {
    // error reading value
  }
};

export const getData = async (name: any) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`${name}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const clearLocalState = async () => {
  try {
    AsyncStorage.clear();
  } catch (error) {}
};

export const showToast = (title = 'title', message: any, type = 'success') => {
  Toast.show({
    type: type,
    text1: title,
    text2: message?.length ? message : 'message',
    topOffset: Platform.OS === 'ios' ? WP('15') : WP('15'),
  });
};
