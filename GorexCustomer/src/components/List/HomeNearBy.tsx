/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Platform,
  Pressable,
} from 'react-native';

//** assets */
import {appIcons, appImage} from '../../assets';

//** themes */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

//** interface props */
interface Props {
  item?: any;
  onPress: any;
}

const HomeNearBy: FC<Props> = ({item, onPress}) => {
  return (
    <Pressable style={styles.mainContainer} onPress={onPress}>
      <ImageBackground
        source={appImage.bitmap}
        resizeMode={'contain'}
        style={styles.bitMapStyle}>
        <Image
          source={appIcons.favInactive}
          resizeMode={'contain'}
          style={styles.favInactiveStyle}
        />
      </ImageBackground>
      <Text style={styles.autoStyle}>{item?.name}</Text>
      <View style={styles.contentContainer}>
        <Image
          source={appIcons.rating}
          resizeMode={'contain'}
          style={[
            styles.ratingImageStyle,
            {marginTop: Platform.OS === 'android' ? WP(2) : WP(1)},
          ]}
        />
        <Text style={styles.ratingTextStyle}>4.4</Text>
        <Image
          source={appIcons.locationPin}
          resizeMode={'contain'}
          style={[styles.locationImageStyle]}
        />
        <Text style={styles.kiloTextStyle}>0.3 KM</Text>

        <View style={styles.godButtonContainer}>
          <Image
            source={appIcons.godMini}
            resizeMode={'contain'}
            style={[
              styles.godMiniImageStyle,
              {marginTop: Platform.OS === 'android' ? 2 : 0},
            ]}
          />
          <Text style={styles.godTextStyle}>Gorex on Demand</Text>
        </View>
      </View>
    </Pressable>
  );
};

export {HomeNearBy};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 20,
    // overflow: 'hidden',
    backgroundColor: colors.background.light,
    shadowColor: '#0000000D',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderWidth: 0.8,
    borderColor: '#0000000D',
    marginBottom: WP('8'),
    marginHorizontal: WP('1'),
    paddingBottom: WP('3'),
  },
  bitMapStyle: {
    maxWidth: '100%',
    height: 80,
  },
  autoStyle: {
    color: colors.text.main,
    fontFamily: fonts.soraBold,
    fontSize: 16,
    marginTop: WP('5'),
    marginHorizontal: WP('3'),
  },
  contentContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: WP('5'),
  },
  ratingImageStyle: {
    width: 11,
    height: 11,
    marginTop: WP('1'),
  },
  ratingTextStyle: {
    marginTop: WP('1.5'),
    marginLeft: WP('2'),
    color: colors.text.main,
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    textAlign: 'center',
  },
  locationImageStyle: {
    width: 12.37,
    height: 14,
    marginLeft: WP('5'),
    marginTop: WP('2'),
  },
  kiloTextStyle: {
    marginTop: WP('1.8'),
    marginLeft: WP('2'),
    color: colors.text.main,
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    textAlign: 'center',
  },
  godButtonContainer: {
    backgroundColor: '#E9FAF2',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WP(2.5),
    paddingVertical: WP(2.5),
    marginLeft: 10,
    marginTop: 2,
    width: 148,
  },
  godTextStyle: {
    color: colors.primary.main,
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    marginLeft: 5,
    width: '100%',
  },
  godMiniImageStyle: {
    width: 14,
    height: 14,
  },
  favInactiveStyle: {
    width: 15,
    height: 15,
    alignSelf: 'flex-end',
    marginRight: WP('4'),
    marginTop: WP('4'),
  },
});
