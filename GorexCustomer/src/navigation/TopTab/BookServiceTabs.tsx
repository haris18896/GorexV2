/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

/** screen */
import BookService from '../../screen/App/Dashboard/TopService/EliteServiceDetail/Service/BookService/BookService';
import BookPackage from '../../screen/App/Dashboard/TopService/EliteServiceDetail/Service/BookPackage/BookPackage';

/** themes */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation, item}: any) {
  return (
    <View
      style={{
        backgroundColor: colors.background.light,
      }}>
      <View
        style={{
          width: WP('100'),
          padding: WP('3'),
          flexDirection: 'row',
          marginTop: WP('2'),
        }}>
        <View
          style={{
            width: WP('73'),
            paddingHorizontal: WP('1'),
          }}>
          <Text
            style={{
              fontFamily: fonts.soraBold,
              fontSize: 22,
              color: colors.text.main,
              textAlign: 'left',
            }}>
            {item?.name ? item?.name : 'Elite Auto Service'}
          </Text>
          <Text
            style={{
              color: '#B0B3BA',
              fontFamily: fonts.soraSemiBold,
              fontSize: 14,
              textAlign: 'left',
              marginVertical: WP('1'),
            }}>
            Choose Tailored Repair Solutions To{'\n'}Perfectly Suit Your
            Vehicle’s Needs
          </Text>
        </View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#FF4E00',
            borderRadius: 31,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: fonts.soraBold,
              fontSize: 26,
              color: '#FFFFFF',
            }}>
            Elite
          </Text>
        </View>
      </View>
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
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
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
                flex: 0.25,
                alignSelf: 'center',
                justifyContent: 'space-evenly',
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
    </View>
  );
}

function BookServiceTabs({customItem}: any) {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar item={customItem} {...props} />}>
      <Tab.Screen name="Services">
        {props => <BookService {...props} itemService={customItem} />}
      </Tab.Screen>
      <Tab.Screen name="Packages" component={BookPackage} />
    </Tab.Navigator>
  );
}

export default BookServiceTabs;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginTop: WP('1'),
    paddingTop: WP('3'),
    paddingBottom: WP('3'),
    // alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#B0B3BA19',
    width: WP('95'),
    alignSelf: 'center',
  },
  spacer: {
    padding: 1,
    backgroundColor: colors.primary.main,
    top: 13.5,
    position: 'relative',
  },
});
