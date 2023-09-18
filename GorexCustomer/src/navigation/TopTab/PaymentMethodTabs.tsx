/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

/** screen */
import Cards from '../../screen/App/Payment/Cards/Cards';
import Wallet from '../../screen/App/Payment/Wallet/Wallet';
import Transactions from '../../screen/App/Payment/Transactions/Transactions';

/** themes */
import {fonts} from '../../infrustructure/theme/fonts';
import {HP, WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';

//** assets */
import {appIcons} from '../../assets';

//** third party component */
import {AppButton, HomeListModal, RBSheetModal} from '../../components';
import {PaymentHeader} from '../../screen/App/Payment/Features/PaymentHeader';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation}: any) {
  //**React UseRef Hook */
  const listRef = useRef<any>(null);
  const filterRef = useRef<any>(null);

  //** state */
  const [filter, setFilter] = useState(false);
  const [selected, setSelected] = useState([]);

  //**toggleFilterSelection */
  const toggleFilterSelection = (item: any) => {
    setSelected((prevSelectedItems: any) => {
      const isItemSelected = prevSelectedItems.includes(item);
      if (isItemSelected) {
        // Item is already selected, remove it from the selectedItems array
        return prevSelectedItems.filter(
          (selectedItem: any) => selectedItem !== item,
        );
      } else {
        // Item is not selected, add it to the selectedItems array
        return [...prevSelectedItems, item];
      }
    });
  };

  //** clear selection */
  const clearSelection = () => {
    setSelected([]);
  };

  const push = useNavigation<any>();
  const renderItem = ({item, index}: any) => {
    const {options} = descriptors[item.key];
    const label = options.tabBarLabel || options.title || item.name;
    const isFocused = state.index === index;

    const data = [
      {
        id: 0,
        title: 'Today',
      },
      {
        id: 1,
        title: 'This week',
      },
      {
        id: 2,
        title: 'This month',
      },
      {
        id: 3,
        title: 'This year',
      },
      {
        id: 4,
        title: 'Lifetime',
      },
    ];

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

          <RBSheetModal
            refRBSheet={filterRef}
            open={filter}
            height={HP('55')}
            onClose={() => {
              setFilter(false);
              clearSelection();
            }}
            draggable={true}
            backgroundColor={'#ffffff'}>
            <View style={styles.filterListMainContainer}>
              <View style={styles.filterListContentContainer}>
                <Image
                  source={appIcons.sortBy}
                  resizeMode={'contain'}
                  style={styles.sortByImage}
                />
                <Text style={styles.filterTextStyle}>Filters</Text>
              </View>
              <FlatList
                data={data}
                renderItem={({item, index}: any) => (
                  <Pressable
                    onPress={() => {
                      toggleFilterSelection(item);
                    }}
                    key={index}
                    style={styles.dataListContainer}>
                    <Image
                      source={
                        selected.includes(item)
                          ? appIcons.checked
                          : appIcons.unCheckedCircle
                      }
                      resizeMode={'contain'}
                      style={styles.dataListImage}
                    />
                    <Text style={styles.titleStyle}>{item.title}</Text>
                  </Pressable>
                )}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.id + index.toString()}
              />
              <AppButton
                title={'Apply Settings'}
                onPress={() => {}}
                style={styles.buttonContainer}
              />
              <Pressable
                onPress={() => {
                  setFilter(false);
                  clearSelection();
                }}>
                <Text style={styles.clearFilterStyle}>Clear filters</Text>
              </Pressable>
            </View>
          </RBSheetModal>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <PaymentHeader
        title={'Payment'}
        onPress={() => {
          listRef.current.open();
        }}
        source={appIcons.menuIcon}
        imageStyle={styles.imageStyle}
        setting={true}
        rightIcon={
          state.routes[state.index].name === 'Transactions'
            ? appIcons.filter
            : appIcons.settings
        }
        onPressSettings={() => {
          state.routes[state.index].name === 'Transactions'
            ? setFilter(true)
            : push.navigate('PaymentStack', {screen: 'Settings'});
        }}
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
            marginTop: WP('3'),
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

function PaymentMethodTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarScrollEnabled: true,
      }}
      initialRouteName={'Wallet'}>
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Cards" component={Cards} />
      <Tab.Screen name="Transactions" component={Transactions} />
    </Tab.Navigator>
  );
}

export default PaymentMethodTabs;

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
    tintColor: colors.primary.main,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
