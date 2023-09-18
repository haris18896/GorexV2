import {StyleSheet} from 'react-native';
import {colors} from '../../../infrustructure/theme/colors';
import {WP} from '../../../infrustructure/theme/responsive';

const styles = StyleSheet.create({
  menuIconStyle: {
    width: 24,
    height: 24,
  },
  listMainContainer: {
    maxWidth: '100%',
    // marginHorizontal: WP('5'),
    // marginBottom: WP('3'),
    borderRadius: 10,
    paddingHorizontal: WP('4'),
    paddingVertical: WP('4'),
    backgroundColor: colors.background.light,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
});

export {styles};
