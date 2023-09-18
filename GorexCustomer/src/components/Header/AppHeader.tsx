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
  View,
} from 'react-native';

//**themes */
import {HP, WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

//**vector icon */
import {appIcons} from '../../assets';

//**InterFace Props */
interface Props {
  onPress?: () => void;
  title?: string;
  source?: any;
  imageStyle?: any;
  right?: boolean;
  onPressRight?: () => void;
  profileImage?: any;
  callImage?: any;
  onPressCall?: () => void;
  rightIcon?: any;
  onPressHome?: () => void;
  rightIc?: any;
  cancel?: any;
  onPressCancel?: () => void;
  vehicleModal?: any;
  vehicleNumber?: any;
}

const AppHeader: FC<Props> = ({
  onPress,
  title,
  source,
  imageStyle,
  right,
  onPressRight,
  profileImage,
  callImage,
  onPressCall,
  rightIcon,
  onPressHome,
  rightIc,
  cancel,
  onPressCancel,
  vehicleModal,
  vehicleNumber,
}) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {
          height:
            Platform.OS === 'android' ? HP(13) - statusBarHeight : WP('30'),
          paddingTop: Platform.OS === 'android' ? WP('-10') : WP('13'),
          paddingHorizontal: Platform.OS === 'android' ? WP('7') : 0,
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
        <View style={styles.rightMainContainer}>
          <Pressable
            style={styles.rightContentContainer}
            onPress={onPressRight}>
            <Image
              source={appIcons.myVehiclesBlack}
              style={styles.vehicleImageStyle}
            />
            <Text style={styles.carModalTextStyle}>
              {vehicleModal}
              {'\n'}
              <Text style={styles.carPlateNoTextStyle}>{vehicleNumber}</Text>
            </Text>
            <Image
              source={appIcons.downArrow}
              resizeMode={'contain'}
              style={styles.downArrowStyle}
            />
          </Pressable>
        </View>
      ) : callImage ? (
        <Pressable
          onPress={onPressCall}
          style={[
            styles.callContainerStyle,
            {
              top: Platform.OS === 'ios' ? WP('17') : WP('4'),
            },
          ]}>
          <Image
            source={appIcons.callIcon}
            resizeMode={'contain'}
            style={styles.callImageStyle}
          />
        </Pressable>
      ) : rightIcon ? (
        <Pressable style={styles.homeContainer} onPress={onPressHome}>
          <Image
            source={rightIc ? rightIc : appIcons.homeActive}
            resizeMode={'contain'}
            style={styles.homeIconStyle}
          />
        </Pressable>
      ) : cancel ? (
        <Pressable style={styles.cancelContainer} onPress={onPressCancel}>
          <Image
            source={appIcons.cancel}
            resizeMode={'contain'}
            style={styles.cancelIconStyle}
          />
          <Text style={styles.cancelTextStyle}>Cancel</Text>
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
};

export {AppHeader};

const styles = StyleSheet.create({
  mainContainer: {
    width: WP('100'),
    backgroundColor: colors.background.light,
    borderBottomWidth: 2,
    borderBottomColor: '#0000000D',
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
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
    flex: 0.9,
    alignItems: 'flex-end',
  },
  rightContentContainer: {
    // width: WP('33'),
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

    right: WP('5'),
  },
  callImageStyle: {
    height: 39,
    width: 39,
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
