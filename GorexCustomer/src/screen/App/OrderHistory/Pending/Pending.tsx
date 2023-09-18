/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
//** assets */
import {appImage} from '../../../../assets';

//** component */
import {HistoryList} from '../../../../components';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** assets */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';

//** redux */
import {useDispatch, useSelector} from 'react-redux';
import {GetPendingOrderApi} from '../../../../redux/App/OrderHistoryActions/OrderHistoryActions';

const Pending = () => {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state?.authSlice);
  const {pending, isLoading} = useSelector(
    (state: any) => state?.orderHistorySlice,
  );

  const getPendingOrder = () => {
    try {
      const get_pending_order_body = {
        params: {
          model: 'gorex.order',
          method: 'get_order_history',
          args: [[]],
          kwargs: {partner_id: user?.data?.profile_id, status: 'order_placed'},
        },
      };

      dispatch(
        GetPendingOrderApi({
          data: get_pending_order_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPendingOrder();
    });
    return unsubscribe;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <FlatList
        data={pending}
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: WP('4'),
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getPendingOrder} />
        }
        renderItem={({item}) => (
          <HistoryList
            onPressView={() => {
              navigation.navigate('OrderHistoryStack', {
                screen: 'OrderView',
                params: {
                  orderData: item,
                },
              });
            }}
            status={item?.status}
            item={item}
          />
        )}
        ListEmptyComponent={
          isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: WP('80'),
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
                marginVertical: WP('65'),
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

export default Pending;
