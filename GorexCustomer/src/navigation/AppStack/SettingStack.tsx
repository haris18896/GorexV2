import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/** screen */
import Settings from '../../screen/App/Setting';
import Account from '../../screen/App/Setting/Account/Account';
import Addresses from '../../screen/App/Setting/Addresses/Addresses';
import UpdatePassword from '../../screen/App/Setting/UpdatePassword/UpdatePassword';

export type SettingStackParamsList = {
  Account: undefined;
  Setting: undefined;
  Addresses: undefined;
  UpdatePassword: undefined;
};

const Stack = createNativeStackNavigator<SettingStackParamsList>();

function SettingStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Setting'}>
      <Stack.Screen name={'Account'} component={Account} />
      <Stack.Screen name={'Setting'} component={Settings} />
      <Stack.Screen name={'Addresses'} component={Addresses} />
      <Stack.Screen name={'UpdatePassword'} component={UpdatePassword} />
    </Stack.Navigator>
  );
}

export default SettingStack;
