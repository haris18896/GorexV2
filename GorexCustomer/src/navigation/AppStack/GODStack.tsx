import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//** screen */
import GorexOnDemand from '../../screen/App/GorexOnDemand';
import MyRequest from '../../screen/App/GorexOnDemand/MyRequest';
import OrderDetails from '../../screen/App/GorexOnDemand/OrderDetails/OrderDetails';
import GoDChooseVehicles from '../../screen/App/GorexOnDemand/RequestServices/GoDChooseVehicles/GoDChooseVehicles';
import GoDChooseAddressAndSlots from '../../screen/App/GorexOnDemand/RequestServices/GoDChooseAddressAndSlots/GoDChooseAddressAndSlots';

export type GODStackParamsList = {
  MyRequest: undefined;
  OrderDetails: undefined;
  GorexOnDemand: undefined;
  GoDChooseVehicles: undefined;
  GoDChooseAddressAndSlots: undefined;
};

const Stack = createNativeStackNavigator<GODStackParamsList>();

function GODStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'GorexOnDemand'}>
      <Stack.Screen name={'MyRequest'} component={MyRequest} />
      <Stack.Screen name={'OrderDetails'} component={OrderDetails} />
      <Stack.Screen name={'GorexOnDemand'} component={GorexOnDemand} />
      <Stack.Screen name={'GoDChooseVehicles'} component={GoDChooseVehicles} />
      <Stack.Screen
        name={'GoDChooseAddressAndSlots'}
        component={GoDChooseAddressAndSlots}
      />
    </Stack.Navigator>
  );
}

export default GODStack;
