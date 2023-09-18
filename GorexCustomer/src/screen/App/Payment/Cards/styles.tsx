import {StyleSheet} from 'react-native';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  contentContainer: {
    maxWidth: '100%',
    backgroundColor: colors.background.light,
    marginHorizontal: WP('5'),
    borderRadius: 16,
    paddingHorizontal: WP('4.5'),
    paddingVertical: WP('5'),
    marginTop: WP('7'),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  cardImageStyle: {
    width: 37,
    height: 24,
  },
  textContainerStyle: {
    marginHorizontal: WP('4'),
    marginTop: -6,
  },
  titleStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 13,
    color: colors.text.main,
    marginTop: WP('1.5'),
    textAlign: 'left',
  },
  expireStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 12,
    color: '#B0B3BA',
    textAlign: 'left',
  },
  optionsContainerStyle: {
    position: 'absolute',
    right: WP('5'),
  },
  optionImageStyle: {
    height: 32,
    width: 32,
  },
  primaryContainerStyle: {
    maxWidth: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 18,
    position: 'absolute',
    bottom: WP('12'),
    paddingHorizontal: WP('2'),
    paddingVertical: WP('1.4'),
    right: WP('5'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 10,
    color: colors.background.light,
    textAlign: 'left',
    marginHorizontal: WP('2'),
    textTransform: 'uppercase',
  },
  primaryImageStyle: {
    width: 9.59,
    height: 7.38,
  },
  buttonContainer: {
    backgroundColor: colors.errors.main,
    marginBottom: 10,
    marginTop: WP('10'),
  },
  title: {
    fontFamily: fonts.soraSemiBold,
    color: colors.text.main,
    fontWeight: 'bold',
    marginTop: WP('-15'),
  },

  description: {
    fontFamily: fonts.soraSemiBold,
    color: colors.text.main,
    fontWeight: 'bold',
    marginTop: WP(1),
    textAlign: 'center',
  },
  paymentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    marginBottom: WP(10),
    position: 'relative',
  },
});

export {styles};
