import React, {FC} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';

//** Theme */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

//** assets */
import {appIcons, appImage} from '../../assets';

//** Interface Props */
interface Props {
  onPress?: () => void;
  name: string;
  price: any;
}

const HomeTopProduct: FC<Props> = ({onPress, name, price}) => {
  return (
    <Pressable style={styles.mainContainer} onPress={onPress}>
      <Image
        source={appImage.motorOil}
        resizeMode={'contain'}
        style={styles.imageStyle}
      />
      <Text style={styles.oilTextStyle}>{name}</Text>
      <View style={styles.contentContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTextStyle}>{price}</Text>
          <Text style={styles.srTextStyle}>SR</Text>

          <Text style={styles.discountTextStyle}>195</Text>
          <Text style={styles.discountSrTextStyle}>SR</Text>
        </View>

        <View style={styles.backArrowContainer}>
          <Image
            source={appIcons.whiteArrow}
            resizeMode={'contain'}
            style={styles.backArrowImage}
          />
        </View>
      </View>
    </Pressable>
  );
};

export {HomeTopProduct};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background.light,
    borderRadius: 20,
    marginHorizontal: 5,
    shadowColor: '#0000000D',
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderWidth: 0.8,
    borderColor: '#0000000D',
    paddingBottom: 15,
    maxWidth: '100%',
  },
  imageStyle: {
    width: 185,
    height: 134,
    borderRadius: 20,
    marginTop: -1,
  },
  oilTextStyle: {
    color: colors.text.main,
    fontSize: 14,
    fontFamily: fonts.soraSemiBold,
    textAlign: 'left',
    marginTop: 17,
    marginLeft: 13,
    width:120,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  priceTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.text.main,
    marginHorizontal: WP(1),
  },
  srTextStyle: {
    fontSize: 8,
    textAlignVertical: 'top',
    marginLeft: 3,
    marginTop: -5,
    fontFamily: fonts.soraSemiBold,
    color: colors.text.main,
  },
  discountTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 10,
    color: '#FF4E00',
    marginLeft: 12,
    textDecorationLine: 'line-through',
    textDecorationColor: '#FF4E00',
  },
  discountSrTextStyle: {
    fontSize: 8,
    textAlignVertical: 'top',
    marginTop: -2,
    marginLeft: 2,
    fontFamily: fonts.soraSemiBold,
    color: '#FF4E00',
    textDecorationLine: 'line-through',
    textDecorationColor: '#FF4E00',
  },
  backArrowContainer: {
    width: 22,
    height: 22,
    backgroundColor: colors.primary.main,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: WP('4'),
  },
  backArrowImage: {
    width: 11,
    height: 11,
    tintColor: colors.background.light,
  },
});
