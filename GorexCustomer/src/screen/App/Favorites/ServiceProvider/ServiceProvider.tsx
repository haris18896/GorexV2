/* eslint-disable react-native/no-inline-styles */
import {View, FlatList} from 'react-native';
import React from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {EliteAutoService} from '../../../../components';

const ServiceProvider = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.light,
      }}>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        showsVerticalScrollIndicator={false}
        renderItem={() => <EliteAutoService />}
      />
    </View>
  );
};

export default ServiceProvider;
