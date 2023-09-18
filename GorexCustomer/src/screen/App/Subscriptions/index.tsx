/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {colors} from '../../../infrustructure/theme/colors';
import SubscriptionsTabs from '../../../navigation/TopTab/SubscriptionsTabs';

const Subscriptions = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <SubscriptionsTabs />
    </View>
  );
};

export default Subscriptions;
