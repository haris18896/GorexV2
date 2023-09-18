/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  StatusBar,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//** toast */
import {showToast} from '../../../../utils/common';

//** redux state */
import {useDispatch, useSelector} from 'react-redux';

//**assets */
import {appIcons, appImage} from '../../../../assets';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** themes  */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {colors} from '../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../infrustructure/theme/responsive';

//** api's */
import {GetAddressApi} from '../../../../redux/App/SettingActions/SettingActions';

const Addresses = () => {
  const navigation = useNavigation<any>();

  const statusBarHeight = StatusBar.currentHeight ?? 0;

  //** redux  */
  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state.authSlice);
  const {isLoading, address} = useSelector((state: any) => state.settingSlice);

  //** states */
  const [onSelectAddress, setOnSelectAddress] = useState(false);

  const getAddress = () => {
    try {
      const get_address_body = {
        params: {
          model: 'customer.address',
          method: 'search_read',
          args: [[['partner_id', '=', user?.data?.profile_id]]],

          kwargs: {
            context: {lang: 'ar_001'},
            fields: ['id', 'name', 'address', 'latitude', 'longitude'],
          },
        },
      };

      dispatch(
        GetAddressApi({
          data: get_address_body,
          callback: (_response: any) => {},
          errorCallback: (err: any) => {
            showToast('Error', err?.data?.message, 'error');
          },
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAddress();
    });
    return unsubscribe;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <View
        style={[
          styles.headerMainContainer,
          {
            height:
              Platform.OS === 'android' ? HP(13) - statusBarHeight : WP('30'),
          },
        ]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={appIcons.backArrow}
            resizeMode={'contain'}
            style={styles.imageStyle}
          />
        </Pressable>
        <Text style={styles.titleStyle}>Addresses</Text>
        <Pressable
          style={styles.markAsContainer}
          onPress={() => {
            navigation.navigate('SubscriptionStack', {screen: 'AddAddress'});
          }}>
          <Image
            source={appIcons.add}
            resizeMode={'contain'}
            style={styles.asReadImage}
          />
          <Text style={styles.asReadTextStyle}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={address}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getAddress} />
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              setOnSelectAddress(!onSelectAddress);
            }}
            style={{
              maxWidth: '100%',
              marginHorizontal: WP('5'),
              backgroundColor: colors.background.light,
              paddingHorizontal: WP('4'),
              paddingVertical: WP('4'),
              borderRadius: 13,
              marginTop: WP('3'),
              flexDirection: 'row',
              borderWidth: onSelectAddress ? 1 : 0,
              borderColor: onSelectAddress
                ? colors.primary.main
                : colors.background.light,
            }}>
            <Image
              source={
                item?.name === 'Work' ? appIcons.activeWork : appIcons.address
              }
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode={'contain'}
            />
            <View
              style={{
                marginLeft: WP('4'),
                width: WP('58'),
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 14,
                  color: '#B0B3BA',
                  textAlign: 'left',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 16,
                  color: colors.text.main,
                  marginTop: WP('0.4'),
                  textAlign: 'left',
                }}>
                {item?.address}
              </Text>
              {/* <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 12,
                  color: '#B0B3BA',
                  marginTop: WP('0.4'),
                  textAlign: 'left',
                }}>
                Al Imam Saud Ibn Abdul Aziz Branch Rd, Al{'\n'}
                Mohammadiyyah, Riyadh 12363, Saudi{'\n'}Arabia.
              </Text> */}
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate('SubscriptionStack', {
                  screen: 'AddAddress',
                  params: {
                    item: item,
                    editAddress: true,
                  },
                });
              }}>
              <Image
                source={appIcons.editBlack}
                style={{
                  width: 32,
                  height: 32,
                }}
                resizeMode={'contain'}
              />
            </Pressable>
          </Pressable>
        )}
        ListEmptyComponent={
          isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: WP('80'),
              }}>
              <ActivityIndicator size={'small'} color={colors.primary.main} />
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 18,
                  color: colors.text.main,
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                Please wait a moment
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginVertical: WP('65'),
              }}>
              <Image
                source={appImage.noData}
                resizeMode={'contain'}
                style={{
                  width: 192,
                  height: 160,
                  marginBottom: WP('4'),
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.soraBold,
                  fontSize: 20,
                  color: colors.text.main,
                  textAlign: 'center',
                }}>
                No data available.
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 16,
                  color: '#B8B9C1',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                There’s nothing to display here yet.
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  headerMainContainer: {
    width: WP('100'),
    backgroundColor: colors.background.light,
    borderBottomWidth: 2,
    borderBottomColor: '#0000000D',
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: WP('14'),
    marginBottom: WP('5'),
  },
  markAsContainer: {
    position: 'absolute',
    right: WP('5'),
    top: WP('17'),
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 18,
    paddingVertical: WP('2.2'),
  },
  asReadImage: {
    width: 15,
    height: 15,
    marginRight: WP('1'),
    marginLeft: WP('3'),
  },
  asReadTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.background.light,
    marginRight: WP('7'),
    marginLeft: WP('1.5'),
  },

  imageStyle: {
    width: 12,
    height: 20,
    marginLeft: Platform.OS === 'ios' ? WP('5') : 0,
  },
  titleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    marginLeft: 16,
  },
});
