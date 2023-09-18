import React, {FC} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {WP} from '../../infrustructure/theme/responsive';
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';
import {appIcons} from '../../assets';

interface Props {
  onPress?: any;
  name: string;
  rating: number;
  distance: number | string;
}

const EliteAutoService: FC<Props> = ({onPress, name, rating, distance}) => {
  return (
    <Pressable style={styles.mainContainer} onPress={onPress}>
      <View style={styles.leftContainer}>
        <Text style={styles.eliteTextStyle}>Elite</Text>
      </View>

      <View style={styles.contentMainContainer}>
        <Text style={styles.autoServiceTextStyle}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Image
            source={appIcons.rating}
            resizeMode={'contain'}
            style={styles.ratingImage}
          />
          <Text style={styles.ratingTextStyle}>{rating}</Text>
          <View style={styles.kmContainer}>
            <Image
              source={appIcons.locationPin}
              resizeMode={'contain'}
              style={styles.locationStyle}
            />
            <Text style={styles.kmTextStyle}>{distance} KM</Text>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.gorexButtonContainer}>
            <Image
              source={appIcons.godMini}
              resizeMode={'contain'}
              style={styles.godMiniStyle}
            />
            <Text style={styles.godTextStyle}>Gorex on Demand</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.favInActiveContainer}>
        <Image
          source={appIcons.favInactive}
          resizeMode={'contain'}
          style={styles.favInActiveStyle}
        />
      </Pressable>
    </Pressable>
  );
};

export {EliteAutoService};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: WP('3'),
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: '#B0B3BA19',
    alignItems: 'center',
    maxWidth: '100%',
    marginTop: WP('2'),
  },
  leftContainer: {
    width: 70,
    height: 70,
    borderRadius: 25,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eliteTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: '#FF4E00',
  },
  contentMainContainer: {
    maxWidth: '100%',
    padding: WP('3'),
  },
  autoServiceTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.text.main,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 3,
    alignItems: 'center',
  },
  ratingImage: {
    width: 10,
    height: 10,
  },
  ratingTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.text.main,
    marginLeft: 5,
  },
  kmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: WP('3'),
  },
  locationStyle: {
    width: 12,
    height: 14,
  },
  kmTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.text.main,
    marginLeft: 5,
  },
  secondContainer: {
    flexDirection: 'row',
    marginTop: 7,
  },
  gorexButtonContainer: {
    padding: WP('1.5'),
    flexDirection: 'row',
    backgroundColor: '#E9FAF2',
    borderRadius: 15,
    alignItems: 'center',
  },
  godMiniStyle: {
    width: 14,
    height: 14,
  },
  godTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.primary.main,
    marginHorizontal: 4,
  },
  favInActiveStyle: {
    width: 24,
    height: 24,
    tintColor: colors.text.main,
  },
  favInActiveContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexGrow: 1,
    flexDirection: 'row',
    marginRight: WP(1),
    marginTop: WP('-10'),
  },
});
