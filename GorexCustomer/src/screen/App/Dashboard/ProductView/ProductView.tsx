/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {
  AppHeader,
  CategoriesModal,
  EliteAutoService,
  HomeTopProduct,
  TopAutoService,
  TopServiceSort,
} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {WP} from '../../../../infrustructure/theme/responsive';
import {appIcons, appImage} from '../../../../assets';
import {fonts} from '../../../../infrustructure/theme/fonts';
import {
  GetAllProductsApi,
  GetTopProductsApi,
} from '../../../../redux/App/HomeActions/homeAction';
import {useDispatch, useSelector} from 'react-redux';

const ProductView = () => {
  const navigation = useNavigation();
  //** useRef */
  const categoriesRef = useRef<any>(null);
  //** state */
  const [horizontalView, setHorizontalView] = useState(true);
  const [verticalView, setVerticalView] = useState(false);

  const handlePressHorizontal = () => {
    setHorizontalView(true);
    setVerticalView(false);
  };

  const handlePressVertical = () => {
    setHorizontalView(false);
    setVerticalView(true);
  };

  //** getTopServices */
  const getAllProducts = () => {
    try {
      const get_all_offers_body = {
        params: {
          model: 'product.template',
          method: 'get_all_products',
          args: [[]],
          kwargs: {},
        },
      };

      dispatch(
        GetAllProductsApi({
          data: get_all_offers_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    getAllProducts();
  }, [navigation]);

  const all_Products = useSelector(
    (state: any) => state?.homeSlice?.all_Products,
  );
  const dispatch = useDispatch<any>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <AppHeader
        title={'Top Products'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <TopServiceSort
        backgroundColor={colors.background.light}
        onPressLeftClick={() => {
          handlePressHorizontal();
        }}
        onPressRightClick={() => {
          handlePressVertical();
        }}
        onPressSortBy={() => {
          categoriesRef.current.open();
        }}
        backgroundLeftColor={
          horizontalView && !verticalView ? '#E9FAF2' : 'transparent'
        }
        backgroundRightColor={
          verticalView && !horizontalView ? '#E9FAF2' : 'transparent'
        }
        verticalTintColor={
          horizontalView && !verticalView ? colors.primary.main : undefined
        }
        horiTintColor={
          verticalView && !horizontalView ? colors.primary.main : undefined
        }
      />
      {horizontalView ? (
        <FlatList
          data={all_Products?.data}
          horizontal={false}
          numColumns={2}
          key={2}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <HomeTopProduct
              onPress={() => {
                navigation.navigate('ProductDetail', {item: item});
              }}
              name={item?.name}
              price={item?.price}
            />
          )}
          keyExtractor={item => '_' + item.id}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'small'} color={'black'} />
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 14,
                  color: colors.text.main,
                  marginTop: WP('3'),
                }}>
                No Products found
              </Text>
            </View>
          )}
        />
      ) : verticalView ? (
        <FlatList
          data={all_Products?.data}
          horizontal={false}
          numColumns={0}
          key={0}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => {
                navigation.navigate('ProductDetail', {item: item});
              }}
              style={{
                maxWidth: '100%',
                marginHorizontal: WP('5'),
                backgroundColor: colors.background.light,
                borderRadius: 20,
                marginBottom: WP('4'),
                flexDirection: 'row',
              }}>
              <Image
                source={appImage.productsOil}
                resizeMode={'contain'}
                style={{
                  width: 151,
                  height: 123,
                }}
              />
              <View
                style={{
                  marginHorizontal: WP('4'),
                  marginTop: WP('5'),
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.soraSemiBold,
                    color: colors.text.main,
                    textAlign: 'left',
                    width: 120,
                  }}>
                  {item?.name}
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    bottom: WP('4'),
                    width: WP('50'),
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.soraBold,
                      fontSize: 12,
                      color: '#FF4E00',
                      textAlign: 'left',
                      textDecorationLine: 'line-through',
                    }}>
                    SAR 195
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.soraBold,
                      fontSize: 16,
                      color: colors.text.main,
                    }}>
                    SAR {item?.price}
                  </Text>
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.primary.main,
                      borderRadius: 10,
                      position: 'absolute',
                      right: WP('5'),
                      top: WP('2'),
                    }}>
                    <Image
                      source={appIcons.whiteArrow}
                      resizeMode={'contain'}
                      style={{
                        height: 12,
                        width: 12,
                      }}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={item => '#' + item.id}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'small'} color={'black'} />
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 14,
                  color: colors.text.main,
                  marginTop: WP('3'),
                }}>
                No Products found
              </Text>
            </View>
          )}
        />
      ) : null}
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
    </View>
  );
};

export default ProductView;
