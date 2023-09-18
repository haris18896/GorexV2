/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';

//** third party component */
import {AppHeader} from '../../../../components';

//** assets */
import {appIcons, appImage} from '../../../../assets';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** theme */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {WP} from '../../../../infrustructure/theme/responsive';
import {colors} from '../../../../infrustructure/theme/colors';

const OrderListView = ({route}: any) => {
  const navigation = useNavigation<any>();

  const orderList = route.params?.orderList;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#B0B3BA19',
      }}>
      <AppHeader
        title={'Order# ' + orderList?.sequence_no}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          maxWidth: '100%',
          marginHorizontal: WP('5'),
          marginTop: WP('5'),
        }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.soraBold,
            color: colors.text.main,
            textAlign: 'left',
          }}>
          Products
        </Text>
        {orderList?.order_lines?.map((item: any) => (
          <View
            style={{
              maxWidth: '100%',
              backgroundColor: colors.background.light,
              borderRadius: 16,
              padding: WP(2),
              marginVertical: WP('3'),
              flexDirection: 'row',
            }}>
            <Image
              source={appImage.product}
              resizeMode={'contain'}
              style={{
                width: 98,
                height: 125,
              }}
            />
            <View
              style={{
                marginLeft: WP('3'),
                marginTop: WP('3'),
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.soraSemiBold,
                  color: colors.primary.main,
                }}>
                {item.quantity} X{' '}
                <Text
                  style={{
                    color: colors.text.main,
                  }}>
                  {item?.product[1]}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.soraRegular,
                  color: colors.primary.main,
                  position: 'absolute',
                  bottom: WP('3'),
                }}>
                SAR{' '}
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                  }}>
                  {item?.price}
                </Text>
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View
        style={{
          maxWidth: '100%',
          marginHorizontal: WP('5'),
          marginTop: WP('4'),
        }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.soraBold,
            color: colors.text.main,
            textAlign: 'left',
          }}>
          Services
        </Text>
        <FlatList
          data={orderList?.order_lines}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                maxWidth: '100%',
                backgroundColor: colors.background.light,
                borderRadius: 16,
                marginTop: WP('3'),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  paddingLeft: WP('5'),
                  paddingVertical: WP('9'),
                }}>
                <Image
                  source={appIcons.service}
                  resizeMode={'contain'}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: WP('4'),
                  marginTop: WP('6'),
                  marginBottom: WP('3'),
                }}>
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                    fontSize: 16,
                    color: colors.text.main,
                    marginBottom: WP('1'),
                  }}>
                  {item?.product[1]}
                </Text>
                {/* <Text
                  style={{
                    fontFamily: fonts.soraMedium,
                    fontSize: 14,
                    color: '#B0B3BA',
                    marginBottom: WP('1'),
                  }}>
                  Clutch Repair
                </Text> */}
                <Text
                  style={{
                    fontFamily: fonts.soraRegular,
                    fontSize: 16,
                    color: colors.primary.main,
                  }}>
                  SAR{' '}
                  <Text
                    style={{
                      fontFamily: fonts.soraSemiBold,
                    }}>
                    {item?.total_price}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default OrderListView;
