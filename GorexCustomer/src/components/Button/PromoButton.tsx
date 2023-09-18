/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

//** assets */
import {appIcons} from '../../assets';

//** theme */
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';
import {WP} from '../../infrustructure/theme/responsive';

const PromoButton = ({
  apply,
  value,
  onBlur,
  onFocus,
  disabled,
  expanded,
  isLoading,
  onChangeText,
  onPressApply,
  onPressDelete,
  backgroundColor,
}: any) => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.contentContainer,
          {
            borderWidth: expanded && !apply ? 2 : !expanded && apply ? 2 : 0,
            borderColor:
              expanded && !apply
                ? '#FFAE00'
                : apply && !expanded
                ? colors.primary.main
                : colors.background.light,
          },
        ]}>
        <Image
          source={appIcons.offers}
          resizeMode={'contain'}
          style={[
            styles.vehicleImageStyle,
            {tintColor: !expanded && apply ? colors.primary.main : undefined},
          ]}
        />
        <View style={styles.secondContentContainer}>
          <Text
            style={[
              styles.titleTextStyle,
              {
                fontFamily:
                  !expanded && apply ? fonts.soraBold : fonts.soraMedium,
                color: !expanded && apply ? colors.text.main : '#B0B3BA',
              },
            ]}>
            {!expanded && apply ? value : 'Do you have the promo code?'}
          </Text>
          {apply ? (
            <Text
              style={{
                fontFamily: fonts.soraSemiBold,
                fontSize: 14,
                color: colors.primary.main,
              }}>
              Code applied successfully!
            </Text>
          ) : (
            <TextInput
              placeholder={'Type your code here'}
              placeholderTextColor={colors.text.main}
              style={styles.subTitleStyle}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value}
              onChangeText={onChangeText}
            />
          )}
        </View>
        {!apply ? (
          <Pressable
            style={[styles.editContainer, {backgroundColor: backgroundColor}]}
            onPress={onPressApply}
            disabled={disabled}>
            {isLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 14,
                  color: colors.background.light,
                }}>
                Apply
              </Text>
            )}
          </Pressable>
        ) : (
          <Pressable
            style={{
              width: 32,
              height: 32,
              borderRadius: 32,
              backgroundColor: '#FF2C3C',
              position: 'absolute',
              right: WP('6'),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onPressDelete}>
            <Image
              source={appIcons.delete}
              resizeMode={'contain'}
              style={{
                height: 15,
                width: 15,
              }}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export {PromoButton};

const styles = StyleSheet.create({
  mainContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    marginTop: WP('3'),
  },

  contentContainer: {
    maxWidth: '100%',
    backgroundColor: colors.background.light,
    paddingHorizontal: WP('5'),
    paddingVertical: WP('5'),
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleImageStyle: {
    width: 21,
    height: 17,
  },
  secondContentContainer: {
    marginHorizontal: WP('4'),
    maxWidth: '100%',
  },
  subTitleStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
    marginBottom: 2,
  },
  titleTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'left',
    width: '100%',
  },
  editContainer: {
    width: WP('19'),
    padding: WP('2'),
    borderRadius: 20,
    backgroundColor: colors.primary.main,
    position: 'absolute',
    top: WP('5'),
    right: WP('5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImageStyle: {
    width: 15,
    height: 15,
    tintColor: colors.primary.main,
  },
});
