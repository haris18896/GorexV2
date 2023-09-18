import React, {FC} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

//** assets */
import {appIcons} from '../../../../assets';

//** theme */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {WP} from '../../../../infrustructure/theme/responsive';
import {colors} from '../../../../infrustructure/theme/colors';

interface Props {
  status: string;
  orderId: string;
  statusBg: string;
  orderDate: string;
  orderTime: string;
  provideName: string;
  statusTextColor: string;
  onPressOrderDetail: () => void;
}

const RequestList: FC<Props> = ({
  status,
  orderId,
  statusBg,
  orderDate,
  orderTime,
  provideName,
  statusTextColor,
  onPressOrderDetail,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.eliteContainer}>
        <Text style={styles.eliteTextStyle}>Elite</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.orderIdTextStyle}>{orderId}</Text>
        <Text style={styles.providerTextStyle}>{provideName}</Text>
        <View style={styles.dateTimeContainer}>
          <Image
            source={appIcons.timeClock}
            resizeMode={'contain'}
            style={styles.timeClockImage}
          />
          <Text style={styles.dateTextStyle}>{orderDate}</Text>
          <Image
            source={appIcons.timeClock}
            resizeMode={'contain'}
            style={styles.clockTimeStyle}
          />
          <Text style={styles.timeTextStyle}>{orderTime}</Text>
        </View>
        <View style={styles.dividerStyle} />
        <View style={styles.orderDetailsContainer}>
          <Pressable
            style={styles.orderDetailsButton}
            onPress={onPressOrderDetail}>
            <Image
              source={appIcons.openEye}
              resizeMode={'contain'}
              style={styles.openEyeImage}
            />
            <Text style={styles.orderDetailsTextStyle}>Order Details</Text>
          </Pressable>
          <Text style={styles.todayTextStyle}>Today 13:43</Text>
        </View>
        <View style={[styles.statusContainer, {backgroundColor: statusBg}]}>
          <Text style={[styles.statusTextStyle, {color: statusTextColor}]}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export {RequestList};

const styles = StyleSheet.create({
  mainContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('4'),
    backgroundColor: colors.background.light,
    padding: WP('3.5'),
    borderRadius: 13,
    marginTop: WP('5'),
    flexDirection: 'row',
  },
  eliteContainer: {
    width: 55,
    height: 55,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4E00',
    marginTop: 5,
  },
  eliteTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.background.light,
  },
  contentContainer: {
    marginHorizontal: WP('4'),
    marginTop: 5,
  },
  orderIdTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 12,
    color: '#B0B3BA',
    textAlign: 'left',
  },
  providerTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
    marginTop: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginVertical: WP('4'),
    alignItems: 'center',
  },
  timeClockImage: {
    width: 14,
    height: 14,
  },
  dateTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: '#B8B9C1',
    marginHorizontal: WP('2'),
  },
  clockTimeStyle: {
    width: 14,
    height: 14,
    marginLeft: WP('4'),
  },
  timeTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: '#B8B9C1',
    marginHorizontal: WP('2'),
  },
  dividerStyle: {
    width: WP('68'),
    height: 1,
    backgroundColor: '#B0B3BA19',
  },
  orderDetailsContainer: {
    flexDirection: 'row',
    marginTop: WP('4'),
    marginBottom: WP('0.8'),
    alignItems: 'center',
    position: 'relative',
  },
  openEyeImage: {
    width: 19,
    height: 14,
    tintColor: colors.primary.main,
  },
  orderDetailsTextStyle: {
    fontSize: 14,
    fontFamily: fonts.soraBold,
    color: colors.primary.main,
    textAlign: 'left',
    marginHorizontal: 8,
  },
  todayTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: '#B8B9C1',
    position: 'absolute',
    right: WP('0.001'),
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 18,
    backgroundColor: '#FFF0D0',
    position: 'absolute',
    right: WP('1'),
    // top: WP('5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 10,
    color: '#FFAE00',
    textTransform: 'uppercase',
  },
  orderDetailsButton: {
    flexDirection: 'row',
  },
});
