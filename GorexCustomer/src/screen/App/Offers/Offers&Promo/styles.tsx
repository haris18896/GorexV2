import {StyleSheet} from 'react-native';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  imageContainer: {
    padding: WP('1'),
    alignItems: 'center',
    marginTop: WP('3'),
  },
  backgroundImageStyle: {
    width: WP('90'),
    height: WP('37'),
    borderRadius: 10,
    marginBottom: WP('10'),
  },
  dummyTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: WP('5'),
    marginTop: WP('5'),
  },
  dummyDiscountStyle: {
    fontFamily: fonts.soraRegular,
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: WP('5'),
  },
  imageStyle: {
    width: 24,
    height: 24,
    tintColor: colors.primary.main,
  },
  listContainer: {
    width: WP('90'),
    padding: WP('2'),
    backgroundColor: colors.background.light,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: WP('3.5'),
  },
  listImageStyle: {
    width: 118,
    height: 62,
    borderRadius: 5,
  },
  offerTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: '#000000',
    marginLeft: WP('2'),
    marginTop: WP('2'),
  },
  discountTextStyle: {
    fontFamily: fonts.soraRegular,
    fontSize: 12,
    color: '#B8B9C1',
    marginLeft: WP('2'),
  },
  guestArrowStyle: {
    width: 15,
    height: 15,
    tintColor: colors.text.main,
    alignSelf: 'center',
    marginLeft: WP('2'),
  },
  listContentContainer: {
    flexDirection: 'row',
    width: WP('78'),
  },
});

export {styles};
