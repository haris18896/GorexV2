/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {colors} from '../../infrustructure/theme/colors';
import {WP} from '../../infrustructure/theme/responsive';
import {appIcons} from '../../assets';
import {fonts} from '../../infrustructure/theme/fonts';

interface Prop {
  onPressView?: () => void;
  status?: string;
  item: any;
}

const HistoryList: FC<Prop> = ({onPressView, status, item}) => {
  const data = [
    {
      label: 'Payment Method',
      value: item?.payment_method,
    },
    {
      label: 'Order Amount',
      value: 'SAR' + ' ' + item?.amount,
    },
    {
      label: 'Service Provider',
      value: item?.service_provider,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.orderHistoryContainer,
          {
            backgroundColor:
              status === 'order_placed'
                ? '#FFFAEF'
                : status === 'order_accepted'
                ? '#4AD5940F'
                : status === 'in_progress'
                ? '#4AD5940F'
                : status === 'complete'
                ? '#4AD5940F'
                : status === 'cancel'
                ? '#FFF2F3'
                : 'black',
          },
        ]}>
        <Image
          source={appIcons.orderHistory}
          resizeMode={'contain'}
          style={[
            styles.orderHistoryIcon,
            {
              tintColor:
                status === 'order_placed'
                  ? '#FFAE00'
                  : status === 'order_accepted'
                  ? '#17B26A'
                  : status === 'in_progress'
                  ? '#17B26A'
                  : status === 'complete'
                  ? '#17B26A'
                  : status === 'cancel'
                  ? '#FF2C3C'
                  : 'black',
            },
          ]}
        />
      </View>
      <View style={styles.orderDetailContainer}>
        <View>
          <Text style={styles.orderIdStyle}>Order ID</Text>
          <Text style={styles.orderNoStyle}>{item?.sequence_no}</Text>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  status === 'order_placed'
                    ? '#FFFAEF'
                    : status === 'order_accepted'
                    ? '#4AD5940F'
                    : status === 'in_progress'
                    ? '#4AD5940F'
                    : status === 'complete'
                    ? '#4AD5940F'
                    : status === 'cancel'
                    ? '#FFF2F3'
                    : 'black',
              },
            ]}>
            <Text
              style={[
                styles.statusTextStyle,
                {
                  color:
                    status === 'order_placed'
                      ? '#FFAE00'
                      : status === 'order_accepted'
                      ? '#17B26A'
                      : status === 'in_progress'
                      ? '#17B26A'
                      : status === 'complete'
                      ? '#17B26A'
                      : status === 'cancel'
                      ? '#FF2C3C'
                      : 'black',
                },
              ]}>
              {status === 'order_placed'
                ? 'Pending'
                : status === 'order_accepted'
                ? 'Confirmed'
                : status === 'in_progress'
                ? 'in Progress'
                : status === 'complete'
                ? 'completed'
                : status === 'cancel'
                ? 'cancelled'
                : status}
            </Text>
          </View>
          {data.map((obj, i) => (
            <View
              key={i}
              style={[
                styles.listContainer,
                {
                  marginBottom: obj.label === 'Service Provider' ? WP('4') : 0,
                },
              ]}>
              <Text style={styles.labelStyle}>{obj.label}</Text>
              <Text style={styles.valueStyle}>{obj.value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.viewOrderContainer}>
          <Pressable
            style={styles.viewOrderContentContainer}
            onPress={onPressView}>
            <Image
              source={appIcons.openEye}
              resizeMode={'contain'}
              style={styles.eyeImageStyle}
            />
            <Text style={styles.viewOrderTextStyle}>View Order</Text>
          </Pressable>
          {item?.slot !== 'False - False' && (
            <Text style={styles.todayTextStyle}>
              {item?.slot.split('-')[0]}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export {HistoryList};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background.light,
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    paddingHorizontal: WP('5'),
    paddingVertical: WP('4'),
    // marginTop: WP('4'),
    borderRadius: 13,
    flexDirection: 'row',
    marginBottom: WP('5'),
  },
  orderHistoryContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFAEF',
  },
  orderHistoryIcon: {
    width: 19.66,
    height: 19.66,
    tintColor: '#FFAE00',
  },
  orderDetailContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: WP('4'),
  },
  orderIdStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'left',
    marginBottom: WP('1'),
  },
  orderNoStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 15,
    color: colors.text.main,
    textAlign: 'left',
  },
  statusContainer: {
    maxWidth: '100%',
    paddingHorizontal: WP('2'),
    paddingVertical: WP('1.2'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0D0',
    borderRadius: 18,
    position: 'absolute',
    top: WP('1'),
    right: WP('-0.9'),
  },
  statusTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 10,
    color: '#FFAE00',
    textTransform: 'uppercase',
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: WP('64'),
    paddingTop: WP('1.5'),
  },
  labelStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.text.main,
    textAlign: 'left',
  },
  valueStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: '#B0B3BA',
    textAlign: 'right',
  },
  viewOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#B0B3BA19',
    borderTopWidth: 1.5,
    width: WP('63'),
    paddingTop: WP('4'),
  },
  viewOrderContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeImageStyle: {
    width: 18,
    height: 13,
    marginRight: WP('2.5'),
    tintColor: colors.primary.main,
  },
  viewOrderTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.primary.main,
    textAlign: 'left',
  },
  todayTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: '#B8B9C1',
    textAlign: 'right',
  },
});
