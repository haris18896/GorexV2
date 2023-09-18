/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors} from '../../../../../infrustructure/theme/colors';
import {
  AppButton,
  AppHeader,
  RBSheetModal,
  YearVehicleModal,
} from '../../../../../components';
import {useNavigation} from '@react-navigation/native';
import {HP, WP} from '../../../../../infrustructure/theme/responsive';
import {Image} from '@rneui/base';
import {appIcons, appImage} from '../../../../../assets';
import {fonts} from '../../../../../infrustructure/theme/fonts';

const AddNewCard = () => {
  const navigation = useNavigation();
  const [focus, setFocus] = useState(false);
  const yearVehicleRef = useRef<any>(null);
  const [yearVehicle, setYearVehicle] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <AppHeader
        title={'Add New Card'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={[1, 2]}
        style={{
          flexGrow: 0,
        }}
        renderItem={() => (
          <View
            style={{
              maxWidth: '100%',
              paddingHorizontal: WP('3'),
              paddingVertical: WP('4'),
              backgroundColor: colors.background.light,
              marginHorizontal: WP('5'),
              borderRadius: 16,
              borderColor: focus ? colors.primary.main : undefined,
              borderWidth: focus ? 1 : 0,
              marginTop: WP('4'),
              flexDirection: 'row',
            }}>
            <Image
              source={appIcons.circleCard}
              resizeMode={'contain'}
              style={{
                width: 28,
                height: 28,
              }}
            />
            <View
              style={{
                marginLeft: WP('2'),
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 12,
                  color: '#B0B3BA',
                  textAlign: 'left',
                }}>
                Credit or Debit Card Number
              </Text>
              <TextInput
                style={{
                  width: WP('70'),
                  marginTop: 4,
                  color: colors.text.main,
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 14,
                }}
                placeholder={'Enter card number'}
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
        )}
      />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() => {
            setYearVehicle(true);
          }}
          style={{
            width: 185,
            paddingHorizontal: WP('3'),
            paddingVertical: WP('4'),
            backgroundColor: colors.background.light,
            marginLeft: WP('4.4'),
            borderRadius: 16,
            marginTop: WP('4'),
            flexDirection: 'row',
          }}>
          <Image
            source={appIcons.date}
            resizeMode={'contain'}
            style={{
              width: 28,
              height: 28,
            }}
          />
          <View
            style={{
              marginLeft: WP('2'),
            }}>
            <Text
              style={{
                fontFamily: fonts.soraMedium,
                fontSize: 12,
                color: '#B0B3BA',
                textAlign: 'left',
              }}>
              Expiry Date
            </Text>
            <Text
              style={{
                fontFamily: fonts.soraSemiBold,
                fontSize: 14,
                color: colors.text.main,
                textAlign: 'left',
                marginTop: 4,
              }}>
              (MM/YY)
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: WP('4'),
              top: WP('6.5'),
            }}>
            <Image
              source={appIcons.openArrows}
              resizeMode={'contain'}
              style={{
                width: 8,
                height: 16,
              }}
            />
          </View>
        </Pressable>
        <View
          style={{
            width: 185,
            paddingHorizontal: WP('3'),
            paddingVertical: WP('4'),
            backgroundColor: colors.background.light,
            marginLeft: WP('4.4'),
            borderRadius: 16,
            borderColor: focus ? colors.primary.main : undefined,
            borderWidth: focus ? 1 : 0,
            marginTop: WP('4'),
            flexDirection: 'row',
          }}>
          <Image
            source={appIcons.cvv}
            resizeMode={'contain'}
            style={{
              width: 28,
              height: 28,
            }}
          />
          <View
            style={{
              marginLeft: WP('2'),
            }}>
            <Text
              style={{
                fontFamily: fonts.soraMedium,
                fontSize: 12,
                color: '#B0B3BA',
                textAlign: 'left',
              }}>
              CVV/CVC
            </Text>
            <TextInput
              style={{
                marginTop: 4,
                color: colors.text.main,
                fontFamily: fonts.soraSemiBold,
                fontSize: 14,
              }}
              placeholder={'XXX'}
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
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: WP('12'),
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Image
          source={appImage.payCards}
          resizeMode={'contain'}
          style={{
            width: 159,
            height: 29,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: WP('4'),
          }}>
          <Image
            source={appIcons.sec}
            resizeMode={'contain'}
            style={{
              width: 29,
              height: 32,
              marginRight: WP('3'),
            }}
          />
          <Text>
            Your payment information is securely processed. We{'\n'}do not store
            personal payment data on our servers.
          </Text>
        </View>
        <AppButton
          title={'Add Card'}
          onPress={() => {
            navigation.push('Success', {
              params: {
                title: 'Card added successfully!',
                message:
                  'Your credit/debit card has been\nadded to your account.',
                image: appImage.signUpSuccess,
                buttonTitle: 'Done',
                route: 'Payment',
              },
            });
          }}
          style={styles.buttonContainer}
        />
      </View>
      <KeyboardAvoidingView>
        <RBSheetModal
          refRBSheet={yearVehicleRef}
          height={HP('50')}
          open={yearVehicle}
          onClose={() => {
            setYearVehicle(false);
          }}
          title={'Select Expiry Date'}>
          <YearVehicleModal
            pickerOpen={yearVehicle}
            onPress={() => {
              setYearVehicle(false);
            }}
          />
        </RBSheetModal>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddNewCard;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: WP('10'),
  },
});
