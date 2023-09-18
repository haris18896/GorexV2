import {StyleSheet} from 'react-native';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  imageStyle: {
    width: WP('90'),
    height: WP('38'),
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: WP('5'),
  },
  titleTextStyle: {
    fontFamily: fonts.soraBold,
    color: colors.text.main,
    fontSize: 18,
    marginHorizontal: WP('5'),
    marginVertical: WP('3'),
  },
  subTitleTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: colors.text.main,
    paddingHorizontal: WP('5'),
    textAlign: 'left',
  },
});

export {styles};
