/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  FlatList,
  Linking,
} from 'react-native';

//** assets */
import {appIcons, appImage} from '../../../../assets';

//** third party component */
import {AppButton, AppHeader, RBSheetModal} from '../../../../components';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** themes */
import {colors} from '../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../infrustructure/theme/responsive';

import QRCode from 'react-native-qrcode-svg';

//** styles */
import {styles} from './styles';
import moment from 'moment';
import {fonts} from '../../../../infrustructure/theme/fonts';

const OrderView = ({route}: any) => {
  const navigation = useNavigation<any>();

  const orderData = route?.params?.orderData;
  const inputDate = moment(orderData?.date, 'YYYY-MM-DD');

  //** use Ref */
  const navigateRef = useRef<any>(null);

  //** state */
  const [mapSheet, setMapSheet] = useState(false);

  const latLng = `${orderData?.latitude},${orderData?.longitude}`;

  const map_list = [
    {
      id: 0,
      title: 'Navigate using Apple Maps',
      image: appImage.appleMaps,
    },
    {
      id: 0,
      title: 'Navigate using Google Maps',
      image: appImage.googleMaps,
    },
  ];

  const data = [
    {
      label: 'Order ID',
      value: orderData?.sequence_no,
    },
    {
      label: 'Order Status',
      value:
        orderData?.status === 'order_placed'
          ? 'PENDING'
          : orderData?.status === 'order_accepted'
          ? 'CONFIRMED'
          : orderData?.status === 'in_progress'
          ? 'IN PROGRESS'
          : orderData?.status === 'complete'
          ? 'COMPLETED'
          : orderData?.status === 'cancel'
          ? 'CANCELLED'
          : orderData?.status,
    },
    {
      label: 'Payment Method',
      value: orderData?.payment_method,
    },
    {
      label: 'Order Amount',
      value: 'SAR ' + orderData?.amount,
    },
    {
      label: 'Service Provider',
      value: orderData?.service_provider,
    },
    {
      label: 'Vehicle',
      value: orderData?.vehicle[1],
    },
  ];

  const Booking_Data = [
    {
      label: 'Order List',
      value: 'View',
    },
    {
      label: 'Booking',
      value: inputDate.format('MMMM DD') + ', ' + orderData?.slot,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <AppHeader
        title={'Order# ' + orderData?.sequence_no}
        cancel={
          orderData?.status === 'complete' || orderData?.status === 'cancel'
            ? false
            : true
        }
        onPressCancel={() => {
          navigation.navigate('OrderCancel', {orderId: orderData?.id});
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {orderData?.status === 'complete' ||
      orderData?.status === 'cancel' ? null : (
        <View style={styles.contentContainer}>
          <QRCode
            size={100}
            value={`${orderData?.id}`}
            key={`${orderData?.id}`}
          />
          <Text style={styles.operetarTextStyle}>
            Upon arrival, please show this{'\n'}QR code to the operator.
          </Text>
        </View>
      )}

      <View style={styles.secondContentContainer}>
        {data.map(item => (
          <View
            style={{
              maxWidth: '100%',
              borderBottomColor:
                item.label === 'Vehicle' ? 'transparent' : '#B0B3BA19',
              borderBottomWidth: item.label === 'Vehicle' ? 0 : 1.4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: WP('2'),
            }}>
            <Text style={styles.labelStyle}>{item.label}</Text>
            {item.value === 'PENDING' ? (
              <View style={styles.valueContainer}>
                <Text style={styles.valueStyle}>{item.value}</Text>
              </View>
            ) : item?.value === 'CONFIRMED' ||
              item?.value === 'IN PROGRESS' ||
              item?.value === 'COMPLETED' ? (
              <View
                style={[
                  styles.valueContainer,
                  {
                    backgroundColor: '#4AD5940F',
                  },
                ]}>
                <Text
                  style={[
                    styles.valueStyle,
                    {
                      color: colors.primary.main,
                    },
                  ]}>
                  {item.value}
                </Text>
              </View>
            ) : item?.value === 'CANCELLED' ? (
              <View
                style={[
                  styles.valueContainer,
                  {
                    backgroundColor: '#FFF2F3',
                  },
                ]}>
                <Text
                  style={[
                    styles.valueStyle,
                    {
                      color: '#FF2C3C',
                    },
                  ]}>
                  {item.value}
                </Text>
              </View>
            ) : (
              <Text style={styles.valueColorStyle}>{item.value}</Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.bookingContainer}>
        {Booking_Data.map(item => (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomColor:
                item.label === 'Order List' ? '#B0B3BA19' : 'transparent',
              borderBottomWidth: item.label === 'Order List' ? 1 : 0,
              marginTop: WP('2'),
              alignItems: 'center',
            }}>
            <Text style={styles.bookingLabelStyle}>{item.label}</Text>
            {item.value === 'View' ? (
              <Pressable
                style={styles.viewContainer}
                onPress={() => {
                  navigation.navigate('OrderListView', {
                    orderList: orderData,
                  });
                }}>
                <Text style={styles.viewTextStyle}>{item.value}</Text>
                <Image
                  source={appIcons.guestArrow}
                  resizeMode={'contain'}
                  style={styles.guestArrowStyle}
                />
              </Pressable>
            ) : (
              <View style={styles.bookingValueContainerStyle}>
                <Text style={styles.bookingValueTextStyle}>{item.value}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {orderData?.status === 'order_accepted' && (
        <AppButton
          title={'Navigate to Service Provider'}
          onPress={() => {
            setMapSheet(true);
          }}
          style={{
            position: 'absolute',
            bottom: WP('10'),
          }}
        />
      )}

      {(orderData?.status === 'complete' || orderData?.status === 'cancel') && (
        <AppButton
          title={'Order Again?'}
          onPress={() => {
            // navigation.navigate('HomeStack', {screen: 'BookTimeSlot'});
          }}
          style={{
            position: 'absolute',
            bottom: WP('10'),
          }}
        />
      )}

      <KeyboardAvoidingView>
        <RBSheetModal
          refRBSheet={navigateRef}
          open={mapSheet}
          height={HP('35')}
          onClose={() => {
            setMapSheet(false);
          }}
          title={'Please Select Navigation App'}
          draggable={false}
          backgroundColor={'#F2F2F2'}>
          <FlatList
            data={map_list}
            contentContainerStyle={{
              flexGrow: 1,
              marginTop: WP('2'),
            }}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() => {
                  // item.route;
                  setMapSheet(false);
                  item.title === 'Navigate using Apple Maps'
                    ? Linking.openURL(
                        `maps://0,0?q=${orderData?.service_provider}@${latLng}`,
                      )
                    : Linking.openURL(
                        `https://www.google.com/maps/search/?api=1&query=${latLng}`,
                      );
                }}
                key={index}
                style={{
                  maxWidth: '100%',
                  backgroundColor: colors.background.light,
                  marginHorizontal: WP('5'),
                  padding: WP('3.3'),
                  flexDirection: 'row',
                  borderRadius: 10,
                  marginTop: WP('3'),
                  alignItems: 'center',
                  position: 'relative',
                }}>
                <Image
                  source={item.image}
                  resizeMode={'contain'}
                  style={{
                    width: 44,
                    height: 44,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.soraSemiBold,
                    color: colors.text.main,
                    marginHorizontal: WP('3'),
                  }}>
                  {item.title}
                </Text>
                <Image
                  source={appIcons.guestArrow}
                  resizeMode={'contain'}
                  style={{
                    width: 15,
                    height: 15,
                    position: 'absolute',
                    right: WP('5'),
                  }}
                />
              </Pressable>
            )}
          />
        </RBSheetModal>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OrderView;
