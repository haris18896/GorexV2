/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Pressable,
} from 'react-native';

/** assets */
import {appIcons} from '../../assets';

/** themes */
import {fonts} from '../../infrustructure/theme/fonts';
import {HP, WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';

/** component */
import {
  AppButton,
  AppHeader,
  HomeListModal,
  RBSheetModal,
} from '../../components';

/** screen */
import MyRequestPending from '../../screen/App/GorexOnDemand/MyRequest/MyRequestPending/MyRequestPending';
import MyRequestConfirmed from '../../screen/App/GorexOnDemand/MyRequest/MyRequestConfirmed/MyRequestConfirmed';
import MyRequestCompleted from '../../screen/App/GorexOnDemand/MyRequest/MyRequestCompleted/MyRequestCompleted';
import MyRequestCancelled from '../../screen/App/GorexOnDemand/MyRequest/MyRequestCancelled/MyRequestCancelled';
import MyRequestInProgress from '../../screen/App/GorexOnDemand/MyRequest/MyRequestInProgress/MyRequestInProgress';

/** Top Tab Navigator */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Filter_List} from '../../utils/constant';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation}: any) {
  /**React UseRef Hook */
  const listRef = useRef<any>(null);
  const filterRef = useRef<any>(null);

  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<any>(false);

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
              width: WP('18'),
              height: 2.5,
              backgroundColor: colors.primary.main,
              alignSelf: 'center',
              position: 'absolute',
              bottom: 0,
              top: WP('10'),
              marginTop: 2.0,
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
        title={'My Requests'}
        onPress={() => {
          navigation.goBack();
        }}
        rightIc={appIcons.filter}
        rightIcon={true}
        onPressHome={() => {
          setFilterModal(true);
        }}
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
      <KeyboardAvoidingView>
        <RBSheetModal
          refRBSheet={filterRef}
          open={filterModal}
          height={HP('55')}
          onClose={() => {
            setFilterModal(false);
            setSelectedFilter(false);
          }}
          draggable={true}
          backgroundColor={'#FFFFFF'}>
          <View style={styles.modalMainContainer}>
            <View style={styles.filterContainer}>
              <Image
                source={appIcons.sortBy}
                resizeMode={'contain'}
                style={styles.sortByImage}
              />
              <Text style={styles.filterTextStyle}>Filters</Text>
            </View>
            <FlatList
              data={Filter_List}
              renderItem={({item, index}) => (
                <Pressable
                  style={styles.listMainContainer}
                  onPress={() => {
                    setSelectedFilter((prevExpanded: any) =>
                      prevExpanded === item ? null : item,
                    );
                  }}
                  key={index}>
                  <Image
                    source={
                      selectedFilter?.id === item.id
                        ? appIcons.checked
                        : appIcons.unCheckedCircle
                    }
                    resizeMode={'contain'}
                    style={styles.listIconStyle}
                  />
                  <Text style={styles.listTitleStyle}>{item.title}</Text>
                </Pressable>
              )}
            />
            <AppButton
              title={'Apply Settings'}
              style={styles.buttonContainer}
              onPress={() => {
                setFilterModal(false);
              }}
            />
            <Pressable
              style={styles.clearFilterContainer}
              onPress={() => {
                setSelectedFilter(false);
              }}>
              <Text style={styles.clearFilterTextStyle}>Clear filters</Text>
            </Pressable>
          </View>
        </RBSheetModal>
      </KeyboardAvoidingView>
    </View>
  );
}

function MyRequestTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarScrollEnabled: true,
      }}>
      <Tab.Screen name="Pending" component={MyRequestPending} />
      <Tab.Screen name="Confirmed" component={MyRequestConfirmed} />
      <Tab.Screen name="In Progress" component={MyRequestInProgress} />
      <Tab.Screen name="Completed" component={MyRequestCompleted} />
      <Tab.Screen name="Cancelled" component={MyRequestCancelled} />
    </Tab.Navigator>
  );
}

export default MyRequestTabs;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginTop: WP('1'),
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
    borderBottomWidth: 1.5,
    borderBottomColor: '#B0B3BA19',
  },
  modalMainContainer: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: WP('5'),
    alignItems: 'center',
  },
  sortByImage: {
    width: 18,
    height: 13,
  },
  filterTextStyle: {
    fontSize: 18,
    fontFamily: fonts.soraBold,
    color: colors.text.main,
    marginLeft: WP('2'),
  },
  listMainContainer: {
    flexDirection: 'row',
    marginHorizontal: WP('5'),
    marginTop: WP('5'),
    alignItems: 'center',
  },
  listIconStyle: {
    width: 24,
    height: 24,
  },
  listTitleStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    marginHorizontal: WP('2'),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: WP('20'),
  },
  clearFilterTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
  },
  clearFilterContainer: {
    position: 'absolute',
    bottom: WP('10'),
    alignSelf: 'center',
  },
});
