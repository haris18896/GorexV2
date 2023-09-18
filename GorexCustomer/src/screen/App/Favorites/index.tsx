/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View} from 'react-native';
import {colors} from '../../../infrustructure/theme/colors';
import FavoriteTabs from '../../../navigation/TopTab/FavoriteTabs';

const Favorite = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <StatusBar barStyle={'dark-content'} />
      <FavoriteTabs />
    </View>
  );
};

export default Favorite;
