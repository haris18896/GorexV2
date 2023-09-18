import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/** screen */
import Payment from '../../screen/App/Payment';
import WalletTopUp from '../../screen/App/Payment/Wallet/WalletTop/WalletTopUp';
import AddNewCard from '../../screen/App/Payment/Cards/AddNewCard/AddNewCard';
import WalletWithDraw from '../../screen/App/Payment/Wallet/WalletWithDraw/WalletWithDraw';
import Settings from '../../screen/App/Payment/Wallet/Settings/Settings';

export type PaymentStackParamsList = {
  Payment: undefined;
  WalletTopUp: undefined;
  AddNewCard: undefined;
  WalletWithDraw: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<PaymentStackParamsList>();

function PaymentStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Payment'}>
      <Stack.Screen name={'Payment'} component={Payment} />
      <Stack.Screen name={'WalletTopUp'} component={WalletTopUp} />
      <Stack.Screen name={'AddNewCard'} component={AddNewCard} />
      <Stack.Screen name={'WalletWithDraw'} component={WalletWithDraw} />
      <Stack.Screen name={'Settings'} component={Settings} />
    </Stack.Navigator>
  );
}

export default PaymentStack;
