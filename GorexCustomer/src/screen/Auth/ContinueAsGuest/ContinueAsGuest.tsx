import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';
import React from 'react';
import {colors} from '../../../infrustructure/theme/colors';
import {appIcons, appImage} from '../../../assets';
import {WP} from '../../../infrustructure/theme/responsive';
import {fonts} from '../../../infrustructure/theme/fonts';
import {AppButton} from '../../../components';
import {useNavigation} from '@react-navigation/core';

const ContinueAsGuest = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <View
        style={[
          styles.contentContainer,
          {
            height: Platform.OS === 'android' ? WP(25) : WP(36),
          },
        ]}>
        <Text
          style={styles.guestStyle}
          onPress={() => {
            navigation.goBack();
          }}>
          Continue as Guest
        </Text>
        <Image
          source={appIcons.guestArrow}
          resizeMode={'contain'}
          style={styles.guestArrowStyle}
        />
      </View>
      <View style={styles.secondContainerStyle}>
        <Image
          source={appImage.guestMode}
          resizeMode={'contain'}
          style={styles.guestModeStyle}
        />
        <Text style={styles.unlockStyle}>Log in to unlock all features.</Text>
        <Text style={styles.functionalityStyle}>
          To access the full functionality of our app,{'\n'}please log in to
          your account.
        </Text>
        <AppButton
          title={'Login'}
          style={styles.buttonContainer}
          onPress={() => {
            navigation.replace('Auth', {screen: 'Login'});
          }}
        />
        <Text style={styles.accountStyle}>Don’t have an account?</Text>
        <Pressable
          style={styles.signUpContainer}
          onPress={() => {
            navigation.navigate('Auth', {screen: 'SignUp'});
          }}>
          <Text style={styles.signUpStyle}>Sign up here</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ContinueAsGuest;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  contentContainer: {
    width: WP(100),
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  gardientContainer: {
    height: WP('90'),
  },
  guestStyle: {
    fontFamily: fonts.soraSemiBold,
    color: '#000000',
    fontSize: 14,
    marginRight: 1,
  },
  goresLogoStyle: {
    width: WP(40),
    height: WP(40),
    alignSelf: 'center',
  },
  guestArrowStyle: {
    width: WP('3'),
    height: WP('4'),
    marginRight: WP('5'),
    marginHorizontal: WP('2'),
  },
  secondContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.95,
  },
  guestModeStyle: {
    width: 190,
    height: 160,
    marginBottom: WP('10'),
  },
  unlockStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 20,
    color: colors.text.main,
    marginBottom: WP('2'),
  },
  functionalityStyle: {
    textAlign: 'center',
    fontFamily: fonts.soraMedium,
    fontSize: 16,
    color: '#B8B9C1',
  },
  buttonContainer: {
    width: WP('50'),
    marginTop: WP('12'),
  },
  accountStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'center',
    position: 'absolute',
    bottom: WP('18'),
  },
  signUpContainer: {
    position: 'absolute',
    bottom: WP('12'),
  },
  signUpStyle: {
    textDecorationLine: 'underline',
    color: colors.primary.main,
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
  },
});
