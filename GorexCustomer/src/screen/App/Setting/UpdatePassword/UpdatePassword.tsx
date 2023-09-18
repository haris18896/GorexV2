/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Formik} from 'formik';

//** assets */
import {appIcons} from '../../../../assets';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** theme */
import {colors} from '../../../../infrustructure/theme/colors';

//** third party component */
import {AppButton, AppHeader, AppInput} from '../../../../components';

//**  */
import {
  UpdatePasswordVS,
  updatePasswordFormFields,
} from '../../../../utils/validations';
import {useDispatch, useSelector} from 'react-redux';
import {UpdatePasswordApi} from '../../../../redux/Auth/authAction';
import {showToast} from '../../../../utils/common';

const UpdatePassword = () => {
  const navigation = useNavigation();

  //** selectors */
  const {user} = useSelector((state: any) => state.authSlice);
  const updatePasswordLoading = useSelector(
    (state: any) => state.authSlice?.updatePasswordLoading,
  );
  //** dispatch */
  const dispatch = useDispatch<any>();

  //** UpdatePassword */
  const UpdatePassword = (values: any, resetForm: () => void) => {
    try {
      const updatePasswordBody = {
        user: user?.data?.id,
        old_password: values.currentPassword,
        new_password: values.password,
        confirm_password: values.confirmPassword,
      };

      dispatch(
        UpdatePasswordApi({
          data: updatePasswordBody,
          callback: (response: any) => {
            if (response.result?.data) {
              showToast('Success', response.result.data, 'success');
            }
            navigation.goBack();
            resetForm();
          },
          errorCallback: (err: any) => {
            showToast('Error', err.error?.message, 'error');
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
        title={'Update Password'}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <Formik
        initialValues={updatePasswordFormFields}
        onSubmit={(values, {resetForm}) => {
          UpdatePassword(values, resetForm);
        }}
        validationSchema={UpdatePasswordVS}>
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          handleSubmit,
        }) => (
          <>
            <View
              style={{
                flex: 0.9,
              }}>
              <AppInput
                style={styles.inputContainer}
                subTitle={'Current Password'}
                color={colors.text.main}
                secureTextEntry
                placeholder={'Enter current password'}
                iconName={appIcons.password}
                value={values.currentPassword}
                onChangeText={handleChange('currentPassword')}
                error={errors.currentPassword}
                touched={touched.currentPassword}
                onBlur={handleBlur('currentPassword')}
                blurOnSubmit={false}
              />

              <AppInput
                style={[
                  styles.inputContainer,
                  {
                    marginTop: 0,
                    marginBottom: -10,
                  },
                ]}
                secureTextEntry
                blurOnSubmit={false}
                error={errors.password}
                value={values.password}
                color={colors.text.main}
                subTitle={'New Password'}
                touched={touched.password}
                iconName={appIcons.password}
                onBlur={handleBlur('password')}
                placeholder={'Enter your password'}
                onChangeText={handleChange('password')}
              />

              <AppInput
                secureTextEntry
                blurOnSubmit={false}
                color={colors.text.main}
                iconName={appIcons.password}
                value={values.confirmPassword}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                subTitle={'Confirm New Password'}
                placeholder={'Confirm new password'}
                onBlur={handleBlur('confirmPassword')}
                onChangeText={handleChange('confirmPassword')}
              />
            </View>
            <AppButton
              title={'Update Password'}
              onPress={() => {
                handleSubmit();
              }}
              style={styles.buttonContainer}
              loading={updatePasswordLoading}
              disabled={updatePasswordLoading}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 15,
    marginBottom: -10,
  },
  buttonContainer: {
    // marginBottom: 15,
    // position: 'absolute',
    // bottom: WP('10'),
  },
});
