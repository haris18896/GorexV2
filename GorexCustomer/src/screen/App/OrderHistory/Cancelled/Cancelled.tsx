/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, RefreshControl} from 'react-native';
import React, {useEffect} from 'react';
import {HistoryList} from '../../../../components';
import {colors} from '../../../../infrustructure/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {GetCancelOrderApi} from '../../../../redux/App/OrderHistoryActions/OrderHistoryActions';
import {WP} from '../../../../infrustructure/theme/responsive';

const Cancelled = () => {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state?.authSlice);
  const {cancelled, isLoading} = useSelector(
    (state: any) => state?.orderHistorySlice,
  );

  const getCancelledOrder = () => {
    try {
      const get_pending_order_body = {
        params: {
          model: 'gorex.order',
          method: 'get_order_history',
          args: [[]],
          kwargs: {
            partner_id: user?.data?.profile_id,
            status: 'cancel',
          },
        },
      };

      dispatch(
        GetCancelOrderApi({
          data: get_pending_order_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCancelledOrder();
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
        data={cancelled}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          marginTop: WP('4'),
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getCancelledOrder}
          />
        }
        renderItem={({item}) => (
          <HistoryList
            onPressView={() => {
              navigation.navigate('OrderHistoryStack', {
                screen: 'OrderView',
                params: {orderData: item},
              });
            }}
            status={item?.status}
            item={item}
          />
        )}
      />
    </View>
  );
};

export default Cancelled;
