/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../infrustructure/theme/fonts';
import {appIcons, appImage} from '../../../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {GetTransactionApi} from '../../../../redux/App/PaymentActions/PaymentActions';
import {showToast} from '../../../../utils/common';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const Transactions = () => {
  const navigation = useNavigation<any>();

  //** redux  */
  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state.authSlice);
  const {transaction_list, isLoading} = useSelector(
    (state: any) => state.paymentSlice,
  );

  const getTransactionList = () => {
    try {
      const get_address_body = {
        params: {
          model: 'res.partner',
          method: 'get_transactions',
          args: [[]],

          kwargs: {
            context: {lang: 'en_US'},
            partner_id: user?.data?.profile_id,
          },
        },
      };

      dispatch(
        GetTransactionApi({
          data: get_address_body,
          callback: (_response: any) => {},
          errorCallback: (err: any) => {
            showToast('Error', err?.data?.message, 'error');
          },
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTransactionList();
    });
    return unsubscribe;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <Text
        style={{
          fontFamily: fonts.soraSemiBold,
          fontSize: 18,
          textAlign: 'left',
          color: colors.text.main,
          marginTop: WP('4'),
          marginHorizontal: WP('5'),
          marginBottom: WP('3'),
        }}>
        Last Transaction
      </Text>
      <FlatList
        data={transaction_list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginBottom: WP('30'),
        }}
        renderItem={({item, index}) => (
          <View
            key={index}
            style={{
              maxWidth: '100%',
              marginHorizontal: WP('4.6'),
              backgroundColor: colors.background.light,
              paddingHorizontal: WP('4'),
              paddingVertical: WP('4'),
              borderRadius: 13,
              marginBottom: WP('3'),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={appIcons.topUp}
              resizeMode={'contain'}
              style={{
                width: 43,
                height: 43,
              }}
            />
            <View
              style={{
                marginHorizontal: WP('3'),
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 14,
                  color: '#B0B3BA',
                  textAlign: 'left',
                }}>
                {item?.type}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 16,
                  textAlign: 'left',
                  color: colors.text.main,
                  marginTop: WP('1'),
                }}>
                {item?.description}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                right: WP('4'),
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 12,
                  textAlign: 'right',
                  color: colors.text.main,
                }}>
                {moment(item?.date).format('HH:mm')}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraBold,
                  fontSize: 16,
                  color: colors.primary.main,
                  marginTop: WP('1'),
                }}>
                SAR {item?.amount}
              </Text>
            </View>
          </View>
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

export default Transactions;
