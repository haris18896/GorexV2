/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors} from '../../../../../infrustructure/theme/colors';
import {AppButton, AppHeader, RBSheetModal} from '../../../../../components';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {appIcons, appImage} from '../../../../../assets';
import {HP, WP} from '../../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {WalletModal} from '../../Features/WalletModal';

const WalletWithDraw = () => {
  const navigation = useNavigation();
  const [focus, setFocus] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [identityModal, setIdentityModal] = useState(false);
  const [show, setShow] = useState(true);

  const walletRef = useRef<any>(null);
  const identityRef = useRef<any>(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <AppHeader
        title={'Wallet Withdraw'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Image
            source={appImage.walletWithDraw}
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
            <Text style={styles.buttonTextStyle}>Withdraw</Text>
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
          title={'Select Receiving Card'}>
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
                setFocus(false);
                setTimeout(() => {
                  setIdentityModal(true);
                }, 300);
              }}
            />
          </View>
        </RBSheetModal>

        <RBSheetModal
          refRBSheet={identityRef}
          open={identityModal}
          draggable={false}
          height={HP('35')}
          onClose={() => {
            setIdentityModal(false);
            setFocus(false);
          }}
          title={'Select Receiving Card'}>
          <View style={{flex: 1, backgroundColor: colors.background.main}}>
            <View
              style={[
                styles.inputMainContainer,
                {
                  borderWidth: focus ? 1.5 : 0,
                  borderColor: focus ? colors.primary.main : undefined,
                  marginTop: WP('5'),
                  marginHorizontal: WP('5'),
                },
              ]}>
              <Image
                source={appIcons.password}
                resizeMode={'contain'}
                style={styles.amountImageStyle}
              />
              <View style={styles.inputContentContainer}>
                <Text style={styles.inputTextStyle}>Password</Text>
                <TextInput
                  style={styles.inputContainer}
                  placeholder={'Enter your password'}
                  placeholderTextColor={colors.text.main}
                  onFocus={() => {
                    setFocus(true);
                  }}
                  onBlur={() => {
                    setFocus(false);
                  }}
                  secureTextEntry={show}
                />
              </View>
              <Pressable
                onPress={() => {
                  setShow(!show);
                }}
                style={{
                  position: 'absolute',
                  right: WP('5'),
                  top: WP('7'),
                }}>
                <Image
                  source={appIcons.openEye}
                  resizeMode={'contain'}
                  style={{
                    width: 24,
                    height: 16,
                    tintColor: !show ? colors.primary.main : undefined,
                  }}
                />
              </Pressable>
            </View>
            <AppButton
              title={'Next'}
              onPress={() => {
                setIdentityModal(false);
                setFocus(false);
                navigation.push('Success', {
                  params: {
                    title: 'Withdrawal successful!',
                    message:
                      'Congratulations! Your withdrawal request\nhas been successfully processed.',
                    image: appImage.signUpSuccess,
                    buttonTitle: 'Done',
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

export default WalletWithDraw;

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
    marginTop: WP('23'),
    marginBottom: WP('20'),
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
    marginHorizontal: WP('2'),
    backgroundColor: colors.background.light,
    borderRadius: 16,
    padding: WP('4'),
    flexDirection: 'row',
  },
  amountImageStyle: {
    width: 28,
    height: 28,
    alignSelf: 'center',
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
});
