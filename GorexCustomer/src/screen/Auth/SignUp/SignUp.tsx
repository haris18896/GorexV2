/* eslint-disable react-native/no-inline-styles */
import React, {FC, useRef, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  Pressable,
} from 'react-native';

//** theme */
import {colors} from '../../../infrustructure/theme/colors';
import {WP} from '../../../infrustructure/theme/responsive';

//** third party component */
import {
  AppButton,
  AppHeader,
  AppInput,
  CountryPickerModal,
  Layout,
  SearchInput,
} from '../../../components';

//** navigation  */
import {useNavigation} from '@react-navigation/native';

//** KeyboardAwareScrollView */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//** assets */
import {appIcons} from '../../../assets';
import Cross from 'react-native-vector-icons/Entypo';

//** constant */
import {data} from '../../../utils/constant';

//** Formik validation and library */
import {Formik} from 'formik';
import {RegisterVS} from '../../../utils/validations';
import {RegisterFormFields} from '../../../utils/validations';

//** styles */
import {styles} from './styles';
//** toast */
import {showToast} from '../../../utils/common';

//** redux */
import {useDispatch, useSelector} from 'react-redux';
import {SignUpApi} from '../../../redux/Auth/authAction';

interface Props {}

const SignUp: FC<Props> = () => {
  //** navigation */
  const navigation = useNavigation<any>();

  //** useRef  */
  const pickerRef = useRef<any>(null);

  //** states */
  const [countryCode, setCountryCode] = useState('+966');
  const [countryFlag, setCountryFlag] = useState(appIcons.arabic);

  //** redux state */
  const {SignUpLoading} = useSelector((state: any) => state.authSlice);
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
  //** Submit Handle SigUp */
  const handleSignUp = (values: any, resetForm: () => void) => {
    try {
      const SignUpBody = {
        name: values.firstName,
        last_name: values.lastName,
        phone: `${countryCode}${values.phoneNumber}`,
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword,
      };

      dispatch(
        SignUpApi({
          data: SignUpBody,
          callback: (response: any) => {
            navigation.navigate('VerifyOtp', {
              item: `${countryCode}${values.phoneNumber}`,
            });
            showToast('Success', response?.result?.data, 'success');
            resetForm();
          },
          errorCallback: (err: any) => {
            showToast('Error', err?.error?.message, 'error');
            resetForm();
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
      <AppHeader
        onPress={() => {
          navigation.goBack();
        }}
        title={'Signup'}
      />
      <Layout barStyle={'dark-content'}>
        <Formik
          initialValues={RegisterFormFields}
          onSubmit={(values, {resetForm}) => {
            handleSignUp(values, resetForm);
          }}
          validationSchema={RegisterVS}>
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            handleSubmit,
          }) => (
            <KeyboardAwareScrollView
              contentContainerStyle={{
                flexGrow: 1,
                marginBottom: 20,
              }}>
              <AppInput
                subTitle={'First Name'}
                color={colors.text.main}
                placeholder={'Enter your first name'}
                iconName={appIcons.userName}
                error={errors.firstName}
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                touched={touched.firstName}
              />
              <AppInput
                subTitle={'Last Name'}
                color={colors.text.main}
                placeholder={'Enter your last name'}
                iconName={appIcons.userName}
                error={errors.lastName}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                touched={touched.lastName}
              />
              <AppInput
                subTitle={'Email Address'}
                color={colors.text.main}
                placeholder={'Enter your email address'}
                iconName={appIcons.email}
                error={errors.email}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                touched={touched.email}
              />
              <AppInput
                onPress={() => {
                  pickerRef.current.open();
                }}
                subTitle={'Mobile Number'}
                countryCode={countryCode}
                source={countryFlag}
                placeholder={'Enter your mobile number'}
                iconName={appIcons.mobile}
                error={errors.phoneNumber}
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                touched={touched.phoneNumber}
              />
              <AppInput
                subTitle={'Password'}
                color={colors.text.main}
                secureTextEntry
                placeholder={'Enter your password'}
                iconName={appIcons.password}
                error={errors.password}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                touched={touched.password}
              />
              <AppInput
                subTitle={'Confirm Password'}
                color={colors.text.main}
                secureTextEntry
                placeholder={'Confirm your password'}
                iconName={appIcons.password}
                error={errors.confirmPassword}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                touched={touched.confirmPassword}
              />
              <View
                style={{
                  marginTop: Platform.OS === 'android' ? WP('4') : WP('8'),
                }}>
                <Text style={styles.accountTextStyle}>
                  Already have an account?
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                  style={{
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.signUpTextStyle}>Sign in here</Text>
                </Pressable>
              </View>
              <AppButton
                title={'Sign Up'}
                onPress={() => {
                  handleSubmit();
                }}
                loading={SignUpLoading}
                disabled={SignUpLoading}
                style={styles.buttonContainer}
              />
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </Layout>
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
    </View>
  );
};

export default SignUp;
