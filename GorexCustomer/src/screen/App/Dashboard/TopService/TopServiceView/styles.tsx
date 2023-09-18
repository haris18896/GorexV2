import {StyleSheet} from 'react-native';
import {WP} from '../../../../../infrustructure/theme/responsive';
import {colors} from '../../../../../infrustructure/theme/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  topServiceContainer: {
    alignItems: 'center',
    marginLeft: WP('4'),
    marginBottom: WP('4'),
  },
  contentContainerStyle: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  listContainer: {
    flexGrow: 1,
  },
  imageStyle: {
    maxWidth: WP('27'),
    maxHeight: WP('30'),
  },
});

export {styles};
