/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {ScrollView, StatusBar, StatusBarStyle} from 'react-native';
import {colors} from '../../infrustructure/theme/colors';

interface Props {
  barStyle?: StatusBarStyle | null | undefined;
  children?: any;
  refreshControl?: any;
}

const Layout: FC<Props> = ({barStyle, children, refreshControl}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: colors.background.main,
      }}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <StatusBar barStyle={barStyle} />
      {children}
    </ScrollView>
  );
};

export {Layout};
