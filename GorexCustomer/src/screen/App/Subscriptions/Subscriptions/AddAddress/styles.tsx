import {StyleSheet} from 'react-native';
import {HP, WP} from '../../../../../infrustructure/theme/responsive';
import {colors} from '../../../../../infrustructure/theme/colors';
import {fonts} from '../../../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputStyle: {
    marginBottom: WP('1'),
  },
  buttonContainer: {
    marginBottom: WP('5'),
    marginTop: WP('7'),
  },
  addressButtonContainer: {
    marginTop: 0,
    marginBottom: WP('10'),
  },
  addressButton: {
    marginTop: 0,
    marginBottom: WP('10'),
  },
  mapPinStyle: {
    width: WP('8'),
    height: WP('8'),
  },
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    width: WP('100'),
    height: HP('65'),
    paddingHorizontal: WP('5'),
    marginTop: WP('5'),
    backgroundColor: colors.background.light,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  draggableStyle: {
    width: 63,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#0000001A',
    alignSelf: 'center',
    marginTop: WP('5'),
  },
  selectAddressStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    marginTop: WP('6'),
  },
  cancelMainContainer: {
    width: 120,
    backgroundColor: 'red',
    flexDirection: 'row',
    borderRadius: 18,
    position: 'absolute',
    right: WP('6'),
    padding: WP('1.8'),
    top: WP('7'),
    alignItems: 'center',
  },
  cancelImageStyle: {
    width: 12.21,
    height: 12.21,
    marginHorizontal: 2,
  },
  deleteTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.background.light,
    marginHorizontal: WP('3'),
  },
  currentMapMainContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: WP('4'),
  },
  currentMapImageStyle: {
    height: 38,
    width: 38,
  },
  currentAddressContainer: {
    marginHorizontal: WP('2'),
    width: WP('70'),
  },
  currentAddressTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 16,
    color: colors.text.main,
    marginBottom: WP('1'),
  },
  getAddressTextStyle: {
    fontSize: 14,
    fontFamily: fonts.soraMedium,
    color: colors.text.main,
  },
  editImageContainer: {
    position: 'absolute',
    right: WP('0.8'),
  },
  editImageStyle: {
    width: 38,
    height: 38,
  },
  addressTypeContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('5'),
    marginBottom: WP('5'),
  },
  addressTypeImageStyle: {
    width: 38,
    height: 38,
  },
  addressTypeTextStyle: {
    fontSize: 16,
    fontFamily: fonts.soraBold,
    color: colors.text.main,
    marginHorizontal: WP('3'),
  },
  listItemMainContainer: {
    maxWidth: '100%',
    backgroundColor: '#B0B3BA19',
    borderRadius: 16,
    alignItems: 'center',
    padding: WP('3'),
    flexDirection: 'row',
    marginBottom: WP('3'),
  },
  listImageStyle: {
    width: 38,
    height: 38,
  },
  listTextStyle: {
    fontSize: 16,
    color: colors.text.main,
    marginHorizontal: WP('2.5'),
  },
  listSecondImageStyle: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: WP('5'),
  },
  secondModalMainContainer: {
    width: '100%',
    paddingHorizontal: WP('5'),
    marginTop: WP('5'),
    backgroundColor: colors.background.light,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    height: WP('10'),
    width: WP('88'),
    borderRadius: 10,
    alignSelf: 'center',
    fontFamily: fonts.soraSemiBold,
    borderWidth: 1.5,

    marginVertical: WP(3),
    padding: 1.4,
  },
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  currentLocationStyle: {
    maxWidth: '100%',
    padding: WP('3'),
    borderRadius: 10,
    backgroundColor: '#4AD5940F',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentUserImageStyle: {
    width: 24,
    height: 28,
  },
  currentLocationTextStyle: {
    fontSize: 16,
    fontFamily: fonts.soraMedium,
    color: colors.primary.main,
    marginHorizontal: WP('2'),
  },
  guestArrowStyle: {
    width: 13,
    height: 13,
    position: 'absolute',
    right: WP('4'),
  },
  currentMapPinImageContainer: {
    flexDirection: 'row',
    marginVertical: WP('3'),
    alignItems: 'center',
    width: WP('70'),
  },
  currentMapPinImageStyle: {
    height: 38,
    width: 38,
  },
  getCurrentAddressStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 16,
    color: colors.text.main,
    marginHorizontal: WP('2'),
  },
  customInputContainer: {
    maxWidth: '100%',
    backgroundColor: '#B0B3BA19',
    borderRadius: 16,
    alignItems: 'center',
    padding: WP('3'),
    flexDirection: 'row',
    marginBottom: WP('3'),
  },
  customImageStyle: {
    width: 38,
    height: 38,
  },
  customInputStyle: {
    width: WP('55'),
    marginHorizontal: WP('2'),
    height: 40,
    fontFamily: fonts.soraMedium,
    fontSize: 16,
  },
});

export {styles};
