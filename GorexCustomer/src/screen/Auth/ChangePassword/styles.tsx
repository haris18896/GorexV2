import {StyleSheet} from 'react-native';
import {colors} from '../../../infrustructure/theme/colors';
import {fonts} from '../../../infrustructure/theme/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  newPasswordStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 20,
    color: colors.text.main,
    marginHorizontal: 30,
    marginVertical: 10,
    textAlign: 'left',
  },
  enterPasswordStyle: {
    fontSize: 14,
    color: colors.text.main,
    fontFamily: fonts.soraSemiBold,
    textAlign: 'left',
    marginHorizontal: 30,
    marginBottom: 10,
  },
  inputContainer: {
    flex: 0.9,
  },
});

export {styles};
