import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Favorite from '../../screen/App/Favorites';

export type FavoriteStackParamsList = {
  Favorite: undefined;
};

const Stack = createNativeStackNavigator<FavoriteStackParamsList>();

function FavoriteStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Favorite'}>
      <Stack.Screen name={'Favorite'} component={Favorite} />
    </Stack.Navigator>
  );
}

export default FavoriteStack;
