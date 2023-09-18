import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/** Screen */
import MyVehicles from '../../screen/App/MyVehicles';
import AddVehicle from '../../screen/App/MyVehicles/AddVehicle/AddVehicle';
import ViewProfile from '../../screen/App/MyVehicles/ViewProfile/ViewProfile';

/** type */
export type MyVehicleStackParamsList = {
  MyVehicles: undefined;
  AddVehicle: undefined;
  ViewProfile: undefined;
};

const Stack = createNativeStackNavigator<MyVehicleStackParamsList>();

function MyVehicleStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'MyVehicles'}>
      <Stack.Screen name={'MyVehicles'} component={MyVehicles} />
      <Stack.Screen name={'AddVehicle'} component={AddVehicle} />
      <Stack.Screen name={'ViewProfile'} component={ViewProfile} />
    </Stack.Navigator>
  );
}

export default MyVehicleStack;
