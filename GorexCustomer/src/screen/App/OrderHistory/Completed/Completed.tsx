/* eslint-disable react-native/no-inline-styles */
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {HistoryList} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {WP} from '../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../infrustructure/theme/fonts';
import {appImage} from '../../../../assets';
import {GetCompletedOrderApi} from '../../../../redux/App/OrderHistoryActions/OrderHistoryActions';
import {useDispatch, useSelector} from 'react-redux';

const Completed = () => {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state?.authSlice);
  const {completed, isLoading} = useSelector(
    (state: any) => state?.orderHistorySlice,
  );

  const getCompletedOrder = () => {
    try {
      const get_pending_order_body = {
        params: {
          model: 'gorex.order',
          method: 'get_order_history',
          args: [[]],
          kwargs: {
            partner_id: user?.data?.profile_id,
            status: 'complete',
          },
        },
      };

      dispatch(
        GetCompletedOrderApi({
          data: get_pending_order_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCompletedOrder();
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
        data={completed}
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
            onRefresh={getCompletedOrder}
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
            status={'complete'}
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
                marginVertical: WP('40'),
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

export default Completed;
