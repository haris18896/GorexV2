import {StyleSheet} from 'react-native';
import {HP, WP} from '../../../infrustructure/theme/responsive';
import {fonts} from '../../../infrustructure/theme/fonts';
import {colors} from '../../../infrustructure/theme/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  verifyPhoneStyle: {
    width: 60,
    height: 82,
    marginBottom: 15,
  },
  verificationTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 24,
    color: colors.text.main,
    textAlign: 'center',
    marginBottom: 5,
  },
  enterOtpStyle: {
    fontFamily: fonts.soraSemiBold,
    color: colors.disabled.main,
    fontSize: 16,
    textAlign: 'center',
  },
  phoneNumberTextStyle: {
    color: colors.text.main,
  },
  receiveCodeStyle: {
    fontFamily: fonts.soraSemiBold,
    color: colors.disabled.main,
    fontSize: 16,
    textAlign: 'center',
  },
  resendCodeTextStyle: {
    color: colors.primary.main,
    textDecorationLine: 'underline',
  },
  otpInputBox: {},
  cell: {
    backgroundColor: colors.background.main,
    height: 58,
    width: 58,
    margin: HP('1'),
    alignItems: 'center',
    borderRadius: 58,
    marginVertical: HP('1'),
    justifyContent: 'center',
    marginTop: WP('7'),
    marginBottom: WP('5'),
  },
  txtStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 24,
    width: '70%',
    textAlign: 'center',
    color: 'black',
  },
  inputContainer: {
    marginTop: WP('15'),
    width: WP('100'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
