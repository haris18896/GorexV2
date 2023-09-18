import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//** screens */
import Login from '../../screen/Auth/Login/Login';
import SignUp from '../../screen/Auth/SignUp/SignUp';
import Success from '../../screen/App/Success/Success';
import VerifyOtp from '../../screen/Auth/VerifyOtp/VerifyOtp';
import ChangePassword from '../../screen/Auth/ChangePassword/ChangePassword';
import ForgotPassword from '../../screen/Auth/ForgotPassword/ForgotPassword';
import ContinueAsGuest from '../../screen/Auth/ContinueAsGuest/ContinueAsGuest';

//** types */
export type AuthStackParamsList = {
  Login: undefined;
  SignUp: undefined;
  Success: undefined;
  VerifyOtp: undefined;
  ChangePassword: undefined;
  ForgotPassword: undefined;
  ContinueAsGuest: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamsList>();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Login'}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
      <Stack.Screen name={'Success'} component={Success} />
      <Stack.Screen name={'VerifyOtp'} component={VerifyOtp} />
      <Stack.Screen name={'ChangePassword'} component={ChangePassword} />
      <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
      <Stack.Screen name={'ContinueAsGuest'} component={ContinueAsGuest} />
    </Stack.Navigator>
  );
}

export default AuthStack;
