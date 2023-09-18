import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Inbox from '../../screen/App/Inbox';

export type InboxStackParamsList = {
  Inbox: undefined;
};

const Stack = createNativeStackNavigator<InboxStackParamsList>();

function InboxStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Inbox'}>
      <Stack.Screen name={'Inbox'} component={Inbox} />
    </Stack.Navigator>
  );
}

export default InboxStack;
