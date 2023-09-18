import {StyleSheet} from 'react-native';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  iconStyle: {
    zIndex: 100,
  },
  contentContainer: {
    padding: WP('4'),
    borderTopColor: '#B0B3BA33',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: WP('4'),
  },
  inputContainer: {
    width: WP('79'),
    backgroundColor: 'transparent',
    borderRadius: 10,
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: colors.text.main,
    borderColor: '#B0B3BA33',
    borderWidth: 1,
  },
  attachContainer: {
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: '#E9FAF2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    marginHorizontal: WP('1.5'),
  },
  attachImageStyle: {
    width: 36,
    height: 36,
  },
  listContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('3'),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: WP('4'),
  },
  listContentContainer: {
    width: WP('60'),
    backgroundColor: '#B0B3BA19',
    borderColor: '#B5B7BC33',
    borderWidth: 1,
    padding: WP('3.5'),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginTop: WP('4'),
  },
  messageTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: colors.text.main,
  },
  timeTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 10,
    color: colors.text.main,
    marginHorizontal: WP('3'),
  },
  deliveredTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 10,
    color: colors.text.main,
    marginHorizontal: WP('3'),
  },
});

export default styles;
