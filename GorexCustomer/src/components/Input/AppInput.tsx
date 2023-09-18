/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Pressable,
} from 'react-native';

//**themes */
import {WP} from '../../infrustructure/theme/responsive';
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';

//**assets */
import {appIcons} from '../../assets';

//**InterFace Props */
interface Props {
  style?: any;
  error?: any;
  source?: any;
  onBlur?: any;
  touched?: any;
  title?: string;
  color?: string;
  editable?: any;
  value?: string;
  placeholder?: any;
  iconName?: string;
  subTitle?: string;
  blurOnSubmit?: any;
  onPress?: () => void;
  countryCode?: string;
  keyboardType?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void | undefined;
}

const AppInput: FC<Props> = ({
  style,
  title,
  color,
  error,
  value,
  onBlur,
  source,
  touched,
  onPress,
  subTitle,
  editable,
  iconName,
  countryCode,
  placeholder,
  onChangeText,
  keyboardType,
  blurOnSubmit,
  secureTextEntry = false,
}) => {
  //**State */
  const [showPass, setShowPass] = React.useState(secureTextEntry);
  const [focus, setFocus] = React.useState(false);

  return (
    <View style={[styles.mainContainer, style]}>
      {title && <Text style={styles.titleStyle(color)}>{title}</Text>}

      <View
        style={[
          styles.contentContainer,
          {
            borderWidth: focus ? 1 : 1,
            borderColor: focus ? colors.primary.main : colors.text.light,
          },
        ]}>
        <View
          style={{
            width: WP('10'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={iconName}
            resizeMode={'contain'}
            style={styles.iconStyle}
          />
        </View>
        <View style={styles.secondContentContainer(countryCode)}>
          <Text style={styles.subTitleStyle}>{subTitle}</Text>
          <View style={styles.inputMainContainer}>
            {countryCode && (
              <>
                <Image
                  source={source}
                  resizeMode={'contain'}
                  style={styles.imageContainer}
                />
                <Text onPress={onPress} style={styles.countryCodeStyle}>
                  {countryCode}
                </Text>
                <Image
                  source={appIcons.downArrow}
                  resizeMode={'contain'}
                  style={styles.downArrowStyle}
                />
              </>
            )}

            <TextInput
              style={[
                styles.inputContainer,
                {
                  height: Platform.OS === 'ios' ? WP('5') : WP('5'),
                  width: countryCode ? WP('45') : WP('58'),
                  flexGrow: 1,
                  marginLeft: countryCode ? 10 : 0,
                  paddingVertical: WP('-12'),
                },
              ]}
              numberOfLines={1}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={events => {
                setFocus(false);
                onBlur(events);
              }}
              blurOnSubmit={blurOnSubmit}
              onChangeText={onChangeText}
              value={value}
              secureTextEntry={showPass}
              placeholder={placeholder}
              placeholderTextColor={colors.text.main}
              keyboardType={keyboardType}
              editable={editable}
            />
          </View>
        </View>
        {secureTextEntry ? (
          <Pressable
            onPress={() => {
              setShowPass(!showPass);
            }}
            style={{
              // width: WP('10'),
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: WP('7'),
            }}>
            <Image
              source={appIcons.openEye}
              resizeMode={'contain'}
              style={{
                width: 24,
                height: 16.71,
                tintColor: showPass
                  ? colors.disabled.main
                  : colors.primary.main,
              }}
            />
          </Pressable>
        ) : (
          <View
            style={{
              width: WP('10'),
            }}
          />
        )}
      </View>
      {touched && error && (
        <View>
          <Text style={styles.errorStyle}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export {AppInput};

const styles = StyleSheet.create({
  mainContainer: {
    padding: WP(1),
    marginLeft: 17,
  },
  titleStyle: (color: any) => {
    return {
      fontFamily: fonts.soraSemiBold,
      fontSize: 16,
      color: color ? color : 'white',
      textAlign: 'left',
    };
  },
  contentContainer: {
    marginVertical: WP('2'),
    backgroundColor: colors.background.light,
    maxWidth: WP('90'),
    padding: 6,
    borderRadius: 16,
    flexDirection: 'row',
  },
  phoneImage: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: '#B0B3BA19',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  secondContentContainer: countryCode => {
    return {
      padding: WP('1'),
      width: countryCode ? WP('60') : WP('60'),
    };
  },
  subTitleStyle: {
    marginBottom: 1,
    fontFamily: fonts.soraMedium,
    fontSize: 12,
    color: '#B0B3BA',
  },
  inputMainContainer: {
    width: '40%',
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: WP('4'),
    height: WP('4'),
    borderRadius: WP('4'),
  },
  countryCodeStyle: {
    color: 'black',
    fontSize: 14,
    marginLeft: 5,
    fontFamily: fonts.soraSemiBold,
    flexDirection: 'row',
  },
  downArrowStyle: {
    width: 5.95,
    height: 8.93,
    marginLeft: 4,
  },
  inputContainer: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.text.main,
  },
  errorStyle: {
    fontSize: 12,
    color: colors.errors.main,
    padding: 3,
    textAlign: 'left',
    fontFamily: fonts.soraRegular,
  },
  iconStyle: {
    width: 28,
    height: 28,
    alignSelf: 'center',
  },
});
