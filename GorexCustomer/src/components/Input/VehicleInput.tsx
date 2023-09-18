/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text, Pressable, Image} from 'react-native';

//** assets */
import {appIcons} from '../../assets';

//** theme */
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';
import {WP} from '../../infrustructure/theme/responsive';

interface Props {
  style?: any;
  disabled?: any;
  vehicleImage: any;
  onPress: () => void;
  vehicleName: string;
  vehicleLabel: string;
}

const VehicleInput: FC<Props> = ({
  style,
  onPress,
  disabled,
  vehicleName,
  vehicleImage,
  vehicleLabel,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          maxWidth: '100%',
          backgroundColor: colors.background.light,
          marginHorizontal: WP('5'),
          borderRadius: 16,
          padding: WP('5'),
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: WP('4'),
        },
        style,
      ]}>
      <Image
        source={vehicleImage}
        resizeMode={'contain'}
        style={{
          width: 28,
          height: 28,
          tintColor: '#000000',
        }}
      />
      <View
        style={{
          marginHorizontal: WP('3'),
          marginTop: -5,
        }}>
        <Text
          style={{
            fontFamily: fonts.soraMedium,
            fontSize: 12,
            color: '#B0B3BA',
            marginBottom: WP('0.9'),
          }}>
          {vehicleLabel}
        </Text>
        <Text
          style={{
            fontFamily: fonts.soraSemiBold,
            fontSize: 14,
            color: colors.text.main,
          }}>
          {vehicleName}
        </Text>
      </View>
      <Pressable
        style={{
          position: 'absolute',
          right: WP('5'),
        }}>
        <Image
          source={appIcons.openArrows}
          resizeMode={'contain'}
          style={{
            width: 9,
            height: 17,
          }}
        />
      </Pressable>
    </Pressable>
  );
};

export {VehicleInput};
