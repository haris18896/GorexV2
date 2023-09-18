/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors} from '../../../../../infrustructure/theme/colors';
import {
  AppButton,
  AppHeader,
  AppInput,
  RBSheetModal,
} from '../../../../../components';
import {useNavigation} from '@react-navigation/native';
import {appIcons, appImage} from '../../../../../assets';
import {HP, WP} from '../../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {WalletModal} from '../../Features/WalletModal';
//** confirmation code field */
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const WalletTopUp = () => {
  const navigation = useNavigation();
  const [focus, setFocus] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [cvvNumber, setCvvNumber] = useState(false);
  const [value, setValue] = useState('');
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //** useRef */
  const ref = useRef();
  const walletRef = useRef<any>(null);
  const cvvRef = useRef<any>(null);

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'Wallet Top-up'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Image
            source={appImage.walletTopUp}
            resizeMode={'contain'}
            style={styles.walletTopUpImage}
          />
          <View
            style={[
              styles.inputMainContainer,
              {
                borderWidth: focus ? 1.5 : 0,
                borderColor: focus ? colors.primary.main : undefined,
              },
            ]}>
            <Image
              source={appIcons.amount}
              resizeMode={'contain'}
              style={styles.amountImageStyle}
            />
            <View style={styles.inputContentContainer}>
              <Text style={styles.inputTextStyle}>Amount</Text>
              <TextInput
                style={styles.inputContainer}
                keyboardType={'numeric'}
                placeholder={'Enter Amount'}
                placeholderTextColor={colors.text.main}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}
              />
            </View>
          </View>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              setWallet(true);
            }}>
            <Text style={styles.buttonTextStyle}>Next</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView>
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
                    style={[
                      styles.cell,
                      // {
                      //   backgroundColor:
                      //     value.length !== 4
                      //       ? colors.background.main
                      //       : isVerified && value === '1234'
                      //       ? '#E9FAF2'
                      //       : colors.errors.light,
                      // },
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    <Text
                      style={[
                        styles.txtStyle,
                        // {
                        //   color:
                        //     isVerified && value === '1234'
                        //       ? colors.primary.main
                        //       : isVerified && value !== '1234'
                        //       ? colors.errors.main
                        //       : '#000000',
                        // },
                      ]}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
            <AppButton
              title={'Top-up'}
              onPress={() => {
                setCvvNumber(false);
                navigation.push('Success', {
                  params: {
                    title: 'Top-up successful!',
                    message:
                      'Your account has been topped\nup with the specified amount.',
                    image: appImage.signUpSuccess,
                    buttonTitle: 'View Balance',
                    route: 'Payment',
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

export default WalletTopUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  walletTopUpImage: {
    width: 190,
    height: 164,
    marginVertical: WP('28'),
  },
  buttonContainer: {
    width: WP('90'),
    backgroundColor: colors.primary.main,
    borderRadius: 16,
    padding: WP('3'),
    marginTop: WP('6'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.background.light,
    textAlign: 'center',
  },
  inputMainContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('4'),
    backgroundColor: colors.background.light,
    borderRadius: 16,
    padding: WP('4'),
    flexDirection: 'row',
  },
  amountImageStyle: {
    width: 28,
    height: 28,
  },
  inputContentContainer: {
    marginLeft: WP('5'),
  },
  inputTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 12,
    color: '#B0B3BA',
  },
  inputContainer: {
    width: WP('70'),
    marginTop: WP('1'),
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.text.main,
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
