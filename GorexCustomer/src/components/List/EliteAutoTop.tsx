import React, {FC} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

/** themes */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

/** assets */
import {appIcons} from '../../assets';

interface Props {
  name: string;
  distance: number | string;
  rating: number;
  image: any;
}

const EliteAutoTop: FC<Props> = ({name, distance, rating, image}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.eliteTextContainer}>
          <Text style={styles.eliteTextStyle}>Elite</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Image
            source={appIcons.rating}
            resizeMode={'contain'}
            style={styles.ratingImageStyle}
          />
          <Text style={styles.ratingTextStyle}>{rating}</Text>
        </View>
      </View>
      <View style={styles.eliteAutoContainer}>
        <Text style={styles.eliteAutoStyle}>{name}</Text>
        <View style={styles.autoRepairMainContainer}>
          <View style={styles.autoRepairContentContainer}>
            <Image
              source={appIcons.service}
              resizeMode={'contain'}
              style={styles.settingImageStyle}
            />
            <Text style={styles.autoRepairText}>Auto Repair</Text>
          </View>
          <View style={styles.newContainer}>
            <Image
              source={appIcons.newIcon}
              resizeMode={'contain'}
              style={styles.newImageStyle}
            />
            <Text style={styles.newTextStyle}>New</Text>
          </View>
        </View>
        <View style={styles.kmMainContainer}>
          <View style={styles.kmContentContainer}>
            <Image
              source={appIcons.locationPin}
              resizeMode={'contain'}
              style={styles.pinImageStyle}
            />
            <Text style={styles.kmTextStyle}>{distance} KM</Text>
          </View>
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
    </View>
  );
};

export {EliteAutoTop};

const styles = StyleSheet.create({
  mainContainer: {
    width: WP('92'),
    padding: WP('2'),
    backgroundColor: colors.background.light,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    alignSelf: 'center',
    marginTop: WP('-22'),
    elevation: 10,
    flexDirection: 'row',
  },
  contentContainer: {
    width: WP('25'),
    padding: WP('3'),
  },
  gorexButtonContainer: {
    paddingVertical: WP('1.5'),
    paddingHorizontal: WP('2'),
    flexDirection: 'row',
    backgroundColor: '#E9FAF2',
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginHorizontal: WP('2.5'),
  },
  godMiniStyle: {
    width: 14,
    height: 14,
  },
  godTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.primary.main,
    marginLeft: 4,
  },
  eliteTextContainer: {
    width: 80,
    height: 80,
    borderRadius: 30,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eliteTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 22,
    color: '#FF4E00',
  },
  ratingContainer: {
    width: WP('13'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 5,
    borderRadius: 13,
    alignSelf: 'center',
    marginTop: WP('-3.5'),
    marginHorizontal: WP('3'),
  },
  ratingImageStyle: {
    width: 10,
    height: 10,
    marginRight: 3,
  },
  ratingTextStyle: {
    color: colors.background.light,
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    textAlign: 'left',
  },
  eliteAutoContainer: {
    width: WP('60'),
    padding: WP('1'),
  },
  eliteAutoStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
  },
  autoRepairMainContainer: {
    flexDirection: 'row',
  },
  autoRepairContentContainer: {
    maxWidth: '100%',
    paddingVertical: WP('1.3'),
    paddingHorizontal: WP('2'),
    backgroundColor: '#E9FAF2',
    borderRadius: 15,
    marginTop: 4,
    flexDirection: 'row',
  },
  settingImageStyle: {
    width: 14,
    height: 15,
    tintColor: colors.primary.main,
  },
  autoRepairText: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.primary.main,
    marginLeft: 3,
  },
  newContainer: {
    maxWidth: '41%',
    paddingVetical: WP('1.2'),
    paddingHorizontal: WP('2'),
    backgroundColor: '#FF4E000F',
    borderRadius: 15,
    marginTop: 4,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  newImageStyle: {
    width: 15,
    height: 15,
    tintColor: '#FF4E00',
  },
  newTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: '#FF4E00',
    marginLeft: 3,
  },
  kmMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kmContentContainer: {
    maxWidth: '30%',
    padding: WP('1.4'),
    backgroundColor: colors.text.main,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinImageStyle: {
    width: 12,
    height: 14,
    tintColor: colors.background.light,
  },
  kmTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.background.light,
    marginLeft: 3,
  },
});
