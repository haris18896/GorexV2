import {StyleSheet} from 'react-native';
import {colors} from '../../../../../../infrustructure/theme/colors';
import {WP} from '../../../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: colors.background.main,
  },
  contentContainer: {
    width: WP('90'),
    alignSelf: 'center',
    padding: WP('4'),
    backgroundColor: colors.background.light,
    marginVertical: WP('5'),
    borderRadius: 16,
  },
  repairTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 16,
    color: colors.text.main,
    marginBottom: WP('2'),
  },
  secondContentContainer: {
    width: WP('90'),
    alignSelf: 'center',
    padding: WP('4'),
    backgroundColor: colors.background.light,
    marginTop: -5,
    borderRadius: 16,
  },
  thirdContentContainer: {
    width: WP('90'),
    alignSelf: 'center',
    padding: WP('4'),
    backgroundColor: colors.text.main,
    marginTop: 15,
    borderRadius: 16,
  },
  paintTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 16,
    color: colors.text.main,
  },
  listContainer: {
    backgroundColor: '#C7CCD133',
    padding: WP('2.5'),
    borderRadius: 21,
    marginBottom: WP('2'),
    marginHorizontal: WP('1'),
    maxWidth: '100%',
  },
  listContentContainerStyle: {
    marginTop: 10,
  },
  titleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 10,
    color: '#7C7C7C',
    textTransform: 'uppercase',
  },
  buttonMainContainer: {
    // width: WP('100'),
    padding: WP('4'),
    flexDirection: 'row',
    borderTopColor: '#B8B9C133',
    borderTopWidth: 2,
    alignItems: 'center',
    backgroundColor: colors.background.light,
  },
  buttonContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    backgroundColor: colors.text.main,
    paddingHorizontal: WP('8'),
    paddingVertical: WP('3.5'),
    borderRadius: 16,
    marginTop: -5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookedButtonContainer: {
    width: WP('60'),
    marginTop: 7,
    marginLeft: 5,
    marginBottom: WP('3'),
  },
  messageImageStyle: {
    width: 24,
    height: 24,
    tintColor: colors.background.light,
  },
});

export {styles};
