/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

//**themes */
import {colors} from '../../infrustructure/theme/colors';
import {WP} from '../../infrustructure/theme/responsive';
import {fonts} from '../../infrustructure/theme/fonts';
import {appIcons} from '../../assets';
import {useSelector} from 'react-redux';

//**InterFace Props */
interface Props {
  state?: any;
  descriptors?: any;
  navigation?: any;
}

const CustomTabBar: FC<Props> = ({state, descriptors, navigation}) => {
  const {isLoginIn} = useSelector((state: any) => state?.authSlice);

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const iconColor = isFocused ? colors.primary.main : colors.text.main;
        const indicatorColor = isFocused ? colors.primary.main : 'transparent';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (isLoginIn) {
            if (route.name === 'MyCart') {
              navigation.navigate('HomeStack', {screen: 'MyCart'});
            } else {
              navigation.navigate(route.name);
            }
          } else {
            navigation.navigate('App', {screen: 'ContinueAsGuest'});
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabBarItem}
            onPress={onPress}
            activeOpacity={0.8}>
            <Image
              source={
                isFocused && index === 0
                  ? appIcons.homeActive
                  : !isFocused && index === 0
                  ? appIcons.homeInActive
                  : isFocused && index === 1
                  ? appIcons.myVehiclesBlack
                  : !isFocused && index === 1
                  ? appIcons.myVehicles
                  : isFocused && index === 2
                  ? appIcons.inBoxActive
                  : !isFocused && index === 2
                  ? appIcons.inboxInactive
                  : appIcons.myCartInActive
              }
              resizeMode={'contain'}
              style={[styles.barIconStyle, {tintColor: iconColor}]}
            />
            <Text
              style={{
                color: isFocused ? colors.primary.main : '#0000002D',
                fontFamily: isFocused ? fonts.soraSemiBold : fonts.soraRegular,
                fontSize: isFocused ? 12 : 10,
              }}>
              {label}
            </Text>
            {isFocused && (
              <View
                style={[styles.indicator, {backgroundColor: indicatorColor}]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 80,
    borderTopWidth: 1,
    borderTopColor: '#0000000D',
    padding: WP('2'),
    backgroundColor: colors.background.light,
    elevation: 10,
    zIndex: 100,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 0,
    height: 2.5,
    width: 80,
    borderRadius: 10,
  },
  barIconStyle: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
});

export default CustomTabBar;
