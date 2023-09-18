/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {fonts} from '../../../../infrustructure/theme/fonts';
import {appIcons, appImage} from '../../../../assets';
import {useNavigation} from '@react-navigation/native';
import {HP, WP} from '../../../../infrustructure/theme/responsive';
import {AppButton} from '../../../../components';

const ProductDetail = ({route}: any) => {
  const navigation = useNavigation<any>();
  const statusBarHeight = StatusBar.currentHeight ?? 0;

  const [expanded, setExpanded] = useState(false);

  const item = route?.params?.item;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.light,
      }}>
      <View
        style={[
          styles.headerMainContainer,
          {
            height:
              Platform.OS === 'android' ? HP(13) - statusBarHeight : WP('30'),
          },
        ]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={appIcons.backArrow}
            resizeMode={'contain'}
            style={styles.imageStyle}
          />
        </Pressable>
        <Text style={styles.titleStyle}>{item?.brand}</Text>
        <Pressable
          style={{
            position: 'absolute',
            right: WP('6'),
            top: WP('18'),
          }}
          onPress={() => {}}>
          <Image
            source={appIcons.favInactive}
            resizeMode={'contain'}
            style={styles.favInactiveStyle}
          />
        </Pressable>
      </View>

      <Image
        source={appImage.motorOilBg}
        resizeMode={'cover'}
        style={{
          width: WP('100'),
          height: 283,
        }}
      />
      <View
        style={{
          maxWidth: '100%',
          marginHorizontal: WP('5'),
          marginTop: WP('5'),
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: fonts.soraSemiBold,
            fontSize: 18,
            color: colors.text.main,
          }}>
          {item?.name}
        </Text>
        <View
          style={{
            width: WP('28'),
            marginLeft: WP('12'),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={appIcons.minus}
            resizeMode={'contain'}
            style={{
              width: 36,
              height: 36,
            }}
          />
          <Text
            style={{
              fontFamily: fonts.soraSemiBold,
              fontSize: 18,
              color: colors.primary.main,
            }}>
            1
          </Text>
          <Image
            source={appIcons.plus}
            resizeMode={'contain'}
            style={{
              width: 36,
              height: 36,
            }}
          />
        </View>
      </View>
      <Text
        style={{
          fontFamily: fonts.soraBold,
          fontSize: 26,
          color: colors.text.main,
          marginHorizontal: WP('4.5'),
          marginVertical: WP('1'),
          marginBottom: WP('8'),
        }}>
        SAR {item?.price}
        {'  '}
        <Text
          style={{
            fontFamily: fonts.soraBold,
            fontSize: 16,
            color: '#FF4E00',
            textDecorationLine: 'line-through',
            alignSelf: 'flex-start',
          }}>
          SAR 195
        </Text>
      </Text>
      <Text
        style={{
          fontFamily: fonts.soraSemiBold,
          fontSize: 18,
          color: colors.text.main,
          marginHorizontal: WP('5'),
        }}>
        Select Type
      </Text>
      <View>
        <FlatList
          data={[1, 2, 3, 4]}
          numColumns={2}
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: WP('2'),
          }}
          renderItem={() => (
            <Pressable
              onPress={() => {
                setExpanded(!expanded);
              }}
              style={{
                width: '40%',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: WP('5'),
                marginBottom: WP('3'),
              }}>
              <Image
                source={expanded ? appIcons.checked : appIcons.unCheckedCircle}
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
                  marginHorizontal: WP('2'),
                }}>
                5W-30
              </Text>
            </Pressable>
          )}
        />
      </View>
      <View
        style={{
          maxWidth: '100%',
          marginHorizontal: WP('5'),
          marginTop: WP('10'),
        }}>
        <Text
          style={{
            fontFamily: fonts.soraSemiBold,
            fontSize: 18,
            color: colors.text.main,
            textAlign: 'left',
          }}>
          Product Details
        </Text>
        <Text
          style={{
            fontFamily: fonts.soraMedium,
            fontSize: 14,
            color: '#B0B3BA',
            marginTop: 10,
          }}>
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nulla At
          Augue In Mi Efficitur Interdum At Vitae Tortor. Fusce Mattis, Sapien
          Et Rhoncus Congue, Dolor Felis Tristique Lectus, Vitae Blandit Enim.
        </Text>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footerContentContainer}>
          <Text style={styles.totalTextStyle}>Total</Text>
          <Text style={styles.sarTextStyle}>
            SAR <Text style={styles.footerPriceText}>45.99</Text>
          </Text>
        </View>
        <AppButton
          style={styles.bookedButtonContainer}
          title={'Add to cart'}
          onPress={() => {
            navigation.navigate('MyCartStack');
          }}
        />
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  imageStyle: {
    width: 12,
    height: 20,
    marginLeft: Platform.OS === 'ios' ? WP('5') : 0,
  },
  titleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    marginLeft: 16,
  },
  headerMainContainer: {
    width: WP('100'),
    backgroundColor: colors.background.light,
    borderBottomWidth: 2,
    borderBottomColor: '#0000000D',
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: WP('13'),
    marginBottom: WP('5'),
  },
  favInactiveStyle: {
    width: 25,
    height: 23,
    tintColor: colors.text.main,
  },
  footerContainer: {
    width: WP('100'),
    backgroundColor: colors.background.light,
    padding: WP('3'),
    flexDirection: 'row',
    borderTopColor: '#B8B9C133',
    borderTopWidth: 1,
    paddingTop: WP('15'),
    alignItems: 'center',
    paddingBottom: WP('6'),
    position: 'absolute',
    bottom: WP('1'),
    justifyContent: 'center',
  },
  footerContentContainer: {
    marginTop: WP(-10),
  },
  totalTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: '#B0B3BA',
    textAlign: 'left',
  },
  sarTextStyle: {
    fontFamily: fonts.soraRegular,
    fontSize: 20,
    color: colors.text.main,
    textAlign: 'left',
  },
  footerPriceText: {
    color: colors.primary.main,
    fontFamily: fonts.soraBold,
  },
  bookedButtonContainer: {
    width: WP('45'),
    marginTop: -40,
    marginLeft: WP('15'),
    paddingVertical: WP('4'),
  },
});
