import React, {FC} from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';

//** assets */
import {appImage} from '../../assets';

//** third party component */
import {AppButton} from '../Button/AppButton';

//** assets */
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';
import {WP} from '../../infrustructure/theme/responsive';

interface Props {
  isLoading: any;
  urduValue?: any;
  arabicValue?: any;
  onChangeUrdu?: any;
  onPress: () => void;
  onChangeArabic?: any;
  onChangeNumeric?: any;
  onChangeAlphabet?: any;
  numericInputValue?: any;
  alphabetInputValue?: any;
}

const VehiclePlateModal: FC<Props> = ({
  onPress,
  urduValue,
  isLoading,
  arabicValue,
  onChangeUrdu,
  onChangeArabic,
  onChangeNumeric,
  onChangeAlphabet,
  numericInputValue,
  alphabetInputValue,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainInputContainer}>
        <View>
          <TextInput
            style={styles.arabicInputStyle}
            placeholder={'١ ٢ ٣ ٤'}
            placeholderTextColor={'#D5D5D5'}
            keyboardAppearance={'default'}
            keyboardType={'numeric'}
            value={arabicValue}
            onChangeText={onChangeArabic}
          />
          <TextInput
            style={styles.numericInputStyle}
            placeholder={'1 2 3 4'}
            placeholderTextColor={'#D5D5D5'}
            keyboardAppearance={'default'}
            keyboardType={'numeric'}
            value={numericInputValue}
            onChangeText={onChangeNumeric}
          />
        </View>
        <View>
          <TextInput
            style={styles.urduInputStyle}
            placeholder={'أ  ب  ت'}
            placeholderTextColor={'#D5D5D5'}
            value={urduValue}
            onChangeText={onChangeUrdu}
          />
          <TextInput
            style={styles.englishInputStyle}
            placeholder={'A B C'}
            placeholderTextColor={'#D5D5D5'}
            value={alphabetInputValue}
            onChangeText={onChangeAlphabet}
            autoCapitalize={'characters'}
          />
        </View>
        <View style={styles.imageContainerStyle}>
          <Image
            source={appImage.saudiFlag}
            resizeMode={'contain'}
            style={styles.imageStyle}
          />
        </View>
      </View>
      <AppButton
        title={'Add'}
        onPress={onPress}
        disabled={
          !isLoading &&
          alphabetInputValue !== '' &&
          numericInputValue !== '' &&
          urduValue !== '' &&
          arabicValue !== ''
            ? false
            : true
        }
        loading={isLoading}
        backgroundColor={
          !isLoading &&
          alphabetInputValue !== '' &&
          numericInputValue !== '' &&
          urduValue !== '' &&
          arabicValue !== ''
            ? colors.primary.main
            : colors.disabled.main
        }
      />
    </View>
  );
};

export {VehiclePlateModal};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainInputContainer: {
    borderWidth: 3,
    maxWidth: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: WP('10'),
    flexDirection: 'row',
    marginHorizontal: WP('5'),
    borderColor: colors.primary.main,
  },
  arabicInputStyle: {
    fontSize: 30,
    width: WP('35'),
    padding: WP('0.6'),
    borderRightWidth: 3,
    textAlign: 'center',
    borderBottomWidth: 3,
    fontFamily: fonts.soraMedium,
    borderRightColor: colors.primary.main,
    borderBottomColor: colors.primary.main,
  },
  numericInputStyle: {
    fontSize: 30,
    width: WP('35'),
    padding: WP('0.6'),
    borderRightWidth: 3,
    textAlign: 'center',
    fontFamily: fonts.soraMedium,
    borderRightColor: colors.primary.main,
  },
  urduInputStyle: {
    fontSize: 30,
    width: WP('35'),
    padding: WP('0.6'),
    textAlign: 'center',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    fontFamily: fonts.soraMedium,
    borderRightColor: colors.primary.main,
    borderBottomColor: colors.primary.main,
  },
  englishInputStyle: {
    fontSize: 30,
    width: WP('35'),
    letterSpacing: 3,
    padding: WP('0.6'),
    borderRightWidth: 3,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: fonts.soraMedium,
    borderRightColor: colors.primary.main,
  },
  imageContainerStyle: {
    width: WP('19'),
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
  },
  imageStyle: {
    width: 37,
    height: 41,
    tintColor: colors.background.light,
  },
});
