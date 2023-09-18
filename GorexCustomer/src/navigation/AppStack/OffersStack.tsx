import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//** screen */
import Offers from '../../screen/App/Offers/Offers&Promo/Offers';
import OfferDetails from '../../screen/App/Offers/OfferDetails/OfferDetails';

export type OffersStackParamsList = {
  Offers: undefined;
  OfferDetails: undefined;
};

const Stack = createNativeStackNavigator<OffersStackParamsList>();

function OffersStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Offers'}>
      <Stack.Screen name={'Offers'} component={Offers} />
      <Stack.Screen name={'OfferDetails'} component={OfferDetails} />
    </Stack.Navigator>
  );
}

export default OffersStack;
