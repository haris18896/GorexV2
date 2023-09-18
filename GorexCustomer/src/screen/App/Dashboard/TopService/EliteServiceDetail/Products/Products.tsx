/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';

/** theme */
import {colors} from '../../../../../../infrustructure/theme/colors';
import {WP} from '../../../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../../../infrustructure/theme/fonts';

import {useSelector} from 'react-redux';
import {appImage} from '../../../../../../assets';
import {useNavigation} from '@react-navigation/core';

const Products = () => {
  const navigation = useNavigation();
  const {product, isLoading} = useSelector(
    (state: any) => state?.bookServiceSlice,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      product;
    });
    return unsubscribe;
  }, [navigation]);

  /** render Item */
  const renderItem = (item: any) => (
    <View style={[styles.listMainContainer]}>
      <Text style={styles.title}>{item?.name}</Text>
      <View style={[styles.listContentContainer]}>
        <Image
          source={appImage.motorOilBg}
          resizeMode={'contain'}
          style={[styles.imageStyle]}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={product}
        numColumns={2}
        horizontal={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: Platform.OS === 'android' ? WP('5') : 0,
          // maxWidth: '100%',
        }}
        renderItem={({item}) => renderItem(item)}
        ListEmptyComponent={
          isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: WP('40'),
              }}>
              <ActivityIndicator size={'small'} color={colors.primary.main} />
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 18,
                  color: colors.text.main,
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                Please wait a moment
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginVertical: WP('30'),
              }}>
              <Image
                source={appImage.noData}
                resizeMode={'contain'}
                style={{
                  width: 192,
                  height: 160,
                  marginBottom: WP('4'),
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.soraBold,
                  fontSize: 20,
                  color: colors.text.main,
                  textAlign: 'center',
                }}>
                No data available.
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 16,
                  color: '#B8B9C1',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                There’s nothing to display here yet.
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  listMainContainer: {
    // width: 182,
    height: 110,
    maxHeight: '100%',
    padding: WP('4'),
    backgroundColor: '#00FFBA1A',

    borderRadius: 10,
    marginHorizontal: WP('4'),
    overflow: 'hidden',
    marginTop: WP('5'),
  },
  title: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.text.main,
    overflow: 'visible',
  },
  listContentContainer: {
    width: WP('40'),
    height: WP('35'),
    backgroundColor: '#00FFBA5A',
    borderRadius: WP('50'),
    position: 'absolute',
    left: WP('10'),
    top: WP('7'),
  },
  imageStyle: {
    width: 100,
    marginHorizontal: WP('10'),
    height: WP('23'),
  },
});
