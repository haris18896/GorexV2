import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GorexSupport from '../../screen/App/GorexSupport';

export type GorexSupportStackParamsList = {
  GorexSupport: undefined;
};

const Stack = createNativeStackNavigator<GorexSupportStackParamsList>();

function GorexSupportStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'GorexSupport'}>
      <Stack.Screen name={'GorexSupport'} component={GorexSupport} />
    </Stack.Navigator>
  );
}

export default GorexSupportStack;
