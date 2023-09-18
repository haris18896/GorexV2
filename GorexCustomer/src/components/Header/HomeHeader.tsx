/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

//**themes */
import {colors} from '../../infrustructure/theme/colors';
import {HP, WP} from '../../infrustructure/theme/responsive';
import {fonts} from '../../infrustructure/theme/fonts';

//**  assets */
import {appIcons} from '../../assets';

//**Modal */
import {HomeListModal} from '../Modal/HomeListModal';
import {CityModal} from '../Modal/CityModal';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const HomeHeader = () => {
  //**React UseRef Hook */
  const listRef = useRef<any>(null);
  const cityRef = useRef<any>(null);

  const navigation = useNavigation<any>();
  const statusBarHeight = StatusBar.currentHeight ?? 0;

  //** redux */
  const {isLoginIn} = useSelector((state: any) => state.authSlice);
  const {profile_data} = useSelector((state: any) => state.settingSlice);

  return (
    <View
      style={[
        styles.mainContainer,
        {
          height: Platform.OS === 'android' ? HP(13) - statusBarHeight : HP(13),
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          listRef.current.open();
        }}>
        <Image
          source={appIcons.profile}
          resizeMode={'contain'}
          style={styles.profileStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => {
          cityRef.current.open();
        }}>
        <Image
          source={appIcons.mapPin}
          resizeMode={'contain'}
          style={styles.mapPinStyle}
        />
        <Text style={styles.textStyle}>Al-Olaya, Riyadh</Text>
        <Image
          source={appIcons.downArrow}
          resizeMode={'contain'}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
      {isLoginIn && (
        <View
          style={{
            width: WP('40'),
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity style={styles.goCoinContainer(Platform.OS)}>
            <Image
              source={appIcons.gorexClub}
              resizeMode={'contain'}
              style={styles.gorexClubStyle}
            />
            <Text style={styles.goCoinText}>
              Go Coins{'\n'}
              <Text style={styles.coinTextStyle}>12,051</Text>
            </Text>
            <Image
              source={appIcons.whiteArrow}
              resizeMode={'contain'}
              style={{
                width: 6.78,
                height: 11.3,
              }}
            />
          </TouchableOpacity>
        </View>
      )}

      <HomeListModal
        listRef={listRef}
        onPressCancel={() => {
          listRef.current.close();
        }}
        name={profile_data?.[0]?.name ? profile_data?.[0]?.name : 'Guest'}
        onPressEditProfile={() => {
          listRef.current.close();
          navigation.navigate('SettingStack', {screen: 'Account'});
        }}
      />
      <CityModal
        cityRef={cityRef}
        onPressCancel={() => {
          cityRef.current.close();
        }}
      />
    </View>
  );
};

export {HomeHeader};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    padding: WP('4'),
    backgroundColor: colors.background.light,
    // marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#0000000D',
    elevation: 5,
    flexDirection: 'row',
    zIndex: 1,
    alignItems: 'flex-end',
  },
  leftContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: colors.background.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    width: WP('40'),
    marginLeft: 10,
  },
  textStyle: {
    color: colors.text.main,
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    marginHorizontal: 6,
  },
  imageStyle: {
    width: 6.67,
    height: 10,
    tintColor: colors.text.main,
  },
  profileStyle: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    top: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPinStyle: {
    width: 9.59,
    height: 14.23,
  },
  goCoinContainer: (Platform: any) => {
    return {
      backgroundColor: colors.text.main,
      width: 124,
      paddingHorizontal: WP('1.5'),
      paddingVertical: WP('1.5'),
      borderRadius: 20,
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: Platform === 'ios' ? WP('7.5') : 28,
    };
  },
  gorexClubStyle: {
    width: 28,
    height: 28,
  },
  goCoinText: {
    fontSize: 10,
    fontFamily: fonts.soraMedium,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 0.9,
  },
  coinTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 12,
    color: '#FFAE00',
  },
});
