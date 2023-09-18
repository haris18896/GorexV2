/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';

//** assets */
import {appIcons, appImage} from '../../../assets';

//** navigation */
import {useNavigation} from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
//** theme */
import {fonts} from '../../../infrustructure/theme/fonts';
import {colors} from '../../../infrustructure/theme/colors';
import {WP} from '../../../infrustructure/theme/responsive';

//** component  */
import {AppButton, AppHeader, HomeListModal} from '../../../components';

const GorexOnDemand = () => {
  //** use Ref */
  const listRef = useRef<any>(null);

  //** navigation */
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'Gorex on Demand'}
        source={appIcons.menuIcon}
        imageStyle={styles.imageStyle}
        onPress={() => {
          listRef.current.open();
        }}
      />
      <View style={styles.contentContainer}>
        <ImageBackground
          source={appImage.gorexOnDemand}
          resizeMode={'cover'}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <LinearGradient
            colors={['#4AD594', '#4AD59400']}
            start={{x: -7, y: 0.9}}
            end={{x: -7, y: 0.5}}
            angle={90}
            useAngle={true}
            style={styles.linearGradientStyle}>
            <Text style={styles.autoServiceStyle}>
              AUTO SERVICES{'\n'}ON THE GO.
            </Text>
            <Text style={styles.gorexTextStyle}>
              GOREX ON DEMAND HELPS FAST.
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>

      <Pressable
        style={styles.myRequestButton}
        onPress={() => {
          navigation.navigate('MyRequest');
        }}>
        <Image
          source={appIcons.myRequest}
          resizeMode={'contain'}
          style={styles.myRequestImage}
        />
        <Text style={styles.myRequestText}>My Requests</Text>
        <Image
          source={appIcons.guestArrow}
          resizeMode={'contain'}
          style={styles.guestArrowStyle}
        />
      </Pressable>
      <AppButton
        title={'Request Service'}
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('GoDChooseVehicles');
        }}
      />
      <KeyboardAvoidingView>
        <HomeListModal
          listRef={listRef}
          onPressCancel={() => {
            listRef.current.close();
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default GorexOnDemand;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  imageStyle: {
    width: 24,
    height: 24,
    tintColor: colors.primary.main,
  },
  linearGradientStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: WP('5'),
  },
  autoServiceStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 26,
    color: '#FFFFFF',
  },
  gorexTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: WP('10'),
  },
  myRequestButton: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    backgroundColor: colors.background.light,
    padding: WP('3'),
    borderRadius: 16,
    flexDirection: 'row',
    marginTop: WP('5'),
    alignItems: 'center',
    position: 'relative',
  },
  myRequestImage: {
    width: 44,
    height: 44,
  },
  myRequestText: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.text.main,
    marginHorizontal: WP('2'),
  },
  guestArrowStyle: {
    width: 13,
    height: 13,
    tintColor: colors.text.main,
    position: 'absolute',
    right: WP('5'),
  },
  contentContainer: {
    width: WP('100'),
    height: '25%',
  },
});
