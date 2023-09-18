/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  Pressable,
  StyleSheet,
} from 'react-native';

//**themes */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {colors} from '../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../infrustructure/theme/responsive';

//**vector icon */
import {appIcons} from '../../../../assets';
import LinearGradient from 'react-native-linear-gradient';

//**InterFace Props */
interface Props {
  source?: any;
  angle?: any;
  height?: any;
  setting?: any;
  title?: string;
  rightIcon?: any;
  imageStyle?: any;
  angleCenter?: any;
  subtitle?: string;
  description?: string;
  onPress?: () => void;
  onPressSettings?: () => void;
}

const SubscriptionsHeader: FC<Props> = ({
  title,
  angle,
  source,
  height,
  onPress,
  setting,
  subtitle,
  rightIcon,
  imageStyle,
  description,
  angleCenter,
  onPressSettings,
}) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <LinearGradient
        colors={['#4AD594', '#000000']}
        start={{x: 0, y: 0.7}}
        end={{x: 0, y: 0.7}}
        angle={angle ? angle : 35}
        useAngle={true}
        angleCenter={angleCenter ? angleCenter : {x: 1, y: 1.88}}
        locations={[0.7, 0.7]}
        style={[
          styles.mainContainer,
          {
            height: height
              ? height
              : Platform.OS === 'android'
              ? HP(13) - statusBarHeight
              : WP('51'),
          },
        ]}>
        <Pressable onPress={onPress}>
          <Image
            source={source ? source : appIcons.backArrow}
            resizeMode={'contain'}
            style={[styles.imageStyle, imageStyle]}
          />
        </Pressable>
        <Text style={styles.titleStyle}>{title}</Text>
        <View
          style={{
            position: 'absolute',
            top: WP('30'),
            maxWidth: '100%',
            marginHorizontal: WP('4'),
          }}>
          {subtitle && (
            <Text
              style={{
                fontFamily: fonts.soraBold,
                fontSize: 22,
                color: colors.background.light,
              }}>
              {subtitle}
            </Text>
          )}
          {description && (
            <Text
              style={{
                fontFamily: fonts.soraMedium,
                fontSize: 16,
                color: colors.background.light,
              }}>
              {description}
            </Text>
          )}
        </View>
        {setting && (
          <Pressable
            onPress={onPressSettings}
            style={styles.callContainerStyle}>
            <Image
              source={rightIcon}
              resizeMode={'contain'}
              style={styles.callImageStyle}
            />
          </Pressable>
        )}
      </LinearGradient>
    </View>
  );
};

export {SubscriptionsHeader};

const styles = StyleSheet.create({
  mainContainer: {
    width: WP('100'),
    borderBottomWidth: 2,
    borderBottomColor: '#0000000D',
    elevation: 5,
    flexDirection: 'row',
    position: 'relative',
  },
  titleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.background.light,
    marginLeft: 16,
    position: 'absolute',
    left: WP('11'),
    top: WP('16'),
  },
  imageStyle: {
    width: 12,
    height: 20,
    marginLeft: Platform.OS === 'ios' ? WP('5') : 0,
    position: 'absolute',
    left: WP('1'),
    top: WP('16'),
  },
  rightMainContainer: {
    flex: 0.9,
    alignItems: 'flex-end',
  },
  rightContentContainer: {
    maxWidth: '100%',
    borderRadius: 20,
    padding: WP('1'),
    paddingHorizontal: WP('3'),
    borderWidth: 2,
    borderColor: '#F7F8F8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleImageStyle: {
    width: 18,
    height: 14,
  },
  carModalTextStyle: {
    textAlign: 'left',
    fontFamily: fonts.soraBold,
    fontSize: 10,
    color: '#B8B9C1',
    marginLeft: 10,
  },
  carPlateNoTextStyle: {
    color: colors.text.main,
    fontSize: 14,
  },
  downArrowStyle: {
    width: 6,
    height: 8,
    marginLeft: 8,
  },
  profileContainerStyle: {
    width: 46,
    height: 46,
    borderRadius: 46,
    backgroundColor: '#FF4E00',
    borderWidth: 1,
    borderColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: WP('4'),
  },
  profileTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 12,
    color: colors.background.light,
  },
  callContainerStyle: {
    position: 'absolute',
    top: WP('19'),
    right: WP('5'),
  },
  callImageStyle: {
    height: 20,
    width: 20,
    tintColor: colors.primary.main,
  },
  homeContainer: {
    position: 'absolute',
    top: WP('18.5'),
    right: WP('6'),
  },
  homeIconStyle: {
    width: 24,
    height: 24,
    tintColor: colors.primary.main,
  },
  cancelContainer: {
    width: WP('26'),
    paddingHorizontal: WP('2.5'),
    paddingVertical: WP('2'),
    position: 'absolute',
    top: WP('17'),
    right: WP('6'),
    backgroundColor: '#FF2C3C',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
  },
  cancelIconStyle: {
    width: 12.21,
    height: 12.21,
    marginRight: 4,
  },
  cancelTextStyle: {
    color: 'white',
    fontFamily: fonts.soraBold,
    fontSize: 14,
    marginLeft: WP('1'),
  },
});
