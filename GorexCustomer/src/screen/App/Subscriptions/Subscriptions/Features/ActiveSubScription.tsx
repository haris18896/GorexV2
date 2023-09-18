/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';

//** assets */
import {appIcons, appImage} from '../../../../../assets';

//** library  */
import LinearGradient from 'react-native-linear-gradient';

//** theme */
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {WP} from '../../../../../infrustructure/theme/responsive';
import {colors} from '../../../../../infrustructure/theme/colors';

//** Props */
interface Props {
  title: string;
  value: string;
  detail: string;
  color?: boolean;
  active?: boolean;
  SARNumber: string;
  carDetail: string;
  buttonTitle?: string;
  onPressActive?: () => void;
  onPressOption?: () => void;
  onPressReactive?: () => void;
}

const ActiveSubScription: FC<Props> = ({
  title,
  value,
  detail,
  SARNumber,
  carDetail,
  buttonTitle,
  onPressOption,
  onPressActive,
  color = false,
  active = false,
  onPressReactive,
}) => {
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={color ? ['#FFDED5', '#ffffff'] : ['#D8FFD8', '#ffffff']}
        start={{x: 0.5, y: 0.5}}
        end={{x: 0.5, y: 0.5}}
        // angle={35}
        useAngle={true}
        angleCenter={{x: 0.5, y: 0}}
        locations={[0.1, 0.5]}
        style={styles.gradientContainer}>
        <View style={styles.gradientContentContainer}>
          <Image
            source={color ? appImage.goElite : appImage.goFresh}
            resizeMode={'contain'}
            style={styles.goImageStyle}
          />
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.titleTextStyle,
                {color: color ? '#FD6B42' : '#00CA03'},
              ]}>
              {title}
            </Text>
            <Text
              style={[
                styles.valueTextStyle,
                {color: color ? '#FD6B42' : '#00CA03'},
              ]}>
              {value} <Text style={styles.detailTextStyle}>{detail}</Text>
            </Text>
          </View>
          {!active && (
            <Pressable onPress={onPressOption} style={styles.optionContainer}>
              <Image
                source={appIcons.options}
                resizeMode={'contain'}
                style={styles.optionImageStyle}
              />
            </Pressable>
          )}
        </View>
      </LinearGradient>
      <View style={styles.secondContentContainer}>
        <Text style={styles.SARTextStyle}>
          SAR <Text style={styles.SARNumberTextStyle}>{SARNumber}</Text>
          /MO
        </Text>
        <Text style={styles.carDetailStyle}>{carDetail}</Text>
        {active && (
          <Pressable onPress={onPressReactive} style={styles.reactiveContainer}>
            <Text style={styles.reactiveTextStyle}>
              {buttonTitle ? buttonTitle : 'Reactivate'}
            </Text>
          </Pressable>
        )}
      </View>
      {!active && (
        <View style={styles.dayContainer}>
          <View style={styles.dayContentContainer}>
            <Text style={styles.daysStyle}>12</Text>
          </View>
          <Text style={styles.dayLeftStyle}>Days left</Text>
          <Text style={styles.billingStyle}>
            Next Billing{'\n'}June 1, 2023
          </Text>
          <Pressable onPress={onPressActive} style={styles.activeContainer}>
            <Text style={styles.activeTextStyle}>Active</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export {ActiveSubScription};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: WP('2.9'),
    borderRadius: 13,
    maxWidth: '100%',
    backgroundColor: colors.background.light,
    overflow: 'hidden',
  },
  gradientContainer: {
    width: WP('90%'),
    padding: WP('3'),
  },
  gradientContentContainer: {
    width: '100%',
    paddingHorizontal: WP('1'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  goImageStyle: {
    width: 53,
    height: 29,
  },
  titleContainer: {
    marginHorizontal: WP('3'),
  },
  titleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 22,
    textAlign: 'left',
  },
  valueTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,

    textAlign: 'left',
  },
  detailTextStyle: {
    color: colors.text.main,
  },
  optionContainer: {
    position: 'absolute',
    right: WP('2'),
    top: 5,
  },
  optionImageStyle: {
    width: 32,
    height: 32,
  },
  secondContentContainer: {
    paddingHorizontal: WP('4'),
    paddingVertical: WP('4'),
  },
  SARTextStyle: {
    fontFamily: fonts.soraRegular,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
  },
  SARNumberTextStyle: {
    fontFamily: fonts.soraBold,
  },
  carDetailStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: colors.text.main,
    textAlign: 'left',
  },
  reactiveContainer: {
    maxWidth: '100%',
    paddingVertical: WP('2.5'),
    paddingHorizontal: WP('6.5'),
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.primary.main,
    marginLeft: WP('4'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: WP('4'),
    top: WP('4'),
    backgroundColor: colors.primary.main,
    marginBottom: 3,
  },
  reactiveTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.background.light,
  },
  dayContainer: {
    maxWidth: '100%',
    paddingHorizontal: WP('4'),
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: WP('4'),
  },
  dayContentContainer: {
    width: 37,
    height: 37,
    borderRadius: 37,
    borderColor: colors.background.main,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#FD6B42',
    borderTopColor: '#FD6B42',
    borderRightWidth: 2,
  },
  daysStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 10,
    color: colors.text.main,
    textAlign: 'center',
  },
  dayLeftStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.text.main,
    textAlign: 'left',
    marginLeft: WP('5'),
  },
  billingStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 12,
    color: colors.text.main,
    textAlign: 'left',
    marginLeft: WP('10'),
  },
  activeContainer: {
    maxWidth: '100%',
    paddingVertical: WP('1'),
    paddingHorizontal: WP('7'),
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: colors.primary.main,
    marginLeft: WP('4'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.primary.main,
  },
});
