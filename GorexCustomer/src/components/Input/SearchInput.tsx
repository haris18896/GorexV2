import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';

//** theme */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';

//** paper library */
import {TextInput} from 'react-native-paper';

//** assets */
import {appIcons} from '../../assets';
import {fonts} from '../../infrustructure/theme/fonts';

//** interface props */
interface Props {
  inputStyle?: any;
  placeholder?: string;
  value?: string | undefined;
  onChangeText?: (text: string) => void;
  onPressClear?: () => void;
}

const SearchInput: FC<Props> = ({
  inputStyle,
  placeholder,
  value,
  onChangeText,
  onPressClear,
}) => {
  const element = (
    <TextInput.Icon
      icon={appIcons.search}
      size={20}
      style={styles.iconStyle}
      color={colors.primary.main}
    />
  );
  const crossIcon = (
    <TextInput.Icon
      icon={appIcons.clearIcon}
      size={20}
      style={styles.iconStyle}
      color={colors.text.main}
      onPress={onPressClear}
    />
  );

  return (
    <View style={[styles.mainContainer]}>
      <TextInput
        style={[styles.inputContainer, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.main}
        mode={'outlined'}
        outlineColor={'#B0B3BA33'}
        activeOutlineColor={colors.primary.main}
        left={element}
        right={value?.length > 0 && crossIcon}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export {SearchInput};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: WP(3),
  },
  inputContainer: {
    backgroundColor: 'transparent',
    height: WP('10'),
    width: WP('88'),
    borderRadius: 10,
    alignSelf: 'center',
    fontFamily: fonts.soraSemiBold,
  },
  iconStyle: {
    zIndex: 100,
    marginTop: 15,
  },
});
