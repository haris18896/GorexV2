import {StyleSheet} from 'react-native';
import {colors} from '../../../infrustructure/theme/colors';
import {WP} from '../../../infrustructure/theme/responsive';
import {fonts} from '../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  contentContainer: {
    width: WP('100'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: WP('5'),
    paddingVertical: 7,
    marginTop: WP('4'),
  },
  offersTextStyle: {
    color: colors.text.main,
    fontFamily: fonts.soraBold,
    fontSize: 18,
    textAlign: 'left',
  },
  viewAllTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: colors.text.main,
    marginBottom: 5,
  },
  spacer: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary.main,
  },
  inputContainer: {
    width: WP('80'),
    marginHorizontal: 16,
    color: colors.text.main,
    fontSize: 14,
    fontFamily: fonts.soraBold,
  },
  listContainer: {
    flexGrow: 0.3,
    paddingHorizontal: WP('2'),
  },
  inputMainContainer: {
    flexDirection: 'row',
  },
  filterImageStyle: {
    width: 23.8,
    height: 19.98,
    alignSelf: 'center',
  },
});

export {styles};
