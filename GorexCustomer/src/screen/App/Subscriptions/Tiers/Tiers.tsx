/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';
import LinearGradient from 'react-native-linear-gradient';
import {appImage} from '../../../../assets';
import {fonts} from '../../../../infrustructure/theme/fonts';

const Tiers = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <FlatList
        data={[1, 2, 3, 4]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <LinearGradient
            colors={['#D8FFD8', '#ffffff']}
            start={{x: 0, y: 0.4}}
            end={{x: 0, y: 0.4}}
            // angle={35}
            useAngle={true}
            angleCenter={{x: 0.8, y: 2}}
            locations={[0.1, 0.4]}
            style={{
              maxHeight: '100%',
              marginHorizontal: WP('5'),
              backgroundColor: colors.background.light,
              paddingHorizontal: WP('3'),
              paddingVertical: WP('5'),
              borderRadius: 13,
              marginTop: WP('5'),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={appImage.goFresh}
              resizeMode={'contain'}
              style={{
                width: 53,
                height: 29,
              }}
            />
            <View
              style={{
                marginLeft: WP('3'),
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 18,
                  color: '#00CA03',
                  textAlign: 'left',
                  marginBottom: WP('1.4'),
                }}>
                Go Fresh
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 12,
                  color: '#00CA03',
                }}>
                1X{' '}
                <Text
                  style={{
                    color: colors.text.main,
                  }}>
                  car wash per month.
                </Text>
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.soraRegular,
                fontSize: 16,
                color: colors.text.main,
                position: 'absolute',
                right: WP('4'),
              }}>
              SAR{' '}
              <Text
                style={{
                  fontFamily: fonts.soraBold,
                }}>
                40
              </Text>
            </Text>
          </LinearGradient>
        )}
      />
    </View>
  );
};

export default Tiers;
