import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppStack from './stack/App';
import AuthStack from './stack/AuthStack';
import {useSelector} from 'react-redux';

export type MainStackParamsList = {
  App: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamsList>();

const MainStack = () => {
  const {isLoginIn} = useSelector((state: any) => state.authSlice);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoginIn ? 'App' : 'Auth'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="App" component={AppStack} />
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
