/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

//** styles */
import {styles} from './styles';

//** webView library */
import WebView from 'react-native-webview';

//** toast */
import {showToast} from '../../../../utils/common';

//** redux state */
import {useDispatch, useSelector} from 'react-redux';

//** themes */
import {appIcons, appImage} from '../../../../assets';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** theme */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {colors} from '../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../infrustructure/theme/responsive';

//** constant */
import {Choose_Options_List} from '../../../../utils/constant';

//** components */
import {AppButton, Loader, RBSheetModal} from '../../../../components';

//** api's */
import {
  CreateCreditCardApi,
  GetCreditCardApi,
  deleteCreditCardApi,
} from '../../../../redux/App/PaymentActions/PaymentActions';

const Cards = () => {
  //** use Refs */
  const actionRef = useRef<any>(null);
  const UARWAY_Ref = useRef<any>(null);
  const WEBVIEW_REF = useRef<any>(null);

  //** navigation */
  const navigation = useNavigation<any>();

  //** states */
  const [status, setStatus] = useState('');
  const [cardId, setCardId] = useState('');
  const [action, setAction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [webViewURL, setWebViewURL] = useState('');
  const [uarWayModal, setUarWayModal] = useState(false);

  //** redux  */
  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state.authSlice);
  const {card_list, isLoading} = useSelector(
    (state: any) => state.paymentSlice,
  );

  //** getCreditCard */
  const getCreditCard = () => {
    try {
      const get_address_body = {
        params: {
          model: 'customer.card',
          method: 'search_read',
          args: [[['card_holder', '=', user?.data?.profile_id]]],

          kwargs: {fields: ['id', 'card_holder', 'number']},
        },
      };

      dispatch(
        GetCreditCardApi({
          data: get_address_body,
          callback: (_response: any) => {},
          errorCallback: (err: any) => {
            showToast('Error', err?.data?.message, 'error');
          },
        }),
      );
    } catch (error) {}
  };

  //** addCreditCard */
  const addCreditCard = () => {
    setUarWayModal(true);
    try {
      setWebViewURL('');
      setLoading(true);
      const get_address_body = {
        customer: user?.data?.profile_id,
      };

      dispatch(
        CreateCreditCardApi({
          data: get_address_body,
          callback: (response: any) => {
            setLoading(false);
            setStatus('');
            setWebViewURL(response);
          },
          errorCallback: (err: any) => {
            showToast('Error', err?.data?.message, 'error');
          },
        }),
      );
    } catch (error) {}
  };

  //** handleDeleteCreditCard */
  const handleDeleteCreditCard = () => {
    try {
      const get_address_body = {
        params: {
          model: 'customer.card',
          method: 'unlink',
          args: [[cardId]],
          kwargs: {},
        },
      };

      dispatch(
        deleteCreditCardApi({
          data: get_address_body,
          callback: (_response: any) => {
            console.log('response', _response);
          },
          errorCallback: (err: any) => {
            showToast('Error', err?.data?.message, 'error');
          },
        }),
      );
    } catch (error) {}
  };

  //** showWebView */
  const showWebView = () => {
    return (
      <WebView
        ref={WEBVIEW_REF}
        javaScriptEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
        useWebKit
        startInLoadingState
        scalesPageToFit
        source={{uri: webViewURL}}
        style={{marginTop: 10}}
        onNavigationStateChange={state => {
          if (state?.url?.includes('Result=Failure')) {
            setStatus('failed');
            setLoading(true);
            const responseCode = state.url.match(/ResponseCode=([^&]*)/)[1];
            {
              responseCode &&
                showToast('Error', responseCode[responseCode]?.value, 'error');
            }
          } else if (state?.url?.includes('Result=Success')) {
            if (Platform.OS === 'ios') {
              fetch(state?.url)
                .then(() => {
                  setStatus('success');
                })
                .catch(err => console.log(err));
            } else {
              setStatus('success');
            }
          }
        }}
      />
    );
  };

  //** showFailedImage */
  const showFailedImage = () => {
    return (
      <View style={styles.paymentContainer}>
        <Image
          source={appImage.orangeCardNotSecure}
          style={{
            resizeMode: 'contain',
            width: WP(40),
            marginLeft: WP(2),
          }}
        />
        <Text style={styles.title}>Failed</Text>
        <Text style={styles.description}>
          Your card can not be added at this time.{'\n'}Please try again
        </Text>
      </View>
    );
  };

  //** showSuccessImage */
  const showSuccessImage = () => {
    return (
      <>
        <View style={styles.paymentContainer}>
          <Image
            source={appImage.CardSuccess}
            style={{
              resizeMode: 'contain',
              width: WP(40),
              marginBottom: WP(2),
              marginLeft: WP(2),
            }}
          />
          <Text style={styles.title}>Success</Text>
          <Text style={styles.description}>
            You have successfully added a{'\n'}new credit card.
          </Text>
        </View>
        <AppButton
          title={'Done'}
          onPress={() => {
            setStatus('');
            navigation.goBack();
          }}
          style={{
            marginBottom: WP('10'),
          }}
        />
      </>
    );
  };

  //** uesEffect */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCreditCard();
    });
    return unsubscribe;
  });

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={card_list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 0.2,
        }}
        style={{
          flexGrow: 0.2,
        }}
        renderItem={({item, index}) => (
          <View style={styles.contentContainer} key={index}>
            <Image
              source={appIcons.masterCard}
              resizeMode={'contain'}
              style={styles.cardImageStyle}
            />
            <View style={styles.textContainerStyle}>
              <Text style={styles.titleStyle}>
                Card ending in {item.number.substr(-4)}
              </Text>
              {/* <Text style={styles.expireStyle}>Expires on 12/26</Text> */}
            </View>
            <Pressable
              style={styles.optionsContainerStyle}
              onPress={() => {
                setAction(true);
                setCardId(item?.id);
              }}>
              <Image
                source={appIcons.options}
                resizeMode={'contain'}
                style={styles.optionImageStyle}
              />
            </Pressable>
            <View style={styles.primaryContainerStyle}>
              <Image
                source={appIcons.primary}
                resizeMode={'contain'}
                style={styles.primaryImageStyle}
              />
              <Text style={styles.primaryTextStyle}>PRIMARY</Text>
            </View>
          </View>
        )}
      />
      <Pressable
        onPress={() => {
          // navigation.navigate('AddNewCard');
          setUarWayModal(true);
          addCreditCard();
        }}
        style={{
          maxWidth: '100%',
          marginHorizontal: WP('5'),
          paddingHorizontal: WP('4'),
          paddingVertical: WP('5'),
          borderRadius: 16,
          marginTop: WP('-5'),
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.primary.main,
          borderStyle: 'dashed',
        }}>
        <Image
          source={appIcons.card}
          resizeMode={'contain'}
          style={{
            width: 30,
            height: 24,
            tintColor: colors.primary.main,
          }}
        />
        <Text
          style={{
            color: colors.primary.main,
            fontSize: 16,
            fontFamily: fonts.soraSemiBold,
            textAlign: 'center',
            marginLeft: WP('3'),
          }}>
          +Add New Credit/Debit Card
        </Text>
      </Pressable>

      <KeyboardAvoidingView>
        <RBSheetModal
          refRBSheet={actionRef}
          open={action}
          height={HP('32')}
          onClose={() => {
            setAction(false);
          }}
          title={'Choose Action'}
          draggable={true}>
          <View
            style={{
              marginVertical: WP('5'),
            }}>
            <FlatList
              data={Choose_Options_List}
              renderItem={({item, index}) => (
                <Pressable
                  onPress={() => {
                    setAction(false);
                    if (item.id === 0) {
                      navigation.navigate('PaymentStack', {
                        screen: 'AddNewCard',
                      });
                    }
                  }}
                  key={index}
                  style={{
                    maxWidth: '100%',
                    paddingHorizontal: WP('6'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: WP('5'),
                  }}>
                  <Image
                    source={item.image}
                    resizeMode={'contain'}
                    style={{
                      height: 16,
                      width: 14,
                      tintColor: colors.primary.main,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.soraSemiBold,
                      fontSize: 16,
                      color: colors.text.main,
                      textAlign: 'left',
                      marginHorizontal: WP('2'),
                    }}>
                    {item.title}
                  </Text>
                </Pressable>
              )}
            />
            <AppButton
              title={'Delete Card'}
              onPress={() => {
                handleDeleteCreditCard();
              }}
              style={styles.buttonContainer}
              backgroundColor={colors.errors.main}
            />
          </View>
        </RBSheetModal>

        <RBSheetModal
          refRBSheet={UARWAY_Ref}
          open={uarWayModal}
          height={HP('80')}
          onClose={() => {
            setUarWayModal(false);
            setStatus('');
          }}
          draggable={true}>
          {webViewURL && !loading && status === '' ? (
            showWebView()
          ) : status === 'failed' ? (
            showFailedImage()
          ) : status === 'success' ? (
            showSuccessImage()
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary.main} />
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 16,
                  color: colors.primary.main,
                  marginTop: WP('5'),
                }}>
                Please wait a moment
              </Text>
            </View>
          )}
        </RBSheetModal>
      </KeyboardAvoidingView>
      <Loader visible={isLoading} />
    </View>
  );
};

export default Cards;
