/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {colors} from '../../../infrustructure/theme/colors';
import OrderHistoryTabs from '../../../navigation/TopTab/OrderHistoryTabs';

const OrderHistory = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <OrderHistoryTabs />
    </View>
  );
};

export default OrderHistory;
