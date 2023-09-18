/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  Text,
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
} from 'react-native';

//**themes */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {colors} from '../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../infrustructure/theme/responsive';

//**vector icon */
import {appIcons} from '../../../../assets';

//**InterFace Props */
interface Props {
  onPress?: () => void;
  title?: string;
  source?: any;
  imageStyle?: any;
  right?: boolean;
  onPressRight?: () => void;
  profileImage?: any;
}

const CancelHeader: FC<Props> = ({
  onPress,
  title,
  source,
  imageStyle,
  right,
  onPressRight,
  profileImage,
}) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {
          height:
            Platform.OS === 'android' ? HP(13) - statusBarHeight : WP('30'),
        },
      ]}>
      <Pressable onPress={onPress}>
        <Image
          source={source ? source : appIcons.backArrow}
          resizeMode={'contain'}
          style={[styles.imageStyle, imageStyle]}
        />
      </Pressable>
      {profileImage && (
        <Pressable style={styles.profileContainerStyle}>
          <Text style={styles.profileTextStyle}>Elite</Text>
        </Pressable>
      )}
      <Text style={styles.titleStyle}>{title}</Text>
      {right ? (
        <Pressable style={styles.rightMainContainer} onPress={onPressRight}>
          <Text
            style={{
              fontFamily: fonts.soraBold,
              fontSize: 16,
              color: colors.primary.main,
            }}>
            Need Help?
          </Text>
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
};

export {CancelHeader};

const styles = StyleSheet.create({
  mainContainer: {
    width: WP('100'),
    backgroundColor: colors.background.light,
    borderBottomWidth: 2,
    borderBottomColor: '#0000000D',
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    marginLeft: 16,
  },
  imageStyle: {
    width: 12,
    height: 20,
    marginLeft: Platform.OS === 'ios' ? WP('5') : 0,
  },
  rightMainContainer: {
    position: 'absolute',
    top: WP('18.5'),
    right: WP('5'),
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
});
