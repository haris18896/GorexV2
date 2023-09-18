/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';
import {appIcons, appImage} from '../../../../assets';
import {fonts} from '../../../../infrustructure/theme/fonts';

const Products = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        contentContainerStyle={{
          flexGrow: 0.9,
          marginBottom: WP('20'),
          marginTop: WP('5'),
        }}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View
            style={{
              maxWidth: '100%',
              marginHorizontal: WP('4'),
              backgroundColor: colors.background.light,
              borderRadius: 20,
              marginBottom: WP('3'),
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
                width: '53%',
                marginLeft: WP('4'),
                marginVertical: WP('4'),
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 14,
                  color: colors.text.main,
                }}>
                High Mileage Motor Oil
              </Text>
              <View
                style={{
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: fonts.soraBold,
                      fontSize: 12,
                      color: '#FF4E00',
                      textDecorationLine: 'line-through',
                    }}>
                    SAR 195
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.soraBold,
                      fontSize: 16,
                      color: colors.text.main,
                      textDecorationLine: 'none',
                    }}>
                    SAR 135
                  </Text>
                </View>
                <Image
                  source={appIcons.favorites}
                  resizeMode={'contain'}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: colors.primary.main,
                  }}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Products;
