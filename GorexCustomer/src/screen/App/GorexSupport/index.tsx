import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../infrustructure/theme/colors';
import {AppHeader} from '../../../components';

const GorexSupport = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <AppHeader
        title={'GorexSupport'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text>GorexSupport</Text>
    </View>
  );
};

export default GorexSupport;
