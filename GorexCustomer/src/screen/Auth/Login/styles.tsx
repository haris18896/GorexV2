import {StyleSheet} from 'react-native';

//** theme */
import {colors} from '../../../infrustructure/theme/colors';
import {WP} from '../../../infrustructure/theme/responsive';
import {fonts} from '../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    width: WP(100),
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  gardientContainer: {
    height: WP('90'),
  },
  guestStyle: {
    fontFamily: fonts.soraSemiBold,
    color: colors.text.light,
    fontSize: 14,
    marginRight: 1,
  },
  goresLogoStyle: {
    width: WP(40),
    height: WP(40),
    alignSelf: 'center',
  },

  modalContainer: {
    backgroundColor: colors.background.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  listContainer: {
    width: WP('90'),
    padding: WP('2'),
    flexDirection: 'row',
  },
  flagImage: {
    width: WP('8'),
    height: WP('8'),
    borderRadius: WP('8'),
    zIndex: 100,
  },
  titleStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 12,
  },
  numberStyle: {
    textAlign: 'right',
    flex: 1,
    alignSelf: 'center',
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: colors.text.main,
  },
  inputContainer: {
    marginTop: 15,
  },
  forgetStyle: {
    textDecorationLine: 'underline',
    color: colors.text.main,
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    marginLeft: 25,
  },
  footerContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  accountTextStyle: {
    textAlign: 'center',
    fontFamily: fonts.soraRegular,
    fontSize: 14,
    color: colors.text.main,
  },
  signUpTextStyle: {
    color: colors.primary.main,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  modalContentContainer: {
    width: WP('100'),
    padding: WP(5),
  },
  spacer: {
    width: 63,
    height: 6,
    backgroundColor: colors.disabled.light,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cancelIconContainer: {
    width: WP('10'),
    height: WP('10'),
    backgroundColor: colors.disabled.light,
    borderRadius: WP('10'),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectCountryStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    // fontWeight: '700',
  },
});

export {styles};
