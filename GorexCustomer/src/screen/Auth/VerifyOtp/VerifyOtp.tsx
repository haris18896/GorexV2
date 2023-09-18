/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';

//** third party component */
import {AppHeader, VerificationToast} from '../../../components';

//** navigation */
import {useNavigation} from '@react-navigation/native';
import {AuthStackParamsList} from '../../../navigation/stack/AuthStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

//** confirmation code field */
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

//** assets */
import {appIcons, appImage} from '../../../assets';

//** theme */
import {colors} from '../../../infrustructure/theme/colors';

//** styles */
import styles from './styles';

//** redux */
import {useDispatch, useSelector} from 'react-redux';
import {VerifyOtpApi} from '../../../redux/Auth/authAction';

//** interface props */
interface Props {
  route?: any;
}

const VerifyOtp: FC<Props> = ({route}) => {
  //** params */
  const item = route?.params?.item;
  const changePassword = route?.params?.changePassword;

  //** useRef */
  const ref = useRef();

  //** states */
  const [value, setValue] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [status, setStatus] = useState();

  //** redux state */
  const {verifyOtpLoading} = useSelector((state: any) => state.authSlice);
  const dispatch = useDispatch<any>();

  //** navigation */
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamsList, 'VerifyOtp'>
    >();

  //** verify Otp handle */
  const handleVerifyOtp = () => {
    try {
      const verifyOtpBody = {
        phone: item,
        otp_code: value,
      };

      dispatch(
        VerifyOtpApi({
          data: verifyOtpBody,
          callback: (response: any) => {
            setStatus(response?.result?.data);
            if (changePassword === true) {
              navigation.navigate('ChangePassword', {item: item});
            } else {
              navigation.navigate('Success', {
                params: {
                  title: 'Welcome to Gorex.',
                  message: 'Your account has been created successfully.',
                  image: appImage.signUpSuccess,
                  buttonTitle: 'Login',
                  route: 'Login',
                },
              });
            }
            setIsVerified(true);
          },
          errorCallback: (err: any) => {
            setStatus(err?.result?.error);
            setIsVerified(true);
          },
        }),
      );
    } catch (error) {}
  };

  // //** useLayoutEffect */
  useLayoutEffect(() => {
    if (codeFieldProps && value.length === 4) {
      handleVerifyOtp();
    }
  }, [navigation, value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerified(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isVerified]);

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'OTP Verification'}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.inputContainer}>
        <Image
          source={appIcons.verifyCode}
          resizeMode={'contain'}
          style={styles.verifyPhoneStyle}
        />
        <Text style={styles.verificationTextStyle}>OTP Verification</Text>
        <Text style={styles.enterOtpStyle}>
          Enter OTP code sent to{'\n'}
          <Text style={styles.phoneNumberTextStyle}>{item}</Text>
        </Text>

        <CodeField
          ref={ref}
          {...codeFieldProps}
          value={value}
          onChangeText={(val: any) => {
            setValue(val);
          }}
          cellCount={4}
          rootStyle={styles.otpInputBox}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          caretHidden={true}
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[
                styles.cell,
                {
                  backgroundColor:
                    status === 'Invalid OTP!' && value.length === 4
                      ? '#FFEDEE'
                      : status === undefined
                      ? colors.background.main
                      : '#E9FAF2',
                },
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text
                style={[
                  styles.txtStyle,
                  {
                    color:
                      status === 'Invalid OTP!' && value.length === 4
                        ? colors.errors.main
                        : status === undefined
                        ? '#000000'
                        : colors.primary.main,
                  },
                ]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <Text style={styles.receiveCodeStyle}>
          Didn’t receive OTP code?{'\n'}
          <Text
            style={styles.resendCodeTextStyle}
            onPress={() => {
              handleVerifyOtp();
            }}>
            RESEND CODE
          </Text>
        </Text>
      </View>
      {isVerified && (
        <VerificationToast
          backgroundColor={
            status !== 'Invalid OTP!' ? colors.primary.main : colors.errors.main
          }
          title={
            status !== 'Invalid OTP!' ? 'OTP Verified!' : 'Invalid OTP code'
          }
          source={
            status !== 'Invalid OTP!' ? appIcons.verified : appIcons.invalid
          }
        />
      )}
      {verifyOtpLoading && (
        <ActivityIndicator size={'small'} color={colors.primary.main} />
      )}
    </View>
  );
};

export default VerifyOtp;
