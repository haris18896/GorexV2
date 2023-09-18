/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable handle-callback-err */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';

//**third party component */
import {
  Layout,
  HomeHeader,
  HomeNearBy,
  HomeTopList,
  SearchInput,
  HomeTopProduct,
  HomeTopService,
  CategoriesModal,
  HomeGorexOnDemand,
} from '../../../components';

//** assets */
import {appIcons} from '../../../assets';

//** navigation */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamsList} from '../../../navigation/AppStack/HomeStack';

//** styles */
import {styles} from './styles';

//** redux */
import {useDispatch, useSelector} from 'react-redux';
import {
  GetNearByApi,
  GetTopOffersApi,
  GetTopProductsApi,
  GetTopServiceApi,
} from '../../../redux/App/HomeActions/homeAction';

//** themes */
import {fonts} from '../../../infrustructure/theme/fonts';
import {WP} from '../../../infrustructure/theme/responsive';
import {colors} from '../../../infrustructure/theme/colors';
import {GetProfileApi} from '../../../redux/App/SettingActions/SettingActions';

//**Interface Props */
interface Props {}

const Dashboard: FC<Props> = () => {
  const [filterSearch, setFilterSearch] = useState('');

  //** useRef */
  const categoriesRef = useRef<any>(null);

  //** navigation */
  const navigation = useNavigation<any>();

  //** redux state */
  const top_Service = useSelector(
    (state: any) => state?.homeSlice?.top_Service,
  );
  const top_Products = useSelector(
    (state: any) => state?.homeSlice?.top_Products,
  );
  const {user} = useSelector((state: any) => state.authSlice);
  const {isLoading} = useSelector((state: any) => state?.homeSlice);
  const near_By = useSelector((state: any) => state?.homeSlice?.near_By);
  const top_Offers = useSelector((state: any) => state?.homeSlice?.top_Offers);
  const dispatch = useDispatch<any>();

  //** getAllOffers */
  const getTopOffers = () => {
    try {
      const get_top_offers_body = {
        params: {
          model: 'offer.management',
          method: 'get_top_offers',
          args: [[]],
          kwargs: {},
        },
      };

      dispatch(
        GetTopOffersApi({
          data: get_top_offers_body,
          callback: (response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  //** getTopServices */
  const getTopServices = () => {
    try {
      const get_all_offers_body = {
        params: {
          model: 'product.template',
          method: 'get_top_services',
          args: [[]],
          kwargs: {},
        },
      };

      dispatch(
        GetTopServiceApi({
          data: get_all_offers_body,
          callback: (response: any) => {},
          errorCallback: (err: any) => {},
        }),
      );
    } catch (error) {}
  };

  //** getTopProducts */
  const getTopProducts = () => {
    try {
      const get_all_offers_body = {
        params: {
          model: 'product.template',
          method: 'get_top_products',
          args: [[]],
          kwargs: {},
        },
      };

      dispatch(
        GetTopProductsApi({
          data: get_all_offers_body,
          callback: (response: any) => {},
          errorCallback: (err: any) => {},
        }),
      );
    } catch (error) {}
  };

  //** getNearBy */
  const getNearBy = () => {
    try {
      const get_all_offers_body = {
        params: {
          model: 'res.partner',
          method: 'get_service_provider_by_lat_long',
          args: [[]],
          kwargs: {latitude: 32.5866686, longitude: 74.656556},
        },
      };

      dispatch(
        GetNearByApi({
          data: get_all_offers_body,
          callback: (response: any) => {},
          errorCallback: (err: any) => {},
        }),
      );
    } catch (error) {}
  };

  const getProfile = () => {
    try {
      const get_profile_body = {
        params: {
          model: 'res.partner',
          method: 'search_read',
          args: [[['id', '=', user?.data?.profile_id]]],

          kwargs: {
            context: {lang: 'ar_001'},
            fields: [
              'id',
              'name',
              'first_name',
              'last_name',
              'email',
              'phone',
              'address',
              'gender',
              'driving_license_number',
              'driving_license_expiry',
              'dob',
              'balance',
              'pakage',
              'profile_completed',
              'parent_partner_id',
            ],
          },
        },
      };

      dispatch(
        GetProfileApi({
          data: get_profile_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {
            console.log('errorCallback:', _err);
          },
        }),
      );
    } catch (error) {}
  };

  const handleFreshApi = async () => {
    await getNearBy();
    await getProfile();
    await getTopOffers();
    await getTopServices();
    await getTopProducts();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleFreshApi();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <HomeHeader />
      <Layout
        barStyle={'dark-content'}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleFreshApi} />
        }>
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.offersTextStyle}>Offers & Promos</Text>
            <View>
              <Pressable
                onPress={() => {
                  navigation.navigate('HomeStack', {screen: 'offer'});
                }}>
                <Text style={styles.viewAllTextStyle}>View All</Text>
                <View style={styles.spacer} />
              </Pressable>
            </View>
          </View>
          <FlatList
            data={top_Offers?.data}
            horizontal={true}
            style={styles.listContainer}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 0.3,
              marginHorizontal: WP('3'),
              marginTop: 4,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <HomeTopList
                id={index}
                name={item?.name}
                description={item?.description}
                image={item?.image}
                discount={item?.discount}
                is_consumable={item?.is_consumable}
              />
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  padding: WP(5),
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginHorizontal: WP('18'),
                }}>
                <ActivityIndicator size={'small'} color={'black'} />
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                    fontSize: 14,
                    color: colors.text.main,
                    marginTop: WP('3'),
                  }}>
                  No Offers && Promos found
                </Text>
              </View>
            )}
          />
          <View style={styles.inputMainContainer}>
            <SearchInput
              inputStyle={styles.inputContainer}
              placeholder={'Looking for something?'}
              onChangeText={text => {
                setFilterSearch(text);
              }}
              value={filterSearch}
              onPressClear={() => {
                setFilterSearch('');
              }}
            />
            <TouchableOpacity
              onPress={() => {
                categoriesRef.current.open();
              }}
              style={{
                alignSelf: 'center',
              }}>
              <Image
                source={appIcons.filter}
                style={styles.filterImageStyle}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>

          <Pressable
            onPress={() => {
              navigation.navigate('HomeStack', {screen: 'TopServiceView'});
            }}
            style={[
              styles.contentContainer,
              {
                marginVertical: 15,
              },
            ]}>
            <Text style={styles.offersTextStyle}>Top Services</Text>
            <View>
              <Text style={styles.viewAllTextStyle}>View All</Text>
              <View style={styles.spacer} />
            </View>
          </Pressable>

          <FlatList
            data={top_Service?.data}
            horizontal={true}
            style={{
              flexGrow: 0.01,
              marginHorizontal: 10,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <HomeTopService
                item={item}
                onPress={() => {
                  navigation.navigate('HomeStack', {
                    screen: 'TopServiceDetail',
                  });
                }}
              />
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  padding: WP(5),
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginHorizontal: WP('14'),
                }}>
                <ActivityIndicator size={'small'} color={'black'} />
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                    fontSize: 14,
                    color: colors.text.main,
                    marginTop: WP('3'),
                  }}>
                  No Top Service found
                </Text>
              </View>
            )}
          />

          <View
            style={[
              styles.contentContainer,
              {
                marginVertical: 15,
              },
            ]}>
            <Text style={styles.offersTextStyle}>Top Products</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('HomeStack', {screen: 'ProductView'});
              }}>
              <Text style={styles.viewAllTextStyle}>View All</Text>
              <View style={styles.spacer} />
            </Pressable>
          </View>

          <FlatList
            data={top_Products?.data}
            horizontal={true}
            style={{
              flexGrow: 0.4,
              marginHorizontal: 10,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <HomeTopProduct
                onPress={() => {
                  navigation.navigate('HomeStack', {
                    screen: 'ProductDetail',
                    params: {item: item},
                  });
                }}
                name={item?.name}
                price={item?.price}
              />
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  padding: WP(5),
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginHorizontal: WP('14'),
                }}>
                <ActivityIndicator size={'small'} color={'black'} />
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                    fontSize: 14,
                    color: colors.text.main,
                    marginTop: WP('3'),
                  }}>
                  No Top Products found
                </Text>
              </View>
            )}
          />
          <HomeGorexOnDemand />

          <View style={[styles.contentContainer]}>
            <Text style={styles.offersTextStyle}>Nearby</Text>
            <View>
              <Text style={styles.viewAllTextStyle}>View All</Text>
              <View style={styles.spacer} />
            </View>
          </View>

          <FlatList
            data={near_By?.data}
            horizontal={true}
            style={{
              flexGrow: 0.4,
              marginHorizontal: 16,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <HomeNearBy
                item={item}
                onPress={() => {
                  navigation.navigate('HomeStack', {
                    screen: 'EliteServiceDetail',
                    params: {item: item},
                  });
                }}
              />
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  padding: WP(5),
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginHorizontal: WP('14'),
                }}>
                <ActivityIndicator size={'small'} color={'black'} />
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                    fontSize: 14,
                    color: colors.text.main,
                    marginTop: WP('3'),
                  }}>
                  No Near By found
                </Text>
              </View>
            )}
          />
        </View>
        <KeyboardAvoidingView>
          <CategoriesModal
            categoriesRef={categoriesRef}
            onPressCancel={() => {
              categoriesRef.current.close();
            }}
            onPressApply={() => {
              categoriesRef.current.close();
            }}
            onPressClear={() => {
              categoriesRef.current.close();
            }}
          />
        </KeyboardAvoidingView>
      </Layout>
    </>
  );
};

export default Dashboard;
