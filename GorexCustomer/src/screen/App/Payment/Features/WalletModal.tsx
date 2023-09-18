/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';
import {appIcons} from '../../../../assets';
import {fonts} from '../../../../infrustructure/theme/fonts';

const WalletModal = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Pressable
      onPress={() => {
        setExpanded(!expanded);
      }}
      style={{
        maxWidth: '100%',
        marginHorizontal: WP('5'),
        backgroundColor: colors.background.light,
        paddingHorizontal: WP('3'),
        paddingVertical: WP('5.5'),
        borderRadius: 16,
        marginTop: WP('5'),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: expanded ? 1.5 : 0,
        borderColor: expanded ? colors.primary.main : undefined,
      }}>
      <Image
        source={appIcons.cod}
        resizeMode={'contain'}
        style={{
          width: 37,
          height: 24,
        }}
      />
      <Text
        style={{
          fontFamily: fonts.soraSemiBold,
          fontSize: 16,
          color: colors.text.main,
          marginHorizontal: WP('3'),
        }}>
        Card ending in 3427
      </Text>
      <Image
        source={expanded ? appIcons.checked : appIcons.unChecked}
        resizeMode={'contain'}
        style={{
          width: 24,
          height: 24,
          position: 'absolute',
          right: WP('5'),
        }}
      />
    </Pressable>
  );
};

export {WalletModal};
