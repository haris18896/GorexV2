/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../infrustructure/theme/fonts';
import {appIcons, appImage} from '../../../../assets';
import {AppButton, RBSheetModal} from '../../../../components';

const History = () => {
  const ratingRef = useRef<any>(null);
  const [ratingModal, setRatingModal] = useState(false);

  const data = [
    {id: '1', text: 'Item 1'},
    {id: '2', text: 'Item 2'},
    {id: '3', text: 'Item 3'},
    {id: '4', text: 'Item 3'},
    {id: '5', text: 'Item 3'},
    // Add more items as needed
  ];

  function chunk(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    if (array.length % size !== 0) {
      chunkedArray[chunkedArray.length - 1] =
        chunkedArray[chunkedArray.length - 1].filter(Boolean);
    }
    return chunkedArray;
  }
  const transformedArray = chunk(data, 2);

  const Separator = () => (
    <View
      style={{
        width: 2,
        minHeight: 60,
        backgroundColor: 'red',
        position: 'absolute',
        top: WP('23'),
        bottom: WP('40'),
        marginLeft: WP('13.5') - WP('0.2'),
        zIndex: 10,
        elevation: 100,
      }}
    />
  );

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
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              fontFamily: fonts.soraBold,
              fontSize: 18,
              color: colors.text.main,
            }}>
            GoWash Timeline
          </Text>
          <Text
            style={{
              fontFamily: fonts.soraSemiBold,
              fontSize: 14,
              color: '#B0B3BA',
            }}>
            Track your vehicle’s wash history
          </Text>
        </View>
        <Pressable
          style={{
            position: 'absolute',
            right: WP('0'),
          }}>
          <Image
            source={appIcons.filter}
            resizeMode={'contain'}
            style={{
              width: 24,
              height: 20,
              tintColor: colors.primary.main,
            }}
          />
        </Pressable>
      </View>
      <ScrollView>
        {transformedArray.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                position: 'relative',
              }}>
              {i < data.length && <Separator />}
              {item.map((innerItem, i) => (
                <View
                  key={i}
                  style={{
                    maxWidth: '100%',
                    backgroundColor: colors.primary.main,
                    borderRadius: 16,
                    marginHorizontal: WP('5'),
                    paddingHorizontal: WP('4'),
                    paddingVertical: WP('5'),
                    marginTop: WP('5'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    zIndex: -1,
                    // marginBottom: WP('4'),
                  }}>
                  <Image
                    source={appImage.gowashUpco}
                    resizeMode={'contain'}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                  <View
                    style={{
                      marginHorizontal: WP('4'),
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.soraSemiBold,
                        fontSize: 16,
                        color: colors.background.light,
                      }}>
                      Wash 8
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.soraSemiBold,
                        fontSize: 14,
                        color: colors.background.light,
                      }}>
                      Go Elite
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.soraMedium,
                        fontSize: 12,
                        color: colors.background.light,
                      }}>
                      June 3, 2023
                    </Text>
                  </View>
                  <View
                    style={{
                      maxWidth: '100%',
                      paddingVertical: WP('1.5'),
                      paddingHorizontal: WP('4'),
                      backgroundColor: '#4AD59484',
                      borderRadius: 15,
                      position: 'absolute',
                      right: WP('5'),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.soraSemiBold,
                        fontSize: 12,
                        color: colors.background.light,
                      }}>
                      Upcoming
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      setRatingModal(true);
                    }}
                    style={{
                      position: 'absolute',
                      right: WP('5'),
                      top: WP('18'),
                      bottom: WP('18'),
                      backgroundColor: 'blue',
                    }}>
                    <Image
                      source={appIcons.starInActive}
                      resizeMode={'contain'}
                      style={{
                        height: 18,
                        width: 18,
                        tintColor: 'red',
                      }}
                    />
                  </Pressable>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>
      {/* <FlatList
        data={data}
        renderItem={({item, index}) => (
          <>
            {index !== data.length - 1 && <Separator />}
            <View
              style={{
                maxWidth: '100%',
                backgroundColor: colors.primary.main,
                borderRadius: 16,
                marginHorizontal: WP('5'),
                paddingHorizontal: WP('4'),
                paddingVertical: WP('5'),
                marginTop: WP('5'),
                flexDirection: 'row',
                alignItems: 'center',
                // zIndex: -1,
                marginBottom: WP('4'),
              }}>
              <Image
                source={appImage.gowashUpco}
                resizeMode={'contain'}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
              <View
                style={{
                  marginHorizontal: WP('4'),
                }}>
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                    fontSize: 16,
                    color: colors.background.light,
                  }}>
                  Wash 8
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                    fontSize: 14,
                    color: colors.background.light,
                  }}>
                  Go Elite
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.soraMedium,
                    fontSize: 12,
                    color: colors.background.light,
                  }}>
                  June 3, 2023
                </Text>
              </View>
              <View
                style={{
                  maxWidth: '100%',
                  paddingVertical: WP('1.5'),
                  paddingHorizontal: WP('4'),
                  backgroundColor: '#4AD59484',
                  borderRadius: 15,
                  position: 'absolute',
                  right: WP('5'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                    fontSize: 12,
                    color: colors.background.light,
                  }}>
                  Upcoming
                </Text>
              </View>
            </View>
          </>
        )}
        keyExtractor={item => item.id}
      /> */}
      <KeyboardAvoidingView>
        <RBSheetModal
          refRBSheet={ratingRef}
          open={ratingModal}
          height={HP('43')}
          onClose={() => {
            setRatingModal(false);
          }}
          draggable={false}
          cross={true}
          backgroundColor={'#F2F2F2'}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.background.light,
            }}>
            <Pressable
              onPress={() => {
                setRatingModal(false);
              }}
              style={{
                position: 'absolute',
                top: WP('-5'),
                right: WP('6'),
              }}>
              <Image
                source={appIcons.closeSheet}
                resizeMode={'contain'}
                style={{
                  width: 36,
                  height: 36,
                }}
              />
            </Pressable>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: WP('25'),
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 20,
                  color: colors.text.main,
                }}>
                We value your feedback!
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {data.map((item, index) => (
                  <View key={index}>
                    <Image
                      source={appIcons.starInActive}
                      resizeMode={'contain'}
                      style={{
                        width: 28,
                        height: 28,
                        marginLeft: 6,
                        tintColor: '#FFAE00',
                      }}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
            <AppButton
              title={'Rate Now'}
              onPress={() => {}}
              style={styles.buttonContainer}
            />
          </View>
        </RBSheetModal>
      </KeyboardAvoidingView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 0,
    marginTop: WP('22'),
  },
});
