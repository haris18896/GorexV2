/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//** screens */
import Dashboard from '../../screen/App/Dashboard';
import MyVehicles from '../../screen/App/MyVehicles';
import MyCart from '../../screen/App/MyCart';
import InboxStack from '../AppStack/InboxStack';

//** third party components */
import CustomTabBar from '../../components/Tabs/CustomTabBar';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Dashboard'}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="MyVehicles" component={MyVehicles} />
      <Tab.Screen name="Inbox" component={InboxStack} />
      <Tab.Screen name="MyCart" component={MyCart} />
    </Tab.Navigator>
  );
};

export default BottomTab;
