import React, {FC} from 'react';
import {Text, Image, StyleSheet, Pressable} from 'react-native';

//** theme */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

//** interfaceProps */
interface Props {
  item?: any;
  style?: any;
  onPress?: any;
  imageStyle?: any;
  contentContainerStyle?: any;
}

const HomeTopService: FC<Props> = ({item, style, onPress, imageStyle}) => {
  return (
    <Pressable style={[styles.mainContainer, style]} onPress={onPress}>
      <Image
        source={{uri: `data:image/jpeg;base64,${item?.file}`}}
        style={[styles.imageStyle, imageStyle]}
        resizeMode={'cover'}
      />
      <Text style={styles.titleStyle}>{item.name}</Text>
    </Pressable>
  );
};

export {HomeTopService};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background.light,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 4,
    elevation: 10,
    shadowColor: '#0000000D',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderWidth: 0.8,
    borderColor: '#0000000D',
    paddingBottom: 10,
    maxWidth: '100%',
  },
  contentContainer: {
    width: WP('32'),
    height: 76.79,
    backgroundColor: colors.text.main,
    borderRadius: 20,
  },
  imageStyle: {
    height: 76.79,
    width: WP('32'),
    borderRadius: 20,
    backgroundColor: 'black',
  },
  titleStyle: {
    color: colors.text.main,
    fontSize: 10,
    fontFamily: fonts.soraBold,
    textAlignVertical: 'center',
    marginTop: 15,
    // marginBottom: 5,
    textTransform: 'uppercase',
    width: 110,
    textAlign: 'center',
  },
});
