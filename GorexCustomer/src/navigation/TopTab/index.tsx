/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Fragment} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

/** themes */
import {fonts} from '../../infrustructure/theme/fonts';
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';

/** third party component */
import {EliteAutoTop, EliteServiceHeader} from '../../components';

/** screen */
import Service from '../../screen/App/Dashboard/TopService/EliteServiceDetail/Service';
import Rating from '../../screen/App/Dashboard/TopService/EliteServiceDetail/Rating/Rating';
import Details from '../../screen/App/Dashboard/TopService/EliteServiceDetail/Details/Details';
import Products from '../../screen/App/Dashboard/TopService/EliteServiceDetail/Products/Products';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation, customItem}: any) {
  const isFocus = state.index;
  const distance = customItem?.distance / 1000;
  const fractionalPart = distance - Math.floor(distance);

  return (
    <Fragment>
      <EliteServiceHeader
        onPressBack={() => {
          navigation.goBack();
        }}
        color={isFocus}
      />
      <EliteAutoTop
        name={customItem?.name ? customItem.name : 'Elite Auto Service'}
        distance={customItem?.distance ? fractionalPart.toFixed(2) : 0}
        image={customItem?.image !== false ? customItem?.image : undefined}
        rating={customItem?.rating ? customItem?.rating : 0}
      />
      <View style={styles.mainContainer}>
        {state.routes.map((route: any, index: any) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
              params: {item: customItem},
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({
                name: route.name,
                merge: true,
                params: {item: customItem},
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: isFocused ? fonts.soraBold : fonts.soraMedium,
                  fontSize: isFocused ? 16 : 14,
                  color: isFocused ? '#000000' : '#B0B3BA',
                  maxWidth: '100%',
                }}>
                {label}
              </Text>
              {isFocused && <View style={styles.spacer} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </Fragment>
  );
}

function MyTabs({customItem}: any) {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar customItem={customItem} {...props} />}>
      <Tab.Screen name="Services">
        {props => <Service {...props} customItem={customItem} />}
      </Tab.Screen>
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Ratings" component={Rating} />
      <Tab.Screen name="Details">
        {props => <Details {...props} customItem={customItem} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginTop: WP('1'),
    paddingTop: WP('3'),
    paddingBottom: WP('3'),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#B0B3BA19',
    width: WP('95'),
    alignSelf: 'center',
  },
  spacer: {
    padding: 1,
    backgroundColor: colors.primary.main,
    top: 13,
  },
});
