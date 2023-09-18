/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

/** assets */
import {appIcons} from '../../assets';

/** themes */
import {fonts} from '../../infrustructure/theme/fonts';
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';

/** component */
import {AppHeader, HomeListModal} from '../../components';

/** screen */
import Pending from '../../screen/App/OrderHistory/Pending/Pending';
import Confirmed from '../../screen/App/OrderHistory/Confirmed/Confirmed';
import Completed from '../../screen/App/OrderHistory/Completed/Completed';
import Cancelled from '../../screen/App/OrderHistory/Cancelled/Cancelled';
import InProgress from '../../screen/App/OrderHistory/InProgress/InProgress';

/** Top Tab Navigator */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation}: any) {
  /**React UseRef Hook */
  const listRef = useRef<any>(null);

  /** renderItem */
  const renderItem = ({item, index}: any) => {
    const {options} = descriptors[item.key];
    const label = options.tabBarLabel || options.title || item.name;
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: item.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate({name: item.name, merge: true});
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: item.key,
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
          width: WP('25'),
          paddingTop: WP('3'),
          paddingBottom: WP('3'),
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: isFocused ? fonts.soraBold : fonts.soraMedium,
            fontSize: isFocused ? 16 : 14,
            color: isFocused ? '#000000' : '#B0B3BA',
          }}>
          {label}
        </Text>
        {isFocused && (
          <View
            style={{
              width: WP('23'),
              height: 2,
              backgroundColor: colors.primary.main,
              alignSelf: 'center',
              position: 'absolute',
              bottom: 0,
              top: WP('10'),
              marginTop: 2.3,
            }}
          />
        )}
        <KeyboardAvoidingView>
          <HomeListModal
            listRef={listRef}
            onPressCancel={() => {
              listRef.current.close();
            }}
          />
        </KeyboardAvoidingView>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <AppHeader
        title={'Order History'}
        source={appIcons.menuIcon}
        imageStyle={styles.imageStyle}
        onPress={() => {
          listRef.current.open();
        }}
        rightIc={appIcons.filter}
        rightIcon={true}
        onPressHome={() => {}}
      />
      <View style={styles.tabBar}>
        <FlatList
          data={state.routes}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

function OrderHistoryTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarScrollEnabled: true,
      }}>
      <Tab.Screen name="Pending" component={Pending} />
      <Tab.Screen name="Confirmed" component={Confirmed} />
      <Tab.Screen name="In Progress" component={InProgress} />
      <Tab.Screen name="Completed" component={Completed} />
      <Tab.Screen name="Cancelled" component={Cancelled} />
    </Tab.Navigator>
  );
}

export default OrderHistoryTabs;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginTop: WP('1'),
    // paddingTop: WP('3'),
    // paddingBottom: WP('3'),
    borderBottomWidth: 1.5,
    borderBottomColor: '#B0B3BA19',
    width: WP('100'),
  },
  spacer: {
    padding: 1,
    backgroundColor: colors.primary.main,
    top: 13.5,
    position: 'relative',
  },
  imageStyle: {
    width: 24,
    height: 24,
    tintColor: colors.primary.main,
  },
  tabBar: {
    flexDirection: 'row',
    marginTop: WP('1'),
    // paddingTop: WP('3'),
    // paddingBottom: WP('3'),
    borderBottomWidth: 1.5,
    borderBottomColor: '#B0B3BA19',
    // width: WP('100'),
  },
});
