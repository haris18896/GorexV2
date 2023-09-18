/* eslint-disable react-native/no-inline-styles */
import React, {FC, useRef, useState} from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Pressable,
} from 'react-native';
//** KeyboardAwareScrollView */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** third party component */
import {
  AppButton,
  AppInput,
  CountryPickerModal,
  Layout,
  LinearGradientComp,
  SearchInput,
} from '../../../components';

//** theme */
import {colors} from '../../../infrustructure/theme/colors';
import {WP} from '../../../infrustructure/theme/responsive';

//** assets */
import Cross from 'react-native-vector-icons/Entypo';
import {appIcons, appImage} from '../../../assets';

//**constant */
import {data} from '../../../utils/constant';

//**formik validation and library */
import {Formik} from 'formik';
import {LoginVS, loginFormFields} from '../../../utils/validations';

//** styles */
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {continueAsGuestApi, loginApi} from '../../../redux/Auth/authAction';
import {showToast} from '../../../utils/common';

interface Props {}

const Login: FC<Props> = () => {
  //** useRef hook */
  const pickerRef = useRef<any>(null);

  //** state */
  const [countryCode, setCountryCode] = useState('+966');
  const [countryFlag, setCountryFlag] = useState(appIcons.arabic);

  //** navigation */
  const navigation = useNavigation<any>();

  //** redux state */
  const {loginInProgress} = useSelector((state: any) => state.authSlice);
  const dispatch = useDispatch<any>();

  //** render item */
  const renderItem = (item: any) => (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() => {
        let code = item?.number;
        let image = item?.image;
        setCountryCode(code);
        setCountryFlag(image);
        pickerRef?.current.close();
      }}>
      <Image
        source={item?.image}
        resizeMode={'contain'}
        style={styles.flagImage}
      />
      <Text style={styles.titleStyle}>{item?.title}</Text>
      <Text style={styles.numberStyle}>{item?.number}</Text>
    </TouchableOpacity>
  );

  //** onSubmit Login */
  const onSubmitLogin = (
    values: {phoneNumber: string; password: string},
    resetForm: () => void,
  ) => {
    try {
      const loginBody = {
        username_or_phone: `${countryCode}${values.phoneNumber}`,
        password: values.password,
        userAgent: Platform.OS === 'ios' ? 'gorex-ios' : 'gorex-android',
      };

      dispatch(
        loginApi({
          data: loginBody,
          callback: (_response: any) => {
            navigation.navigate('App', {screen: 'BottomTab'});
            resetForm();
          },
          errorCallback: (err: any) => {
            if (err.error) {
              showToast('Error', err.error, 'error');
            }
          },
        }),
      );
    } catch (error) {}
  };

  //** onContinueAsGuest */
  const onContinueAsGuest = () => {
    try {
      const loginBody = {
        username_or_phone: 'guest@gorex.ai',
        password: 'guest@gorex.ai',
        userAgent: Platform.OS === 'ios' ? 'gorex-ios' : 'gorex-android',
      };

      dispatch(
        continueAsGuestApi({
          data: loginBody,
          callback: (_response: any) => {
            navigation.navigate('App', {screen: 'BottomTab'});
          },
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  return (
    <Layout barStyle={'light-content'}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <LinearGradientComp style={styles.gardientContainer}>
          <View
            style={[
              styles.mainContainer,
              {
                height: Platform.OS === 'android' ? WP(25) : WP(36),
              },
            ]}>
            <Text
              style={styles.guestStyle}
              onPress={() => {
                onContinueAsGuest();
              }}>
              Continue as Guest
            </Text>
            <Image
              source={appIcons.guestArrow}
              resizeMode={'contain'}
              style={{
                width: WP('3'),
                height: WP('4'),
                marginRight: WP('5'),
                marginHorizontal: WP('2'),
              }}
            />
          </View>
          <Image
            source={appImage.gorexLogo}
            style={[
              styles.goresLogoStyle,
              {marginTop: Platform.OS === 'ios' ? -35 : 0},
            ]}
            resizeMode={'contain'}
          />
        </LinearGradientComp>
        <Formik
          initialValues={loginFormFields}
          onSubmit={(values, {resetForm}) => {
            onSubmitLogin(values, resetForm);
          }}
          validationSchema={LoginVS}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldTouched,
          }) => (
            <>
              <AppInput
                onPress={() => {
                  pickerRef.current.open();
                }}
                source={countryFlag}
                blurOnSubmit={false}
                title={'Mobile Number'}
                countryCode={countryCode}
                subTitle={'Mobile Number'}
                iconName={appIcons.mobile}
                error={errors.phoneNumber}
                value={values.phoneNumber}
                keyboardType={'number-pad'}
                touched={touched.phoneNumber}
                placeholder={'Enter your mobile number'}
                onChangeText={handleChange('phoneNumber')}
                onBlur={() => setFieldTouched('phoneNumber')}
                style={{
                  marginTop: Platform.OS === 'ios' ? WP('-15') : WP('-15'),
                }}
              />

              <AppInput
                secureTextEntry
                title={'Password'}
                blurOnSubmit={false}
                subTitle={'Password'}
                value={values.password}
                error={errors.password}
                color={colors.text.main}
                touched={touched.password}
                iconName={appIcons.password}
                style={styles.inputContainer}
                placeholder={'Enter your password'}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              <Pressable
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}>
                <Text style={styles.forgetStyle}>
                  Forgot Password? Reset here.
                </Text>
              </Pressable>
              <AppButton
                title={'Sign in'}
                onPress={() => {
                  handleSubmit();
                }}
                loading={loginInProgress}
                disabled={loginInProgress}
              />
            </>
          )}
        </Formik>
        <View
          style={[
            styles.footerContainer,
            {
              marginTop: Platform.OS === 'android' ? 80 : 50,
              marginBottom: Platform.OS === 'android' ? 30 : 20,
            },
          ]}>
          <Text style={styles.accountTextStyle}>Don’t have an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={{
              alignSelf: 'center',
            }}>
            <Text style={styles.signUpTextStyle}>Sign up here</Text>
          </Pressable>
        </View>
        <KeyboardAvoidingView>
          <CountryPickerModal
            pickerRef={pickerRef}
            container={styles.modalContainer}>
            <View style={styles.modalContentContainer}>
              <View style={styles.spacer} />
              <TouchableOpacity
                onPress={() => {
                  pickerRef.current.close();
                }}
                style={styles.cancelIconContainer}>
                <Cross name={'cross'} size={25} color={'black'} />
              </TouchableOpacity>
              <Text style={styles.selectCountryStyle}>Select your Country</Text>
              <SearchInput placeholder={'Search for your country'} />
              <FlatList data={data} renderItem={({item}) => renderItem(item)} />
            </View>
          </CountryPickerModal>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export default Login;
