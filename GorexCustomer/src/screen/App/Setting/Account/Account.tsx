/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';

//** library */
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

//**toast */
import {showToast} from '../../../../utils/common';

//** redux */
import {useDispatch, useSelector} from 'react-redux';

//** assets */
import {appIcons, appImage} from '../../../../assets';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** theme */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {colors} from '../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../infrustructure/theme/responsive';

//** third party component */
import {AppButton, AppInput, RBSheetModal} from '../../../../components';

//** api's */
import {
  GetProfileApi,
  UpdateProfileApi,
} from '../../../../redux/App/SettingActions/SettingActions';

const Account = () => {
  //** ref */
  const dobRef = useRef<any>();
  const genderRef = useRef<any>();

  //** navigation */
  const navigation = useNavigation<any>();
  const statusBarHeight = StatusBar.currentHeight ?? 0;

  //** redux state */
  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state.authSlice);
  const {profile_data, isLoading} = useSelector(
    (state: any) => state.settingSlice,
  );

  //** states */
  const [openDob, setOpenDob] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [selectGender, setSelectGender] = useState(profile_data?.[0]?.gender);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState(selectGender);
  const [inputValues, setInputValues] = useState({
    firstName: profile_data?.[0]?.first_name,
    lastName: profile_data?.[0]?.last_name,
    email: profile_data?.[0]?.email,
    phoneNumber: profile_data?.[0]?.phone.slice(4),
  });
  const [date, setDate] = useState(
    new Date(moment(profile_data?.[0]?.dob).format('MMMM D YYYY')),
  );

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

  //** useEffect */
  useEffect(() => {
    setShowDatePicker(openDob);
  }, [openDob]);

  const YearPicker = ({date, onDateChange}: any) => {
    return (
      <View style={styles.datePicker}>
        <DatePicker
          date={date}
          onDateChange={onDateChange}
          mode={'date'}
          style={{
            width: WP('90'),
          }}
        />
      </View>
    );
  };

  const handleInputChange = (name: any, value: any) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const gender_list = [
    {
      id: 0,
      title: 'Male',
      image: appImage.male,
      activeImage: appImage.activeMale,
    },
    {
      id: 1,
      title: 'Female',
      image: appImage.female,
      activeImage: appImage.activeFemale,
    },
  ];

  const handleUpdateProfile = () => {
    try {
      const update_profile_body = {
        params: {
          model: 'res.partner',
          method: 'write',
          args: [
            [profile_data?.[0]?.id],
            {
              name: `${inputValues?.firstName} ${inputValues?.lastName}`,
              first_name: inputValues?.firstName,
              last_name: inputValues?.lastName,
              email: inputValues?.email,
              phone: `${'+966'}${inputValues.phoneNumber}`,
              address: profile_data?.[0].address,
              gender: gender ? gender : profile_data?.[0]?.gender,
              dob: date
                ? moment(date, 'MMMM-DD-YYYY').format('YYYY-MM-DD')
                : moment(profile_data?.[0]?.dob, 'MMMM-DD-YYYY').format(
                    'YYYY-MM-DD',
                  ),
              driving_license_number: profile_data?.[0]?.driving_license_number,
              driving_license_expiry: profile_data?.[0]?.driving_license_expiry,
            },
          ],
          kwargs: {context: {lang: 'en_US'}},
        },
      };

      dispatch(
        UpdateProfileApi({
          data: update_profile_body,
          callback: (_response: any) => {
            setUpdateProfile(false);
            showToast(
              'Success',
              'Your profile information has been successfully updated.',
              'success',
            );
          },
          errorCallback: (err: any) => {
            console.log('errorCallback:', err);
            showToast('Error', err?.data?.message, 'error');
          },
        }),
      );
    } catch (error) {}
  };

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
        <Text style={styles.titleStyle}>Account</Text>
        {updateProfile ? (
          <Pressable
            style={[
              styles.markAsContainer,
              {
                backgroundColor: isLoading
                  ? colors.disabled.main
                  : colors.primary.main,
                justifyContent: isLoading ? 'center' : 'flex-start',
              },
            ]}
            disabled={isLoading ? true : false}
            onPress={() => {
              handleUpdateProfile();
            }}>
            {isLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <>
                <Image
                  source={appIcons.primary}
                  resizeMode={'contain'}
                  style={styles.asReadImage}
                />
                <Text style={styles.asReadTextStyle}>Save</Text>
              </>
            )}
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setUpdateProfile(true);
            }}
            style={{
              position: 'absolute',
              right: WP('5'),
              top: WP('18'),
            }}>
            <Image
              source={appImage.editProfileCircle}
              resizeMode={'contain'}
              style={{
                width: 36,
                height: 36,
              }}
            />
          </Pressable>
        )}
      </View>

      <AppInput
        subTitle={'First Name'}
        color={colors.text.main}
        placeholder={'Enter your first name'}
        iconName={appIcons.userName}
        value={inputValues.firstName}
        onChangeText={(value: string) => handleInputChange('firstName', value)}
        style={{
          marginTop: -15,
          opacity: updateProfile ? 1 : 0.45,
        }}
        editable={updateProfile ? true : false}
        onBlur={() => {}}
      />
      <AppInput
        subTitle={'Last Name'}
        color={colors.text.main}
        placeholder={'Enter your last name'}
        iconName={appIcons.userName}
        value={inputValues.lastName}
        onChangeText={(value: string) => handleInputChange('lastName', value)}
        style={{
          opacity: updateProfile ? 1 : 0.45,
        }}
        editable={updateProfile ? true : false}
        onBlur={() => {}}
      />
      <AppInput
        subTitle={'Email Address'}
        color={colors.text.main}
        placeholder={'Enter your email address'}
        iconName={appIcons.email}
        value={inputValues.email}
        onChangeText={(value: string) => handleInputChange('email', value)}
        style={{
          opacity: updateProfile ? 1 : 0.45,
        }}
        editable={updateProfile ? true : false}
        onBlur={() => {}}
      />
      <AppInput
        subTitle={'Mobile Number'}
        countryCode={'+966'}
        source={appIcons.arabic}
        placeholder={'Enter your mobile number'}
        iconName={appIcons.mobile}
        value={inputValues.phoneNumber}
        onChangeText={(value: string) =>
          handleInputChange('phoneNumber', value)
        }
        onBlur={() => {}}
        style={{
          opacity: updateProfile ? 1 : 0.45,
        }}
        editable={updateProfile ? true : false}
      />
      <Pressable
        style={[
          styles.dobContainer,
          {
            opacity: updateProfile ? 1 : 0.45,
          },
        ]}
        disabled={updateProfile ? false : true}
        onPress={() => {
          setOpenDob(true);
        }}>
        <Image
          source={appIcons.date}
          resizeMode={'contain'}
          style={styles.dateImageStyle}
        />
        <View style={styles.dobTextContainer}>
          <Text style={styles.dobTextStyle}>Date of Birth</Text>
          <Text style={styles.dateTextStyle}>
            {profile_data?.[0]?.dob
              ? moment(date).format('DD/MMMM/YYYY')
              : 'DD/MM/YYYY'}
          </Text>
        </View>
        <Image
          source={appIcons.openArrows}
          resizeMode={'contain'}
          style={{
            width: WP('3.5'),
            height: WP('3.5'),
            position: 'absolute',
            right: WP('5'),
          }}
        />
      </Pressable>
      <Pressable
        style={[
          styles.dobContainer,
          {
            opacity: updateProfile ? 1 : 0.45,
          },
        ]}
        disabled={updateProfile ? false : true}
        onPress={() => {
          setOpenGender(true);
        }}>
        <Image
          source={appIcons.date}
          resizeMode={'contain'}
          style={styles.dateImageStyle}
        />
        <View style={styles.genderTextContainer}>
          <Text style={styles.genderTextStyle}>Gender</Text>
          <Text style={styles.genderInputStyle}>
            {gender
              ? gender.charAt(0).toUpperCase() + gender?.slice(1)
              : 'Please select'}
          </Text>
        </View>
        <Image
          source={appIcons.openArrows}
          resizeMode={'contain'}
          style={styles.openArrowStyle}
        />
      </Pressable>

      <KeyboardAvoidingView>
        <RBSheetModal
          refRBSheet={dobRef}
          open={openDob}
          height={HP('45')}
          onClose={() => {
            setOpenDob(false);
          }}
          title={'Select Date of Birth'}
          draggable={true}
          backgroundColor={colors.background.light}>
          <View
            style={{
              width: WP('100'),
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
            {showDatePicker && (
              <YearPicker date={date} onDateChange={setDate} />
            )}
            <View
              style={{
                marginTop: WP('3'),
                position: 'absolute',
                top: WP('45'),
              }}>
              <AppButton
                title={'Select'}
                onPress={() => {
                  setOpenDob(false);
                  setDate(date);
                }}
              />
            </View>
          </View>
        </RBSheetModal>

        <RBSheetModal
          refRBSheet={genderRef}
          open={openGender}
          height={HP('43')}
          onClose={() => {
            setOpenGender(false);
          }}
          title={'Select your Gender'}
          draggable={true}
          backgroundColor={colors.background.light}>
          <View
            style={{
              marginVertical: WP('8'),
            }}>
            {gender_list.map((item: any, index: any) => (
              <Pressable
                onPress={() => {
                  setSelectGender((prevExpanded: any) =>
                    prevExpanded === item ? null : item?.title,
                  );
                }}
                key={index}
                style={{
                  maxWidth: '100%',
                  alignItems: 'center',
                  position: 'relative',
                  marginHorizontal: WP('5'),
                  backgroundColor: '#B0B3BA19',
                  borderRadius: 16,
                  padding: WP('3'),
                  flexDirection: 'row',
                  marginBottom: WP('4'),
                  borderWidth:
                    selectGender?.charAt(0)?.toUpperCase() +
                      selectGender?.slice(1) ===
                    item?.title
                      ? 1.5
                      : 0,
                  borderColor:
                    selectGender?.charAt(0)?.toUpperCase() +
                      selectGender?.slice(1) ===
                    item?.title
                      ? colors.primary.main
                      : undefined,
                }}>
                <Image
                  source={
                    selectGender?.charAt(0)?.toUpperCase() +
                      selectGender?.slice(1) ===
                    item?.title
                      ? item.activeImage
                      : item.image
                  }
                  resizeMode={'contain'}
                  style={{
                    height: 38,
                    width: 38,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.soraMedium,
                    color: colors.text.main,
                    marginHorizontal: WP('3'),
                  }}>
                  {item.title}
                </Text>
                <Image
                  source={
                    selectGender?.charAt(0)?.toUpperCase() +
                      selectGender?.slice(1) ===
                    item.title
                      ? appIcons.checked
                      : appIcons.unChecked
                  }
                  resizeMode={'contain'}
                  style={{
                    width: 24,
                    height: 24,
                    position: 'absolute',
                    right: WP('5'),
                  }}
                />
              </Pressable>
            ))}
            <AppButton
              title={'Confirm'}
              style={{
                marginTop: 15,
              }}
              onPress={() => {
                setOpenGender(false);
                setGender(selectGender);
              }}
            />
          </View>
        </RBSheetModal>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Account;

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
    top: WP('18'),
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 18,
    paddingVertical: WP('2.2'),
    width: WP('22'),
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
  inputContainer: {
    marginTop: -12,
  },
  dobContainer: {
    maxWidth: '100%',
    backgroundColor: colors.background.light,
    padding: WP('3.4'),
    borderRadius: 16,
    flexDirection: 'row',
    marginHorizontal: WP('5'),
    marginTop: WP('3'),
    alignItems: 'center',
    marginBottom: WP('3'),
  },
  datePicker: {
    width: WP('90'),
    marginTop: WP('5'),
    position: 'absolute',
    top: WP('5'),
    bottom: WP('10'),
    alignItems: 'center',
  },
  yearText: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  dateImageStyle: {
    width: 28,
    height: 28,
  },
  dobTextContainer: {
    marginHorizontal: WP('2'),
  },
  dobTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 12,
    color: '#B0B3BA',
    marginBottom: 5,
  },
  dateTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.text.main,
  },
  genderTextContainer: {
    marginHorizontal: WP('2'),
  },
  genderTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 12,
    color: '#B0B3BA',
    marginBottom: 5,
  },
  genderInputStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.text.main,
  },
  openArrowStyle: {
    width: WP('3.5'),
    height: WP('3.5'),
    position: 'absolute',
    right: WP('5'),
  },
});
