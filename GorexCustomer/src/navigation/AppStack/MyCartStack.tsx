import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyCart from '../../screen/App/MyCart';

export type MyCartStackParamsList = {
  MyCart: undefined;
};

const Stack = createNativeStackNavigator<MyCartStackParamsList>();

function MyCartStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'MyCart'}>
      <Stack.Screen name={'MyCart'} component={MyCart} />
    </Stack.Navigator>
  );
}

export default MyCartStack;
