import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GorexClub from '../../screen/App/GorexClub';

export type GorexClubStackParamsList = {
  GorexClub: undefined;
};

const Stack = createNativeStackNavigator<GorexClubStackParamsList>();

function GorexClubStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'GorexClub'}>
      <Stack.Screen name={'GorexClub'} component={GorexClub} />
    </Stack.Navigator>
  );
}

export default GorexClubStack;
