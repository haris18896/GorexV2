/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Pressable,
} from 'react-native';

/** themes */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

/** interface */
interface Props {
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  style?: any;
  disabled?: boolean;
  backgroundColor?: any;
}

const AppButton: FC<Props> = ({
  title,
  onPress,
  loading,
  style,
  disabled,
  backgroundColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.mainContainer,
        style,
        {
          flexDirection: loading ? 'row' : 'column',
          backgroundColor: backgroundColor
            ? backgroundColor
            : loading
            ? colors.disabled.main
            : colors.primary.main,
        },
      ]}
      disabled={disabled}>
      <Text style={styles.titleStyle}>{title}</Text>
      {loading && (
        <View>
          <ActivityIndicator
            size={'small'}
            color={colors.background.light}
            style={{
              // alignSelf: 'center',
              position: 'absolute',
              right: WP('0'),
              top: WP('-2.5'),
            }}
          />
        </View>
      )}
    </Pressable>
  );
};

export {AppButton};

const styles = StyleSheet.create({
  mainContainer: {
    width: WP('85'),
    backgroundColor: colors.primary.main,
    borderRadius: 16,
    padding: WP('4'),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: WP('16'),
    position: 'relative',
  },
  titleStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
});
