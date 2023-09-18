/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  Image,
  StyleSheet,
  Pressable,
  View,
  Text,
  Platform,
} from 'react-native';
import React, {FC} from 'react';
import {appIcons, appImage} from '../../assets';
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

interface Props {
  onPressBack?: any;
  onPressFav?: any;
  color?: any;
}

const EliteServiceHeader: FC<Props> = ({onPressBack, onPressFav, color}) => {
  return (
    <ImageBackground
      source={appImage.eliteService}
      resizeMode={'cover'}
      style={[
        styles.mainContainer,
        {
          backgroundColor: color === 1 ? '#FFAE00' : 'rgba(0,0,0,0.5)',
          paddingVertical: Platform.OS === 'android' ? WP('6') : WP('14'),
        },
      ]}
      imageStyle={{
        opacity: color === 1 ? 0.1 : 0.5,
      }}>
      <Pressable onPress={onPressBack}>
        <Image
          source={appIcons.backArrow}
          resizeMode={'contain'}
          style={styles.backArrowStyle}
        />
      </Pressable>
      {color === 1 && (
        <View
          style={[
            styles.closedContainer,
            {
              marginTop: Platform.OS === 'android' ? WP('-33') : WP(-13),
            },
          ]}>
          <Image
            source={appIcons.orderHistory}
            resizeMode={'contain'}
            style={{
              height: 16,
              width: 16,
              tintColor: colors.background.light,
            }}
          />
          <Text
            style={{
              fontFamily: fonts.soraSemiBold,
              fontSize: 12,
              color: colors.background.light,
              marginLeft: 5,
            }}>
            Closed
          </Text>
        </View>
      )}
      <Pressable onPress={onPressFav}>
        <Image
          source={appIcons.favInactive}
          resizeMode={'contain'}
          style={styles.favInActiveStyle}
        />
      </Pressable>
    </ImageBackground>
  );
};

export {EliteServiceHeader};

const styles = StyleSheet.create({
  mainContainer: {
    width: WP('100'),
    height: 200,
    justifyContent: 'space-between',

    paddingHorizontal: WP('3.5'),
    flexDirection: 'row',
    shadowOpacity: 0.7,
    shadowColor: '#000000',
  },
  backArrowStyle: {
    width: 12,
    height: 20,
    tintColor: colors.background.light,
  },
  favInActiveStyle: {
    width: 24,
    height: 24,
  },
  closedContainer: {
    maxWidth: '100%',
    padding: WP('2'),
    backgroundColor: colors.text.main,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    flexDirection: 'row',
    marginHorizontal: 6,
  },
});
