/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../infrustructure/theme/colors';
import {AppHeader, HomeListModal} from '../../../components';
import {appIcons} from '../../../assets';
import {WP} from '../../../infrustructure/theme/responsive';
import {fonts} from '../../../infrustructure/theme/fonts';
import {
  Settings_Profile_List,
  country_language_list,
  delete_logOut_list,
  privacy_faqs_list,
} from '../../../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../redux/Auth/authSlice';
import {GetProfileApi} from '../../../redux/App/SettingActions/SettingActions';

const Settings = () => {
  //**React UseRef Hook */
  const listRef = useRef<any>(null);

  const navigation = useNavigation<any>();

  //** redux  */
  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state.authSlice);
  const {profile_data} = useSelector((state: any) => state.settingSlice);

  const getProfile = () => {
    try {
      const get_profile_body = {
        params: {
          model: 'res.partner',
          method: 'search_read',
          args: [[['id', '=', user?.data?.profile_id]]],

          kwargs: {
            context: {lang: 'ar_001'},
            fields: [
              'id',
              'name',
              'first_name',
              'last_name',
              'email',
              'phone',
              'address',
              'gender',
              'driving_license_number',
              'driving_license_expiry',
              'dob',
              'balance',
              'pakage',
              'profile_completed',
              'parent_partner_id',
            ],
          },
        },
      };

      dispatch(
        GetProfileApi({
          data: get_profile_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {
            console.log('errorCallback:', _err);
          },
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile();
    });
    return unsubscribe;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <AppHeader
        title={'Settings'}
        source={appIcons.menuIcon}
        imageStyle={styles.imageStyle}
        onPress={() => {
          listRef.current.open();
        }}
      />
      <View
        style={{
          maxWidth: '100%',
          backgroundColor: colors.background.light,
          borderRadius: 16,
          paddingHorizontal: WP('4'),
          paddingVertical: WP('3.5'),
          marginHorizontal: WP('5'),
          marginTop: WP('4'),
        }}>
        {Settings_Profile_List.map(item => (
          <Pressable
            onPress={() => {
              navigation.navigate(item.route);
            }}
            style={{
              maxWidth: '100%',
              alignItems: 'center',
              position: 'relative',
              flexDirection: 'row',
              marginTop: item.id === 0 ? WP('1.4') : 0,
              marginBottom: item.id === 2 ? WP('1') : WP('8'),
            }}>
            <Image
              source={item.icon}
              resizeMode={'contain'}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text
              style={{
                fontFamily: fonts.soraSemiBold,
                fontSize: 16,
                color: colors.text.main,
                marginHorizontal: WP('2.5'),
              }}>
              {item.title}
            </Text>
            <Image
              source={appIcons.arrowBlack}
              resizeMode={'contain'}
              style={{
                width: 8,
                height: 14,
                position: 'absolute',
                right: WP('0'),
              }}
            />
            {profile_data?.[0]?.firstName !== '' &&
            profile_data?.[0]?.lastName !== '' &&
            profile_data?.[0]?.email !== '' &&
            profile_data?.[0]?.dob !== '' &&
            profile_data?.[0]?.gender !== ''
              ? null
              : item.subTitle && (
                  <View
                    style={{
                      maxWidth: '100%',
                      backgroundColor: '#FF2C3C0F',
                      borderRadius: 13,
                      paddingHorizontal: WP('2'),
                      paddingVertical: WP('1'),
                      flexDirection: 'row',
                      alignItems: 'center',
                      position: 'absolute',
                      right: WP('7'),
                    }}>
                    <Image
                      source={appIcons.incomplete}
                      resizeMode={'contain'}
                      style={{
                        width: 16,
                        height: 16,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: fonts.soraBold,
                        fontSize: 12,
                        color: '#FF2C3C',
                        marginLeft: 4,
                      }}>
                      {item.subTitle}
                    </Text>
                  </View>
                )}
          </Pressable>
        ))}
      </View>
      <View
        style={{
          maxWidth: '100%',
          backgroundColor: colors.background.light,
          borderRadius: 16,
          paddingHorizontal: WP('4'),
          paddingVertical: WP('3.5'),
          marginHorizontal: WP('5'),
          marginTop: WP('3'),
        }}>
        {country_language_list.map(item => (
          <View
            style={{
              maxWidth: '100%',
              alignItems: 'center',
              position: 'relative',
              flexDirection: 'row',
              marginTop: item.id === 0 ? WP('1.4') : 0,
              marginBottom: item.id === 1 ? WP('1') : WP('8'),
            }}>
            <Image
              source={item.icon}
              resizeMode={'contain'}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text
              style={{
                fontFamily: fonts.soraSemiBold,
                fontSize: 16,
                color: colors.text.main,
                marginHorizontal: WP('2.5'),
              }}>
              {item.title}
            </Text>
            <Image
              source={appIcons.openArrows}
              resizeMode={'contain'}
              style={{
                width: 8,
                height: 14,
                position: 'absolute',
                right: WP('0'),
              }}
            />
            {item.subTitle ? (
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 14,
                  color: '#B0B3BA',
                  marginLeft: 4,
                  position: 'absolute',
                  right: WP('6.5'),
                }}>
                {item.subTitle}
              </Text>
            ) : item.image ? (
              <Image
                source={item.image}
                resizeMode={'contain'}
                style={{
                  width: 28,
                  height: 28,
                  position: 'absolute',
                  right: WP('6.5'),
                }}
              />
            ) : null}
          </View>
        ))}
      </View>

      <View
        style={{
          maxWidth: '100%',
          backgroundColor: colors.background.light,
          borderRadius: 16,
          paddingHorizontal: WP('4'),
          paddingVertical: WP('4'),
          marginHorizontal: WP('5'),
          marginTop: WP('3'),
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={appIcons.notifications}
          resizeMode={'contain'}
          style={{
            width: 20,
            height: 20,
            tintColor: colors.text.main,
          }}
        />
        <Text
          style={{
            fontFamily: fonts.soraSemiBold,
            fontSize: 16,
            color: colors.text.main,
            marginHorizontal: WP('2.5'),
          }}>
          Notifications
        </Text>
        <Image
          source={appIcons.arrowBlack}
          resizeMode={'contain'}
          style={{
            width: 8,
            height: 14,
            position: 'absolute',
            right: WP('4'),
          }}
        />
      </View>

      <View
        style={{
          maxWidth: '100%',
          backgroundColor: colors.background.light,
          borderRadius: 16,
          paddingHorizontal: WP('4'),
          paddingVertical: WP('3.5'),
          marginHorizontal: WP('5'),
          marginTop: WP('3'),
        }}>
        {delete_logOut_list.map(item => (
          <Pressable
            onPress={() => {
              dispatch(logout());
              navigation.replace('Auth');
            }}
            style={{
              maxWidth: '100%',
              alignItems: 'center',
              position: 'relative',
              flexDirection: 'row',
              marginTop: item.id === 0 ? WP('1.4') : 0,
              marginBottom: item.id === 1 ? WP('1') : WP('8'),
            }}>
            <Image
              source={item.icon}
              resizeMode={'contain'}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text
              style={{
                fontFamily: fonts.soraSemiBold,
                fontSize: 16,
                color: '#FF2C3C',
                marginHorizontal: WP('2.5'),
              }}>
              {item.title}
            </Text>
            {item.rightIcon && (
              <Image
                source={item.rightIcon}
                resizeMode={'contain'}
                style={{
                  width: 8,
                  height: 14,
                  position: 'absolute',
                  right: WP('0'),
                }}
              />
            )}
          </Pressable>
        ))}
      </View>

      <View
        style={{
          maxWidth: '100%',
          backgroundColor: colors.background.light,
          borderRadius: 16,
          paddingHorizontal: WP('4'),
          paddingVertical: WP('3.5'),
          marginHorizontal: WP('5'),
          marginTop: WP('3'),
        }}>
        {privacy_faqs_list.map(item => (
          <View
            style={{
              maxWidth: '100%',
              alignItems: 'center',
              position: 'relative',
              flexDirection: 'row',
              marginTop: item.id === 0 ? WP('1.4') : 0,
              marginBottom: item.id === 1 ? WP('1') : WP('8'),
            }}>
            <Text
              style={{
                fontFamily: fonts.soraSemiBold,
                fontSize: 16,
                color: colors.text.main,
                marginHorizontal: WP('2.5'),
              }}>
              {item.title}
            </Text>
            <Image
              source={appIcons.arrowBlack}
              resizeMode={'contain'}
              style={{
                width: 8,
                height: 14,
                position: 'absolute',
                right: WP('0'),
              }}
            />
          </View>
        ))}
      </View>

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

export default Settings;

const styles = StyleSheet.create({
  imageStyle: {
    width: 24,
    height: 24,
    tintColor: colors.primary.main,
  },
});
