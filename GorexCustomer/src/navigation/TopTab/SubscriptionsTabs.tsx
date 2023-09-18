/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

/** screen */
import Tiers from '../../screen/App/Subscriptions/Tiers/Tiers';
import History from '../../screen/App/Subscriptions/History/History';
import Subscriptions from '../../screen/App/Subscriptions/Subscriptions/Subscriptions';

/** themes */
import {fonts} from '../../infrustructure/theme/fonts';
import {HP, WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';

//** assets */
import {appIcons} from '../../assets';

//** third party component */
import {HomeListModal} from '../../components';
import {SubscriptionsHeader} from '../../screen/App/Subscriptions/Features/SubscriptionsHeader';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation}: any) {
  //**React UseRef Hook */
  const listRef = useRef<any>(null);
  const statusBarHeight = StatusBar.currentHeight ?? 0;

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
          width: WP('30'),
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
              width: WP('30'),
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
      <SubscriptionsHeader
        source={appIcons.menuIcon}
        imageStyle={styles.imageStyle}
        title={'GO Subscriptions'}
        onPress={() => {
          listRef.current.open();
        }}
        height={
          state.routes[state.index].name === 'Tiers' && Platform.OS === 'ios'
            ? WP('51')
            : state.routes[state.index].name === 'Tiers' &&
              Platform.OS === 'android'
            ? HP(13) - statusBarHeight
            : state.routes[state.index].name === 'Subscriptions' &&
              Platform.OS === 'ios'
            ? WP('51')
            : state.routes[state.index].name === 'Subscriptions' &&
              Platform.OS === 'android'
            ? HP(13) - statusBarHeight
            : state.routes[state.index].name === 'History' &&
              Platform.OS === 'ios'
            ? WP('28')
            : state.routes[state.index].name === 'History' &&
              Platform.OS === 'android'
            ? HP(13) - statusBarHeight
            : 0
        }
        angle={state.routes[state.index].name === 'History' ? 42 : 35}
        angleCenter={
          state.routes[state.index].name === 'History'
            ? {x: 1, y: 3.05}
            : {x: 1, y: 1.88}
        }
        subtitle={
          state.routes[state.index].name === 'Tiers'
            ? 'GoWash Tiers!'
            : state.routes[state.index].name === 'Subscriptions'
            ? 'Your Subscriptions'
            : state.routes[state.index].name === 'History'
            ? ''
            : ''
        }
        description={
          state.routes[state.index].name === 'Tiers'
            ? 'Choose the perfect subscription tier to keep\nyour vehicle fresh and clean.'
            : state.routes[state.index].name === 'Subscriptions'
            ? 'Manage your existing subscriptions details.'
            : state.routes[state.index].name === 'History'
            ? ''
            : ''
        }
      />

      <View style={styles.tabBar}>
        <FlatList
          data={state.routes}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          contentContainerStyle={{
            flexGrow: 0.4,
            marginHorizontal: WP('4'),
            justifyContent: 'center',
            borderBottomWidth: 1.5,
            borderBottomColor: '#B0B3BA20',
            marginTop: WP('1'),
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <KeyboardAvoidingView>
        <HomeListModal
          listRef={listRef}
          onPressCancel={() => {
            listRef.current.close();
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

function SubscriptionsTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarScrollEnabled: true,
      }}
      initialRouteName={'Tiers'}>
      <Tab.Screen name="Tiers" component={Tiers} />
      <Tab.Screen name="Subscriptions" component={Subscriptions} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

export default SubscriptionsTabs;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginTop: WP('1'),
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
    tintColor: colors.background.light,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.light,
  },
  clearFilterStyle: {
    color: colors.text.main,
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: WP('4'),
  },
  buttonContainer: {
    marginTop: WP('10'),
  },
  filterListMainContainer: {
    maxWidth: '100%',
    marginTop: WP('1.5'),
    marginHorizontal: WP('4'),
  },
  filterListContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortByImage: {
    width: 18,
    height: 12,
  },
  filterTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP('2'),
  },
  dataListContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    marginTop: WP('5'),
  },
  dataListImage: {
    width: 24,
    height: 24,
  },
  titleStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP('2'),
  },
});
