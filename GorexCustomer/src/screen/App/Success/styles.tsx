import {StyleSheet} from 'react-native';

//** themes */
import {WP} from '../../../infrustructure/theme/responsive';
import {colors} from '../../../infrustructure/theme/colors';
import {fonts} from '../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.light,
    alignItems: 'center',
    justifyContent: 'center',
    padding: WP('1'),
  },
  buttonContainer: {
    paddingHorizontal: WP('3'),
    marginTop: WP('15'),
  },
  imageStyle: {
    width: 258.74,
    height: 160,
    marginBottom: WP('10'),
    marginTop: WP('45'),
  },
  titleTextStyle: {
    fontFamily: fonts.soraBold,
    color: colors.text.main,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 6,
  },
  messageTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: '#B8B9C1',
    textAlign: 'center',
  },
});

export {styles};
