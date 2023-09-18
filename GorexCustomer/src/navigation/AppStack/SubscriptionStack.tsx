import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Subscriptions from '../../screen/App/Subscriptions';
import UpdateSubscription from '../../screen/App/Subscriptions/Subscriptions/UpdateSubscription/UpdateSubscription';
import AddAddress from '../../screen/App/Subscriptions/Subscriptions/AddAddress/AddAddress';

export type SubscriptionStackParamsList = {
  Subscription: undefined;
  UpdateSubscription: undefined;
  AddAddress: undefined;
};

const Stack = createNativeStackNavigator<SubscriptionStackParamsList>();

function SubscriptionStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Subscription'}>
      <Stack.Screen name={'Subscription'} component={Subscriptions} />
      <Stack.Screen
        name={'UpdateSubscription'}
        component={UpdateSubscription}
      />
      <Stack.Screen name={'AddAddress'} component={AddAddress} />
    </Stack.Navigator>
  );
}

export default SubscriptionStack;
