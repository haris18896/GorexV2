/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

/** screen */
import Products from '../../screen/App/Favorites/Products/Products';
import ServiceProvider from '../../screen/App/Favorites/ServiceProvider/ServiceProvider';

/** themes */
import {fonts} from '../../infrustructure/theme/fonts';
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';

//** assets */
import {appIcons} from '../../assets';

//** third party component */
import {AppHeader, HomeListModal} from '../../components';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation, position}) {
  //**React UseRef Hook */
  const listRef = useRef<any>(null);

  const push = useNavigation();
  const renderItem = ({item, index}) => {
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
          width: WP('45'),
          paddingTop: WP('3'),
          paddingBottom: WP('3'),
          borderBottomWidth: 1.5,
          borderBottomColor: '#B0B3BA20',
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
              width: WP('50'),
              height: 3,
              backgroundColor: colors.primary.main,
              alignSelf: 'center',
              position: 'absolute',
              bottom: 0,
              top: WP('10.4'),
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
            onPressTopList={() => {
              listRef.current.close();
              push.navigate('BottomTab');
            }}
            onPressFooterList={() => {
              listRef.current.close();
              push.navigate('BottomTab');
            }}
          />
        </KeyboardAvoidingView>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <AppHeader
        title={'Favorites'}
        source={appIcons.menuIcon}
        imageStyle={styles.imageStyle}
        onPress={() => {
          listRef.current.open();
        }}
      />

      <View style={styles.tabBar}>
        <FlatList
          data={state.routes}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: WP('3'),
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

function FavoriteTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarScrollEnabled: true,
      }}
      initialRouteName={'Tiers'}>
      <Tab.Screen name="ServiceProviders" component={ServiceProvider} />
      <Tab.Screen name="Products" component={Products} />
    </Tab.Navigator>
  );
}

export default FavoriteTabs;

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
  },
  tabBar: {
    flexDirection: 'row',
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
