import React, {FC} from 'react';
import {View, Text} from 'react-native';

//** interface theme */
import {colors} from '../../../infrustructure/theme/colors';

//** third party component */
import {AppButton, AppHeader, AppInput} from '../../../components';

//** navigation */
import {AuthStackParamsList} from '../../../navigation/stack/AuthStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

//** assets */
import {appIcons, appImage} from '../../../assets';

//** styles */
import {styles} from './styles';

//** formik and validations */
import {Formik} from 'formik';
import {
  ChangePasswordVS,
  changePasswordFormFields,
} from '../../../utils/validations';
import {useDispatch, useSelector} from 'react-redux';
import {ChangePasswordApi} from '../../../redux/Auth/authAction';
import {showToast} from '../../../utils/common';

//** interface Props */
interface Props {}

const ChangePassword: FC<Props> = ({route}) => {
  //** navigation */
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamsList, 'ChangePassword'>
    >();
  const item = route.params?.item;

  //** redux state */
  const {changePasswordLoading} = useSelector((state: any) => state.authSlice);
  const dispatch = useDispatch<any>();

  //** onSubmit Change Password  */
  const handleChangePassword = (values: any) => {
    try {
      const changePasswordBody = {
        phone_number: item,
        new_password: values.password,
        confirm_password: values.confirmPassword,
      };
      dispatch(
        ChangePasswordApi({
          data: changePasswordBody,
          callback: (response: any) => {
            showToast('Success !', response?.result?.data, 'success');
            navigation.navigate('Success', {
              params: {
                title: 'Password updated!',
                message:
                  'Your password has been successfully\nupdated, please login again.',
                image: appImage.signUpSuccess,
                buttonTitle: 'Login',
              },
            });
          },
          errorCallback: (err: any) => {
            showToast('Error', err?.result?.error, 'error');
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
      <Text style={styles.newPasswordStyle}>Create New Password</Text>
      <Text style={styles.enterPasswordStyle}>
        Please enter a new password to{'\n'}secure your account.
      </Text>
      <Formik
        initialValues={changePasswordFormFields}
        onSubmit={values => {
          handleChangePassword(values);
        }}
        validationSchema={ChangePasswordVS}>
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
                subTitle={'New Password'}
                color={colors.text.main}
                secureTextEntry
                placeholder={'Enter new password'}
                iconName={appIcons.password}
                value={values.password}
                onChangeText={handleChange('password')}
                error={errors.password}
                touched={touched.password}
                onBlur={handleBlur('password')}
              />
              <AppInput
                subTitle={'Confirm New Password'}
                color={colors.text.main}
                secureTextEntry
                placeholder={'Confirm new password'}
                iconName={appIcons.password}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                onBlur={handleBlur('confirmPassword')}
              />
            </View>
            <AppButton
              title={'Set New Password'}
              onPress={() => {
                handleSubmit();
              }}
              // loading={changePasswordLoading}
              // disabled={changePasswordLoading}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default ChangePassword;
