/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

//** assets */
import {appIcons, appImage} from '../../assets';

//** theme */
import {colors} from '../../infrustructure/theme/colors';
import {WP} from '../../infrustructure/theme/responsive';
import {fonts} from '../../infrustructure/theme/fonts';

//** interface */
interface Props {
  closed?: boolean;
  onPress?: () => void;
  name: string;
  rating: number;
  distance: number | string;
}

const TopAutoService: FC<Props> = ({
  closed,
  onPress,
  name,
  rating,
  distance,
}) => {
  return (
    <Pressable style={styles.mainContianer} onPress={onPress}>
      <View
        style={{
          overflow: 'hidden',
          width: '100%',
          borderRadius: 20,
        }}>
        <ImageBackground
          source={appImage.bitmap}
          resizeMode={'cover'}
          style={[
            styles.backgroundImageStyle,
            {
              backgroundColor: closed ? '#FFAE00' : 'rgba(0,0,0,0.5)',
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          imageStyle={[
            styles.imageStyle,
            {
              opacity: closed ? 0.1 : 1,
              overflow: 'hidden',
            },
          ]}>
          <Image
            source={appIcons.favInactive}
            resizeMode={'contain'}
            style={styles.favImageStyle}
          />
          {closed && (
            <View style={styles.closeContainerStyle}>
              <Image
                source={appIcons.orderHistory}
                resizeMode={'contain'}
                style={styles.closeImageStyle}
              />
              <Text style={styles.closeTextStyle}>Closed</Text>
            </View>
          )}
        </ImageBackground>
      </View>
      <View style={styles.contentContainerStyle}>
        <View style={styles.eliteContainerStyle}>
          <Text style={styles.elitTextStyle}>Elite</Text>
        </View>
        <View style={styles.serviceContainerStyle}>
          <Text style={styles.serviceTextStyle}>{name}</Text>
          <View style={styles.starContainerStyle}>
            <Image
              source={appIcons.starActive}
              resizeMode={'contain'}
              style={styles.starImageStyle}
            />
            <Text style={styles.starPointStyle}>{rating}</Text>
            <Image
              source={appIcons.locationPin}
              resizeMode={'contain'}
              style={styles.locationPinStyle}
            />
            <Text style={styles.kmStyle}>{distance} KM</Text>
          </View>
          <View style={styles.godContainerStyle}>
            <Image
              source={appIcons.godMini}
              resizeMode={'contain'}
              style={styles.godImageStyle}
            />
            <Text style={styles.godTextStyle}>Gorex on Demand</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export {TopAutoService};

const styles = StyleSheet.create({
  mainContianer: {
    backgroundColor: colors.background.light,
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
    marginTop: WP('4'),
    position: 'relative',
  },
  backgroundImageStyle: {
    width: '100%',
    height: 118,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: 20,
  },
  favImageStyle: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: WP('4'),
    right: WP('3'),
  },
  contentContainerStyle: {
    maxWidth: '100%',
    marginHorizontal: WP('2'),
    padding: WP('3'),
    marginBottom: 3,
    flexDirection: 'row',
  },
  eliteContainerStyle: {
    width: 70,
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F2F2F2',
    borderWidth: 1,
  },
  elitTextStyle: {
    fontFamily: fonts.soraBold,
    color: '#FF4E00',
    fontSize: 20,
  },
  serviceContainerStyle: {
    marginHorizontal: WP('5'),
  },
  serviceTextStyle: {
    fontFamily: fonts.soraBold,
    color: colors.text.main,
    fontSize: 16,
  },
  starContainerStyle: {
    flexDirection: 'row',
    marginTop: WP('1'),
    alignItems: 'center',
  },
  starImageStyle: {
    width: 11,
    height: 11,
    tintColor: '#FFAE00',
  },
  starPointStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 12,
    color: colors.text.main,
    marginHorizontal: WP('1'),
  },
  locationPinStyle: {
    width: 12,
    height: 14,
    marginLeft: WP('2'),
  },
  kmStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 12,
    color: colors.text.main,
    marginHorizontal: WP('1'),
  },
  godContainerStyle: {
    maxWidth: '100%',
    backgroundColor: '#E9FAF2',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: WP('1.5'),
    flexDirection: 'row',
    marginTop: WP('2'),
  },
  godImageStyle: {
    width: 14,
    height: 14,
    marginLeft: WP('1'),
  },
  godTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.primary.main,
    marginHorizontal: WP('1'),
  },
  closeContainerStyle: {
    padding: WP('1.5'),
    maxWidth: '100%',
    flexDirection: 'row',
    backgroundColor: colors.text.main,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeImageStyle: {
    width: 16,
    height: 16,
    tintColor: colors.background.light,
  },
  closeTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 10,
    color: colors.background.light,
    marginHorizontal: WP('1'),
  },
});
