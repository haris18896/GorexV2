import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';

//** assets */
import {appImage} from '../../../assets';

//** third party component */
import {AppButton} from '../../../components';

import {useNavigation} from '@react-navigation/native';
import {AuthStackParamsList} from '../../../navigation/stack/AuthStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {styles} from './styles';

//** interFace Props */
interface Props {
  route: any;
}

const Success: FC<Props> = ({route}) => {
  //** params */
  const passwordChanged = route?.params?.passwordChanged;
  const item = route?.params?.params;

  //** navigation */
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamsList, 'Success'>>();

  return (
    <View style={styles.mainContainer}>
      {item?.image && (
        <Image
          source={item?.image ? item?.image : appImage.signUpSuccess}
          style={styles.imageStyle}
          resizeMode={'contain'}
        />
      )}

      {item?.title && (
        <Text style={styles.titleTextStyle}>
          {passwordChanged
            ? 'Password updated!'
            : item?.title
            ? item.title
            : ' Welcome to Gorex.'}
        </Text>
      )}
      {item?.message && (
        <Text style={styles.messageTextStyle}>
          {passwordChanged
            ? 'Your password has been successfully\nupdated, please login again.'
            : item?.message
            ? item.message
            : 'Your account has been created successfully.'}
        </Text>
      )}
      {item?.buttonTitle && (
        <AppButton
          title={item?.buttonTitle ? item?.buttonTitle : 'Login'}
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate(item?.route ? item.route : 'Login');
          }}
        />
      )}
    </View>
  );
};

export default Success;
