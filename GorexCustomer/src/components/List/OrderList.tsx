/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {WP} from '../../infrustructure/theme/responsive';
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';
import {appIcons} from '../../assets';

const OrderList = ({list}: any) => {
  const totalPrice = list?.reduce(
    (total: any, service: any) => total + service.price,
    0,
  );

  const data_List = [
    {
      label: 'Subtotal',
      value: 'SAR',
      price: totalPrice,
    },
    {
      label: 'Discount',
      value: 'SAR',
      color: colors.primary.main,
      price: 0,
    },
    {
      label: 'VAT',
      value: 'SAR',
      price: 0,
    },
    {
      label: 'Total Amount',
      value: 'SAR',
      color: colors.primary.main,
      price: totalPrice,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        {data_List.map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: WP('1.5'),
              marginTop: item.label === 'Total Amount' ? WP('3') : 0,
            }}>
            <Text
              style={{
                fontFamily:
                  item.label === 'Total Amount'
                    ? fonts.soraBold
                    : fonts.soraSemiBold,
                fontSize: item.label === 'Total Amount' ? 18 : 16,
                color:
                  item.label === 'Discount' ? item.color : colors.text.main,
              }}>
              {item.label}
            </Text>
            <Text
              style={{
                fontFamily:
                  item.label === 'Total Amount'
                    ? fonts.soraBold
                    : fonts.soraRegular,
                fontSize: item.label === 'Total Amount' ? 18 : 16,
                color: item.color ? item.color : colors.text.main,
              }}>
              {item.value}{' '}
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                }}>
                {item.price}
              </Text>
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.footerContainer}>
        <Image
          source={appIcons.gorexClub}
          resizeMode={'contain'}
          style={styles.gorexClubImageStyle}
        />
        <Text style={styles.placeTextStyle}>
          By placing this order, you{'\n'}will be eligible to earn:
        </Text>
        <Text style={styles.goCoinTextStyle}>70 Go Coins</Text>
      </View>
    </View>
  );
};

export {OrderList};

const styles = StyleSheet.create({
  mainContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    marginVertical: WP('3'),
  },

  contentContainer: {
    maxWidth: '100%',
    backgroundColor: colors.background.light,
    paddingHorizontal: WP('5'),
    paddingVertical: WP('5'),
    borderRadius: 16,
  },
  vehicleImageStyle: {
    width: 21,
    height: 17,
  },
  secondContentContainer: {
    marginHorizontal: WP('4'),
    maxWidth: '100%',
  },
  subTitleStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
    marginBottom: 2,
  },
  titleTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'left',
    width: '100%',
  },
  editContainer: {
    width: WP('19'),
    padding: WP('2'),
    borderRadius: 20,
    backgroundColor: colors.primary.main,
    position: 'absolute',
    top: WP('5'),
    right: WP('5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImageStyle: {
    width: 15,
    height: 15,
    tintColor: colors.primary.main,
  },
  footerContainer: {
    maxWidth: '100%',
    paddingHorizontal: WP('3'),
    paddingVertical: WP('4'),
    backgroundColor: colors.primary.main,
    borderRadius: 16,
    marginTop: WP('3.5'),
    flexDirection: 'row',
  },
  gorexClubImageStyle: {
    width: 32,
    height: 32,
  },
  placeTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 13,
    color: colors.background.light,
    textAlign: 'left',
    marginHorizontal: WP('4'),
  },
  goCoinTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 12,
    color: colors.background.light,
    textAlign: 'right',
    position: 'absolute',
    top: WP('6'),
    right: WP('5'),
  },
});
