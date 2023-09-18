/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../infrustructure/theme/fonts';
import {appIcons, appImage} from '../../../../assets';
import {ActiveSubScription} from './Features/ActiveSubScription';
import {AppButton, RBSheetModal} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
//** confirmation code field */
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {WalletModal} from '../../Payment/Features/WalletModal';

const Subscriptions = () => {
  const navigation = useNavigation();

  //** use Ref */
  const ref = useRef();
  const optionRef = useRef<any>(null);
  const walletRef = useRef<any>(null);
  const cvvRef = useRef<any>(null);

  //** state */
  const [option, setOption] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [cvvNumber, setCvvNumber] = useState(false);
  const [value, setValue] = useState('');
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <View
        style={{
          maxWidth: '100%',
          marginHorizontal: WP('5'),
          marginTop: WP('5'),
          flexDirection: 'row',
        }}>
        <View>
          <Text
            style={{
              fontFamily: fonts.soraBold,
              fontSize: 18,
              color: colors.text.main,
              textAlign: 'left',
            }}>
            Active Subscription
          </Text>
          <FlatList
            data={[1]}
            renderItem={() => (
              <ActiveSubScription
                color={true}
                title={'Go Elite'}
                value={'8X'}
                detail={'car washes per month.'}
                SARNumber={'220'}
                carDetail={'Toyota ABC 1234'}
                onPressOption={() => {
                  setOption(true);
                }}
                onPressActive={() => {}}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View
        style={{
          maxWidth: '100%',
          marginHorizontal: WP('5'),
          marginTop: WP('5'),
          flexDirection: 'row',
        }}>
        <View>
          <Text
            style={{
              fontFamily: fonts.soraBold,
              fontSize: 18,
              color: colors.text.main,
              textAlign: 'left',
            }}>
            Inactive Subscriptions
          </Text>
          <FlatList
            data={[1]}
            renderItem={() => (
              <ActiveSubScription
                title={'Go Fresh'}
                value={'1X'}
                detail={'car wash per month.'}
                SARNumber={'40'}
                carDetail={'Toyota ABC 1234'}
                active={true}
                onPressReactive={() => {
                  setWallet(true);
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <KeyboardAvoidingView>
        <RBSheetModal
          refRBSheet={optionRef}
          height={HP('26')}
          open={option}
          onClose={() => {
            setOption(false);
          }}
          title={'Choose Action'}>
          <View
            style={{
              maxWidth: '100%',
              marginHorizontal: WP('5'),
              marginTop: WP('10'),
            }}>
            <Pressable
              onPress={() => {
                setOption(false);
                navigation.navigate('UpdateSubscription');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={appIcons.simpleEdit}
                resizeMode={'contain'}
                style={{
                  width: 15,
                  height: 16,
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 16,
                  color: colors.text.main,
                  marginLeft: WP('2'),
                }}>
                Update Subscription
              </Text>
            </Pressable>
            <AppButton
              title={'Cancel Subscription'}
              style={styles.buttonContainer}
              backgroundColor={'#FF2C3C'}
            />
          </View>
        </RBSheetModal>
        <RBSheetModal
          refRBSheet={walletRef}
          open={wallet}
          draggable={false}
          height={HP('45')}
          onClose={() => {
            setWallet(false);
          }}
          title={'Select Payment Method'}>
          <View style={{flex: 1, backgroundColor: colors.background.main}}>
            <FlatList
              data={[1]}
              renderItem={() => <WalletModal />}
              style={{
                flexGrow: 0,
              }}
            />
            <Pressable
              onPress={() => {
                setWallet(false);
                navigation.navigate('AddNewCard');
              }}
              style={{
                maxWidth: '100%',
                marginHorizontal: WP('5'),
                paddingHorizontal: WP('4'),
                paddingVertical: WP('5'),
                borderRadius: 16,
                marginTop: WP('5'),
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
            <AppButton
              title={'Next'}
              onPress={() => {
                setWallet(false);
                setTimeout(() => {
                  setCvvNumber(true);
                }, 300);
              }}
            />
          </View>
        </RBSheetModal>

        <RBSheetModal
          refRBSheet={cvvRef}
          open={cvvNumber}
          draggable={true}
          height={HP('50')}
          onClose={() => {
            setCvvNumber(false);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.background.light,
              overflow: 'visible',
              marginTop: 10,
            }}>
            <View
              style={{
                marginTop: WP('8'),
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraBold,
                  fontSize: 18,
                  color: colors.text.main,
                  textAlign: 'center',
                  marginBottom: 10,
                }}>
                Enter Cvv Number
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 18,
                  color: '#17151F',
                  textAlign: 'center',
                  marginBottom: 10,
                }}>
                CVV is the 3 digit number shown{'\n'}on the back of your credit
                card.
              </Text>
              <CodeField
                ref={ref}
                {...codeFieldProps}
                value={value}
                onChangeText={(val: any) => {
                  setValue(val);
                }}
                cellCount={3}
                rootStyle={styles.otpInputBox}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                caretHidden={true}
                renderCell={({index, symbol, isFocused}) => (
                  <View
                    key={index}
                    style={[styles.cell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    <Text style={[styles.txtStyle]}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
            <AppButton
              title={'Subscribe'}
              onPress={() => {
                setCvvNumber(false);
                navigation.navigate('Success', {
                  params: {
                    title: 'Subscription confirmed!',
                    message:
                      'Welcome to GO [Tier Name] - Elevate\nyour car wash experience.',
                    image: appImage.signUpSuccess,
                    buttonTitle: 'View Subscriptions',
                    route: 'SubscriptionStack',
                  },
                });
              }}
            />
          </View>
        </RBSheetModal>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: WP('8'),
  },
  otpInputBox: {
    marginHorizontal: WP('20'),
    alignItems: 'center',
  },
  cell: {
    backgroundColor: colors.background.main,
    height: 58,
    width: 58,
    alignItems: 'center',
    borderRadius: 58,
    justifyContent: 'center',
    marginTop: WP('7'),
    marginHorizontal: WP('2'),
  },
  txtStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 24,
    width: '70%',
    textAlign: 'center',
    color: 'black',
  },
});
