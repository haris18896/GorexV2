import {StyleSheet} from 'react-native';

//**theme */
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  contentContainer: {
    maxWidth: '100%',
    backgroundColor: colors.background.light,
    padding: WP('3'),
    borderRadius: 13,
    marginTop: WP('5'),
    marginHorizontal: WP('5'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrCodeImage: {
    width: 93,
    height: 93,
  },
  operetarTextStyle: {
    textAlign: 'left',
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.text.main,
    textAlignVertical: 'center',
    marginLeft: WP('3'),
  },
  secondContentContainer: {
    backgroundColor: colors.background.light,
    paddingHorizontal: WP('5'),
    paddingVertical: WP('3'),
    borderRadius: 13,
    marginTop: WP('4'),
    marginHorizontal: WP('5'),
  },
  labelStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.text.main,
    textAlign: 'left',
  },
  valueContainer: {
    maxWidth: '100%',
    backgroundColor: '#FFF0D0',
    borderRadius: 18,
    paddingHorizontal: WP('3'),
    paddingVertical: WP('1'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: WP('2'),
  },
  valueStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#FFAE00',
    textAlign: 'center',
  },
  valueColorStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'right',
    marginBottom: WP('2'),
  },
  bookingContainer: {
    maxWidth: '100%',
    backgroundColor: colors.background.light,
    paddingHorizontal: WP('5'),
    paddingVertical: WP('3'),
    marginHorizontal: WP('5'),
    marginTop: WP('3'),
    borderRadius: 13,
  },
  bookingLabelStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.text.main,
    textAlign: 'left',
    marginBottom: WP('2'),
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTextStyle: {
    textAlign: 'right',
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.primary.main,
    marginRight: WP('2.4'),
  },
  guestArrowStyle: {
    width: 14,
    height: 14,
  },
  bookingValueContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingValueTextStyle: {
    textAlign: 'right',
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: '#B0B3BA',
  },
});

export {styles};
