/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';

//** third party component */
import {AppButton} from '../../../../components';
import {CancelModal} from '../Features/CancelModal';
import {CancelHeader} from '../Features/CancelHeader';

//** assets */
import {appIcons, appImage} from '../../../../assets';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** theme */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';

//** redux */
import {useDispatch, useSelector} from 'react-redux';
import {OrderCancelApi} from '../../../../redux/App/OrderHistoryActions/OrderHistoryActions';

const OrderCancel = ({route}: any) => {
  const orderId = route?.params?.orderId;

  const navigation = useNavigation<any>();

  const [expanded, setExpanded] = useState<any>(false);
  const [cancelModal, setCancelModal] = useState<any>(false);

  const dispatch = useDispatch<any>();
  const {isLoading} = useSelector((state: any) => state?.orderHistorySlice);

  const cancel_list = [
    {
      id: 0,
      title: 'Service provider is far away from me',
    },
    {
      id: 1,
      title: 'Change of plans',
    },
    {
      id: 2,
      title: 'Item/service no longer needed',
    },
    {
      id: 3,
      title: 'I can’t find the address',
    },
    {
      id: 4,
      title: 'Other',
    },
  ];

  const handleCancelOrder = () => {
    try {
      const get_cancel_order_body = {
        cancelation_reason: expanded.title.toLowerCase(),
        order_id: orderId,
      };
      dispatch(
        OrderCancelApi({
          data: get_cancel_order_body,
          callback: (_response: any) => {
            setCancelModal(false);
            navigation.navigate('Success', {
              params: {
                title: 'Your order has been canceled!',
                message: 'We apologize for any inconvenience.',
                image: appImage.cancelOrder,
                buttonTitle: 'Browse Products and Services.',
                route: 'BottomTab',
              },
            });
          },
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <CancelHeader
        title={'Cancel Order'}
        onPress={() => {
          navigation.goBack();
        }}
        right={true}
        onPressRight={() => {
          navigation.navigate('GorexSupportStack');
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
            fontFamily: fonts.soraBold,
            fontSize: 16,
            color: colors.text.main,
            textAlign: 'left',
          }}>
          Please provide a reason for canceling your order.
        </Text>
        <FlatList
          data={cancel_list}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          renderItem={({item, index}) => (
            <Pressable
              key={index}
              style={{
                flexDirection: 'row',
                marginTop: WP('4'),
                alignItems: 'center',
              }}
              onPress={() => {
                setExpanded((prevExpanded: any) =>
                  prevExpanded === item ? null : item,
                );
              }}>
              <Image
                source={
                  expanded.id === item.id
                    ? appIcons.checked
                    : appIcons.unCheckedCircle
                }
                resizeMode={'contain'}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 16,
                  color: colors.text.main,
                  textAlign: 'left',
                  marginHorizontal: WP('3'),
                }}>
                {item.title}
              </Text>
            </Pressable>
          )}
        />
      </View>

      <AppButton
        style={styles.buttonContainer}
        backgroundColor={'#FF2C3C'}
        title={'Confirm'}
        onPress={() => {
          setCancelModal(true);
        }}
      />
      <KeyboardAvoidingView>
        <CancelModal
          isVisible={cancelModal}
          onPressHide={() => {
            setCancelModal(false);
          }}
          onPressCancel={() => {
            setCancelModal(false);
          }}
          onPressCancelOrder={() => {
            handleCancelOrder();
          }}
          loading={isLoading}
          title={'Are you sure?'}
          subTitle={
            'Are you sure you want to cancel this\norder? If you have any concerns or\nneed assistance, please reach out\nto our support team.'
          }
          buttonTitle={'Cancel Order'}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default OrderCancel;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: WP('10'),
    backgroundColor: '#FF2C3C',
  },
});
