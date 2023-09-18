/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../infrustructure/theme/colors';
import {AppHeader} from '../../../components';

const GorexClub = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <AppHeader
        title={'GorexClub'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default GorexClub;
