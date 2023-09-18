import React, {FC, useRef, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

//**theme */
import {colors} from '../../../infrustructure/theme/colors';

//**third party component */
import {
  AppButton,
  AppHeader,
  AppInput,
  CountryPickerModal,
  Layout,
  SearchInput,
} from '../../../components';

//**navigation */
import {AuthStackParamsList} from '../../../navigation/stack/AuthStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

//**assets */
import {appIcons} from '../../../assets';
import Cross from 'react-native-vector-icons/Entypo';

//**constant */
import {data} from '../../../utils/constant';

//**formik validation and library */
import {Formik} from 'formik';
import {ForgotPasswordVS, forgotFormFields} from '../../../utils/validations';

//**styles */
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {ForgotPasswordApi} from '../../../redux/Auth/authAction';
import {showToast} from '../../../utils/common';

//**Interface Props */
interface Props {}

const ForgotPassword: FC<Props> = () => {
  //** navigation */
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamsList, 'ForgotPassword'>
    >();
  const pickerRef = useRef<any>(null);

  //** states */
  const [countryCode, setCountryCode] = useState('+966');
  const [countryFlag, setCountryFlag] = useState(appIcons.arabic);

  //** redux state */
  const {forgotPasswordLoading} = useSelector((state: any) => state.authSlice);

  const dispatch = useDispatch<any>();

  //** render Item */
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

  //** Handle ForgotPassword */
  const handleForgotPassword = (values: any, resetForm: () => void) => {
    try {
      const ForgotPasswordBody = {
        phone_number: `${countryCode}${values.phoneNumber}`,
      };

      dispatch(
        ForgotPasswordApi({
          data: ForgotPasswordBody,
          callback: (response: any) => {
            showToast('Success!', response?.result?.data, 'success');
            navigation.navigate('VerifyOtp', {
              item: `${countryCode}${values.phoneNumber}`,
              changePassword: true,
            });
            resetForm();
          },
          errorCallback: (err: any) => {
            showToast('Error', err?.result?.error, 'error');
            resetForm();
          },
        }),
      );
    } catch (error) {}
  };

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'Forgot Password'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Layout barStyle={'dark-content'}>
        <Text style={styles.newPasswordStyle}>Forgot Your Password?</Text>
        <Text style={styles.enterPasswordStyle}>
          No worries, we’ll help you reset it.
        </Text>
        <Formik
          initialValues={forgotFormFields}
          onSubmit={(values, {resetForm}) => {
            handleForgotPassword(values, resetForm);
          }}
          validationSchema={ForgotPasswordVS}>
          {({
            values,
            handleChange,
            errors,
            handleSubmit,
            handleBlur,
            touched,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <AppInput
                  title={'Mobile Number'}
                  onPress={() => {
                    pickerRef.current.open();
                  }}
                  color={colors.text.main}
                  subTitle={'Mobile Number'}
                  countryCode={countryCode}
                  source={countryFlag}
                  placeholder={'Enter your mobile number'}
                  iconName={appIcons.mobile}
                  onChangeText={handleChange('phoneNumber')}
                  error={errors.phoneNumber}
                  keyboardType={'number-pad'}
                  value={values.phoneNumber}
                  onBlur={handleBlur('phoneNumber')}
                  touched={touched.phoneNumber}
                />
              </View>
              <AppButton
                title={'Reset Password'}
                onPress={() => {
                  handleSubmit();
                }}
                // loading={forgotPasswordLoading}
                // disabled={forgotPasswordLoading}
              />
            </>
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

export default ForgotPassword;
