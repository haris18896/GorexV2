/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

//**themes */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

//**Interface Props */
interface Props {
  id: any;
  image: any;
  name: string;
  discount: string;
  description: string;
  is_consumable: boolean;
}

const HomeTopList: FC<Props> = ({
  id,
  name,
  discount,
  description,
  image,
  is_consumable,
}) => {
  return (
    <ImageBackground
      source={{uri: `data:image/jpeg;base64,${image}`}}
      resizeMode={'cover'}
      style={
        is_consumable ? styles.imageBackgroundStyle : styles.tyreImageStyle
      }
      imageStyle={styles.imageStyle}>
      {/* <Text style={styles.zeroTitleStyle}>{name.split('-') + '\n'}</Text> */}
      {is_consumable && (
        <TouchableOpacity style={styles.letGoContainer}>
          <Text style={styles.letGoTextStyle}>LET’S GO</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

export {HomeTopList};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: WP('2.5'),
    maxWidth: '100%',
  },
  imageBackgroundStyle: {
    width: WP('89'),
    height: 140,
    overflow: 'hidden',
    marginTop: 4,
    marginRight: WP('4'),
  },
  imageStyle: {
    borderRadius: 20,
  },
  zeroTitleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 19,
    color: colors.background.light,
    textAlign: 'left',
    textAlignVertical: 'top',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  letGoContainer: {
    backgroundColor: colors.text.main,
    width: WP('25'),
    padding: WP('2'),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: WP('0'),
    bottom: WP('2'),
    marginHorizontal: WP('4'),
  },
  letGoTextStyle: {
    fontFamily: fonts.soraSemiBold,
    color: colors.background.light,
    fontSize: 14,
  },
  contentContainer: {
    width: WP('35'),
    marginHorizontal: WP('3'),
    paddingHorizontal: WP('5'),
    paddingTop: WP('5'),
    backgroundColor: colors.text.main,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  titleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.background.light,
    textAlign: 'left',
  },
  upToTextStyle: {
    textAlign: 'left',
    color: colors.background.light,
    fontFamily: fonts.soraSemiBold,
    fontSize: 10,
  },
  offTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    textAlign: 'left',
    color: colors.background.light,
    marginVertical: 10,
  },
  tyreImageStyle: {
    width: WP('38'),
    height: 140,
    marginTop: 4,
    marginRight: WP('4'),
  },
});
