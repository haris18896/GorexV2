import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/** screen */
import OrderHistory from '../../screen/App/OrderHistory';
import OrderView from '../../screen/App/OrderHistory/OrderView/OrderView';
import OrderCancel from '../../screen/App/OrderHistory/OrderCancel/OrderCancel';
import OrderListView from '../../screen/App/OrderHistory/OrderListView/OrderListView';

export type OrderHistoryStackParamsList = {
  OrderHistory: undefined;
  OrderView: undefined;
  OrderCancel: undefined;
  OrderListView: undefined;
};

const Stack = createNativeStackNavigator<OrderHistoryStackParamsList>();

function OrderHistoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'OrderHistory'}>
      <Stack.Screen name={'OrderHistory'} component={OrderHistory} />
      <Stack.Screen name={'OrderView'} component={OrderView} />
      <Stack.Screen name={'OrderCancel'} component={OrderCancel} />
      <Stack.Screen name={'OrderListView'} component={OrderListView} />
    </Stack.Navigator>
  );
}

export default OrderHistoryStack;
