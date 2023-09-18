/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {WP} from '../../infrustructure/theme/responsive';
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';
import {appIcons} from '../../assets';

const PaymentButton = ({title, subTitle, onPressAdd, leftIcon, item}: any) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <View style={styles.mainContainer}>
      <Pressable
        style={[
          styles.contentContainer,
          {
            borderWidth: expanded?.id === item?.id ? 2 : 0,
            borderColor:
              expanded?.id === item?.id
                ? colors.primary.main
                : colors.background.light,
          },
        ]}
        onPress={() => {
          setExpanded(prevExpanded => (prevExpanded === item ? null : item));
        }}>
        <Image
          source={leftIcon}
          resizeMode={'contain'}
          style={styles.vehicleImageStyle}
        />
        <View style={styles.secondContentContainer}>
          <Text style={styles.subTitleStyle}>{title}</Text>
          <Text style={styles.titleTextStyle}>{subTitle}</Text>
        </View>
        {title === 'Credit Card' ? (
          <Pressable
            onPress={onPressAdd}
            style={{
              position: 'absolute',
              right: WP('5'),
            }}>
            <Text
              style={{
                fontFamily: fonts.soraBold,
                fontSize: 12,
                color: colors.primary.main,
                textAlign: 'left',
              }}>
              +ADD NEW
            </Text>
          </Pressable>
        ) : (
          <Image
            source={
              expanded?.id === item?.id ? appIcons.checked : appIcons.unChecked
            }
            resizeMode={'contain'}
            style={{
              width: 24,
              height: 24,
              position: 'absolute',
              top: WP('6.5'),
              right: WP('5'),
            }}
          />
        )}
      </Pressable>
    </View>
  );
};

export {PaymentButton};

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
    paddingVertical: WP('4'),
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
