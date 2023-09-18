import React, {FC} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

//**themes */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

//**Interface Props */
interface Props {
  title?: string;
  backgroundColor?: string | any;
  source?: any;
}

const VerificationToast: FC<Props> = ({title, backgroundColor, source}) => {
  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.primary.main,
        },
      ]}>
      <Image source={source} resizeMode={'contain'} style={styles.imageStyle} />
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.subTitleStyle}>Dismiss!</Text>
    </View>
  );
};

export {VerificationToast};

const styles = StyleSheet.create({
  mainContainer: {
    width: WP('85'),
    backgroundColor: colors.primary.main,
    borderRadius: 16,
    padding: WP('2.5'),
    alignItems: 'center',
    alignSelf: 'center',
    // marginVertical: WP('54'),
    flexDirection: 'row',
    position: 'absolute',
    bottom: WP('14'),
  },
  titleStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: 'white',
    marginHorizontal: 10,
  },
  subTitleStyle: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
    color: colors.background.light,
    fontFamily: fonts.soraRegular,
  },
  imageStyle: {
    width: 28,
    height: 28,
  },
});
