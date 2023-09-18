/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';

/** themes */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

/** asset */
import {appIcons} from '../../assets';

interface Props {
  onPressRightClick?: () => void;
  onPressLeftClick?: () => void;
  onPressSortBy?: () => void;
  backgroundLeftColor?: any;
  backgroundRightColor?: any;
  horiTintColor?: any;
  verticalTintColor?: any;
  backgroundColor?: any;
}

const TopServiceSort: FC<Props> = ({
  onPressRightClick,
  onPressLeftClick,
  backgroundLeftColor,
  backgroundRightColor,
  onPressSortBy,
  horiTintColor,
  verticalTintColor,
  backgroundColor,
}) => {
  return (
    <View style={[styles.mainContainer]}>
      <Pressable
        style={[
          styles.contentContainer,
          {backgroundColor: backgroundColor ? backgroundColor : 'transparent'},
        ]}
        onPress={onPressSortBy}>
        <Image
          source={appIcons.sortBy}
          resizeMode={'contain'}
          style={styles.sortImageStyle}
        />
        <Text style={styles.sortByTextStyle}>Sort by</Text>
        <Image
          source={appIcons.sortArrow}
          resizeMode={'contain'}
          style={styles.dropArrowStyle}
        />
      </Pressable>
      <View style={styles.secondContentContainer}>
        <Pressable
          onPress={onPressLeftClick}
          style={[
            styles.imageContainer,
            {marginHorizontal: WP('3'), backgroundColor: backgroundLeftColor},
          ]}>
          <Image
            source={appIcons.verticalIcon}
            resizeMode={'contain'}
            style={[styles.imageStyle, {tintColor: verticalTintColor}]}
          />
        </Pressable>
        <Pressable
          style={[
            styles.imageContainer,
            {backgroundColor: backgroundRightColor},
          ]}
          onPress={onPressRightClick}>
          <Image
            source={appIcons.horiIcon}
            resizeMode={'contain'}
            style={[styles.imageStyle, {tintColor: horiTintColor}]}
          />
        </Pressable>
      </View>
    </View>
  );
};

export {TopServiceSort};

const styles = StyleSheet.create({
  mainContainer: {
    padding: WP('3'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#B0B3BA19',
  },
  contentContainer: {
    width: WP('30'),
    paddingVertical: WP('1.3'),
    borderWidth: 2,
    borderColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    marginHorizontal: WP('2'),
  },
  sortImageStyle: {
    height: 12,
    width: 18,
    tintColor: colors.primary.main,
    marginRight: WP('2'),
  },
  sortByTextStyle: {
    textAlign: 'center',
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.text.main,
    // marginLeft: WP('1'),
  },
  dropArrowStyle: {
    width: 7.71,
    height: 12.59,
    marginLeft: WP('2'),
    tintColor: colors.primary.main,
  },
  secondContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: WP('2'),
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#E9FAF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 18,
    height: 18,
  },
});
