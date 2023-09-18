import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//** screen */
import Notification from '../../screen/App/Notifications';

export type NotificationStackParamsList = {
  Notification: undefined;
};

const Stack = createNativeStackNavigator<NotificationStackParamsList>();

function NotificationStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Notification'}>
      <Stack.Screen name={'Notification'} component={Notification} />
    </Stack.Navigator>
  );
}

export default NotificationStack;
