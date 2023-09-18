import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/** Stack */
import BottomTab from '../BottomTab';
import GODStack from '../AppStack/GODStack';
import HomeStack from '../AppStack/HomeStack';
import OffersStack from '../AppStack/OffersStack';
import MyCartStack from '../AppStack/MyCartStack';
import MyVehicleStack from '../AppStack/MyVehicle';
import PaymentStack from '../AppStack/PaymentStack';
import SettingStack from '../AppStack/SettingStack';
import FavoriteStack from '../AppStack/FavoriteStack';
import Success from '../../screen/App/Success/Success';
import GorexClubStack from '../AppStack/GorexClubStack';
import GorexSupportStack from '../AppStack/GorexSupportStack';
import NotificationStack from '../AppStack/NotificationStack';
import OrderHistoryStack from '../AppStack/OrderHistoryStack';
import SubscriptionStack from '../AppStack/SubscriptionStack';
import ContinueAsGuest from '../../screen/Auth/ContinueAsGuest/ContinueAsGuest';

/** types */
export type AppStackParamsList = {
  Success: undefined;
  GODStack: undefined;
  BottomTab: undefined;
  HomeStack: undefined;
  InboxStack: undefined;
  MyCartStack: undefined;
  OffersStack: undefined;
  PaymentStack: undefined;
  SettingStack: undefined;
  FavoriteStack: undefined;
  MyVehicleStack: undefined;
  GorexClubStack: undefined;
  ContinueAsGuest: undefined;
  GorexSupportStack: undefined;
  NotificationStack: undefined;
  OrderHistoryStack: undefined;
  SubscriptionStack: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamsList>();

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'BottomTab'}>
      <Stack.Screen name={'Success'} component={Success} />
      <Stack.Screen name={'GODStack'} component={GODStack} />
      <Stack.Screen name={'BottomTab'} component={BottomTab} />
      <Stack.Screen name={'HomeStack'} component={HomeStack} />
      <Stack.Screen name={'OffersStack'} component={OffersStack} />
      <Stack.Screen name={'MyCartStack'} component={MyCartStack} />
      <Stack.Screen name={'PaymentStack'} component={PaymentStack} />
      <Stack.Screen name={'SettingStack'} component={SettingStack} />
      <Stack.Screen name={'FavoriteStack'} component={FavoriteStack} />
      <Stack.Screen name={'MyVehicleStack'} component={MyVehicleStack} />
      <Stack.Screen name={'GorexClubStack'} component={GorexClubStack} />
      <Stack.Screen name={'ContinueAsGuest'} component={ContinueAsGuest} />
      <Stack.Screen name={'GorexSupportStack'} component={GorexSupportStack} />
      <Stack.Screen name={'NotificationStack'} component={NotificationStack} />
      <Stack.Screen name={'OrderHistoryStack'} component={OrderHistoryStack} />
      <Stack.Screen name={'SubscriptionStack'} component={SubscriptionStack} />
    </Stack.Navigator>
  );
}

export default AppStack;
