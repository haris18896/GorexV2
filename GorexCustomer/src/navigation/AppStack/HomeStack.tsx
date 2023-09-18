import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//** screens */
import Offers from '../../screen/App/Offers/Offers&Promo/Offers';
import OfferDetails from '../../screen/App/Offers/OfferDetails/OfferDetails';
import EliteServiceDetail from '../../screen/App/Dashboard/TopService/EliteServiceDetail';
import TopServiceView from '../../screen/App/Dashboard/TopService/TopServiceView/TopServiceView';
import TopServiceDetail from '../../screen/App/Dashboard/TopService/TopServiceDetail/TopServiceDetail';
import BookServiceDetail from '../../screen/App/Dashboard/TopService/EliteServiceDetail/Service/BookServiceDetail/BookServiceDetail';
import BookTimeSlot from '../../screen/App/Dashboard/TopService/EliteServiceDetail/Service/BookTimeSlot/BookTimeSlot';
import InboxDetail from '../../screen/App/Inbox/InboxDetail/InboxDetail';
import MyCart from '../../screen/App/MyCart';
import ProductView from '../../screen/App/Dashboard/ProductView/ProductView';
import ProductDetail from '../../screen/App/Dashboard/ProductDetail/ProductDetail';

export type HomeStackParamsList = {
  Offers: undefined;
  OfferDetails: undefined;
  TopServiceView: undefined;
  TopServiceDetail: undefined;
  EliteServiceDetail: undefined;
  BookServiceDetail: undefined;
  InboxDetail: undefined;
  BookTimeSlot: undefined;
  MyCart: undefined;
  ProductView: undefined;
  ProductDetail: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamsList>();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Offers'}>
      <Stack.Screen name={'Offers'} component={Offers} />
      <Stack.Screen name={'OfferDetails'} component={OfferDetails} />
      <Stack.Screen name={'TopServiceView'} component={TopServiceView} />
      <Stack.Screen name={'TopServiceDetail'} component={TopServiceDetail} />
      <Stack.Screen
        name={'EliteServiceDetail'}
        component={EliteServiceDetail}
      />
      <Stack.Screen name={'BookServiceDetail'} component={BookServiceDetail} />
      <Stack.Screen name={'InboxDetail'} component={InboxDetail} />
      <Stack.Screen name={'BookTimeSlot'} component={BookTimeSlot} />
      <Stack.Screen name={'MyCart'} component={MyCart} />
      <Stack.Screen name={'ProductView'} component={ProductView} />
      <Stack.Screen name={'ProductDetail'} component={ProductDetail} />
    </Stack.Navigator>
  );
}

export default HomeStack;
