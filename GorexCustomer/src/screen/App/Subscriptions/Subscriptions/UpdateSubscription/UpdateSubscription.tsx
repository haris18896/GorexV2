/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors} from '../../../../../infrustructure/theme/colors';
import {
  AppButton,
  AppHeader,
  Layout,
  RBSheetModal,
} from '../../../../../components';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {HP, WP} from '../../../../../infrustructure/theme/responsive';
import {ActiveSubScription} from '../Features/ActiveSubScription';
import {appIcons} from '../../../../../assets';

const UpdateSubscription = () => {
  const navigation = useNavigation();

  //** use Ref */
  const addressRef = useRef<any>(null);
  const timeSlotRef = useRef<any>(null);

  //** state */
  const [address, setAddress] = useState(false);
  const [timeSlot, setTimeSlot] = useState(false);
  const [selectTimeSlot, setSelectTimeSlot] = useState(false);
  const [onSelectAddress, setOnSelectAddress] = useState(false);

  return (
    <Layout barStyle={'dark-content'}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.main,
        }}>
        <AppHeader
          title={'Update Subscription'}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            maxWidth: '100%',
            marginHorizontal: WP('5'),
            marginTop: WP('4.5'),
          }}>
          <Text
            style={{
              fontFamily: fonts.soraBold,
              fontSize: 18,
              color: colors.text.main,
              textAlign: 'left',
            }}>
            Active Subscription
          </Text>
          <ActiveSubScription
            title={'Go Fresh'}
            value={'1X'}
            detail={'car wash per month.'}
            SARNumber={'40'}
            carDetail={'Toyota ABC 1234'}
            active={true}
            onPressReactive={() => {}}
            buttonTitle={'Upgrade'}
          />

          <Text
            style={{
              fontFamily: fonts.soraBold,
              fontSize: 18,
              color: colors.text.main,
              textAlign: 'left',
              marginTop: WP('8'),
            }}>
            Address
          </Text>
          <View
            style={{
              maxWidth: '100%',
              backgroundColor: colors.background.light,
              paddingHorizontal: WP('4'),
              paddingVertical: WP('4'),
              borderRadius: 13,
              marginTop: WP('3'),
              flexDirection: 'row',
            }}>
            <Image
              source={appIcons.address}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode={'contain'}
            />
            <View
              style={{
                marginLeft: WP('4'),
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 14,
                  color: '#B0B3BA',
                  textAlign: 'left',
                }}>
                Home
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 16,
                  color: colors.text.main,
                  marginTop: WP('0.4'),
                  textAlign: 'left',
                }}>
                Riyadh, Saudi Arabia
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 12,
                  color: '#B0B3BA',
                  marginTop: WP('0.4'),
                  textAlign: 'left',
                }}>
                Al Imam Saud Ibn Abdul Aziz Branch Rd, Al{'\n'}Mohammadiyyah,
                Riyadh 12363, Saudi{'\n'}Arabia.
              </Text>
            </View>
            <Pressable
              onPress={() => {
                setAddress(true);
              }}>
              <Image
                source={appIcons.editBlack}
                style={{
                  width: 32,
                  height: 32,
                  right: 6,
                }}
                resizeMode={'contain'}
              />
            </Pressable>
          </View>
          <Text
            style={{
              fontFamily: fonts.soraBold,
              fontSize: 18,
              color: colors.text.main,
              textAlign: 'left',
              marginTop: WP('8'),
            }}>
            Timeslot
          </Text>
          <View
            style={{
              maxWidth: '100%',
              backgroundColor: colors.background.light,
              paddingHorizontal: WP('4'),
              paddingVertical: WP('4'),
              borderRadius: 13,
              marginTop: WP('3'),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                maxWidth: '100%',
                alignItems: 'center',
              }}>
              <Image
                source={appIcons.checked}
                style={{
                  width: 24,
                  height: 24,
                }}
                resizeMode={'contain'}
              />
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 16,
                  color: colors.text.main,
                  marginTop: WP('0.4'),
                  textAlign: 'left',
                  marginLeft: WP('4'),
                  alignItems: 'flex-start',
                }}>
                7:00 - 8:00
              </Text>
            </View>
            <Pressable
              onPress={() => {
                setTimeSlot(true);
              }}>
              <Image
                source={appIcons.editBlack}
                style={{
                  width: 32,
                  height: 32,
                  right: 6,
                }}
                resizeMode={'contain'}
              />
            </Pressable>
          </View>
        </View>

        <AppButton
          title={'Save Changes'}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.buttonContainer}
        />
        <KeyboardAvoidingView>
          <RBSheetModal
            refRBSheet={addressRef}
            height={HP('65')}
            open={address}
            onClose={() => {
              setAddress(false);
            }}
            draggable={false}
            title={'Update Address'}
            backgroundColor={'#F2F2F2'}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                marginBottom: WP('10'),
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.background.main,
                  position: 'relative',
                  alignItems: 'center',
                }}>
                <FlatList
                  data={[1, 2, 3]}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
                  showsVerticalScrollIndicator={false}
                  renderItem={() => (
                    <Pressable
                      onPress={() => {
                        setOnSelectAddress(!onSelectAddress);
                      }}
                      style={{
                        maxWidth: '100%',
                        marginHorizontal: WP('5'),
                        backgroundColor: colors.background.light,
                        paddingHorizontal: WP('4'),
                        paddingVertical: WP('4'),
                        borderRadius: 13,
                        marginTop: WP('3'),
                        flexDirection: 'row',
                        borderWidth: onSelectAddress ? 1 : 0,
                        borderColor: onSelectAddress
                          ? colors.primary.main
                          : colors.background.light,
                      }}>
                      <Image
                        source={appIcons.address}
                        style={{
                          width: 50,
                          height: 50,
                        }}
                        resizeMode={'contain'}
                      />
                      <View
                        style={{
                          marginLeft: WP('4'),
                        }}>
                        <Text
                          style={{
                            fontFamily: fonts.soraMedium,
                            fontSize: 14,
                            color: '#B0B3BA',
                            textAlign: 'left',
                          }}>
                          Home
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.soraSemiBold,
                            fontSize: 16,
                            color: colors.text.main,
                            marginTop: WP('0.4'),
                            textAlign: 'left',
                          }}>
                          Riyadh, Saudi Arabia
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.soraMedium,
                            fontSize: 12,
                            color: '#B0B3BA',
                            marginTop: WP('0.4'),
                            textAlign: 'left',
                          }}>
                          Al Imam Saud Ibn Abdul Aziz Branch Rd, Al{'\n'}
                          Mohammadiyyah, Riyadh 12363, Saudi{'\n'}Arabia.
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => {
                          setAddress(true);
                        }}>
                        <Image
                          source={
                            onSelectAddress
                              ? appIcons.checked
                              : appIcons.unChecked
                          }
                          style={{
                            width: 24,
                            height: 24,
                          }}
                          resizeMode={'contain'}
                        />
                      </Pressable>
                    </Pressable>
                  )}
                />
                <Pressable
                  style={{
                    maxWidth: '100%',
                    marginHorizontal: WP('3'),
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: colors.primary.main,
                    borderStyle: 'dashed',
                    paddingHorizontal: WP('5'),
                    paddingVertical: WP('2.5'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: WP('4'),
                    marginBottom: WP('10'),
                  }}>
                  <Image
                    source={appIcons.address}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    resizeMode={'contain'}
                  />
                  <Pressable
                    onPress={() => {
                      setAddress(false);
                      navigation.navigate('AddAddress');
                    }}
                    style={{
                      width: '80%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.soraSemiBold,
                        fontSize: 16,
                        color: colors.primary.main,
                        alignSelf: 'center',
                      }}>
                      +Add New Address
                    </Text>
                  </Pressable>
                </Pressable>
                <AppButton
                  title={'Select Address'}
                  onPress={() => {}}
                  style={styles.addressButton}
                />
              </View>
            </ScrollView>
          </RBSheetModal>
          <RBSheetModal
            refRBSheet={timeSlotRef}
            height={HP('65')}
            open={timeSlot}
            draggable={false}
            onClose={() => {
              setTimeSlot(false);
            }}
            title={'Update Timeslot'}
            backgroundColor={'#F2F2F2'}>
            <View
              style={{
                flex: 1,
                marginTop: 15,
              }}>
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                numColumns={2}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: 'center',
                  marginHorizontal: WP('2'),
                }}
                renderItem={() => (
                  <Pressable
                    onPress={() => {
                      setSelectTimeSlot(!selectTimeSlot);
                    }}
                    style={{
                      width: WP('45'),
                      backgroundColor: colors.background.light,
                      marginHorizontal: WP('1.5'),
                      padding: WP('3'),
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 16,
                      marginTop: 10,
                      marginBottom: WP('1.5'),
                      borderWidth: selectTimeSlot && 1,
                      borderColor: selectTimeSlot && colors.primary.main,
                    }}>
                    <Image
                      source={
                        selectTimeSlot ? appIcons.checked : appIcons.unChecked
                      }
                      resizeMode={'contain'}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: fonts.soraBold,
                        fontSize: 14,
                        color: colors.text.main,
                        marginHorizontal: WP('5'),
                      }}>
                      08:00 -09:00
                    </Text>
                  </Pressable>
                )}
              />
              <AppButton
                title={'Select Timeslot'}
                style={styles.timeSlotButtonContainer}
                onPress={() => {
                  setTimeSlot(false);
                }}
              />
            </View>
          </RBSheetModal>
        </KeyboardAvoidingView>
      </View>
    </Layout>
  );
};

export default UpdateSubscription;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: WP('9'),
  },
  addressButton: {
    marginTop: 0,
    marginBottom: WP('10'),
  },
  timeSlotButtonContainer: {
    marginBottom: WP('9'),
  },
});
