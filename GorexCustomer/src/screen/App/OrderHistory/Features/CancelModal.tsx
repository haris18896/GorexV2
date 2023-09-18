/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

//** third party library */
import Modal from 'react-native-modal';

//**themes */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {WP} from '../../../../infrustructure/theme/responsive';
import {colors} from '../../../../infrustructure/theme/colors';

//** interface props */
interface Props {
  title?: string;
  loading?: boolean;
  subTitle?: string;
  isVisible: boolean;
  buttonTitle?: string;
  onPressHide?: () => void;
  onPressCancel?: () => void;
  onPressCancelOrder?: () => void;
}

const CancelModal: FC<Props> = ({
  title,
  loading,
  subTitle,
  isVisible,
  buttonTitle,
  onPressHide,
  onPressCancel,
  onPressCancelOrder,
}) => {
  return (
    <View style={styles.mainContainer}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onPressHide}
        swipeDirection={'down'}
        backdropColor="#0000004D"
        style={styles.modalStyle}>
        <View style={styles.contentContainer}>
          <Text style={styles.sureTextStyle}>{title}</Text>
          <Text style={styles.supportTextStyle}>{subTitle}</Text>
          <View style={styles.buttonMainContainer}>
            <Pressable
              onPress={onPressCancelOrder}
              style={[
                styles.cancelOrderButtonContainer,
                {
                  backgroundColor: loading ? colors?.disabled.main : '#FF2C3C',
                  width: WP('45'),
                },
              ]}>
              {loading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text style={styles.cancelOrderTextStyle}>{buttonTitle}</Text>
              )}
            </Pressable>
            <Pressable onPress={onPressCancel}>
              <Text style={styles.cancelTextStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export {CancelModal};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    backgroundColor: colors.background.light,
    borderRadius: 14,
    paddingHorizontal: WP('7'),
    paddingVertical: WP('6'),
    justifyContent: 'center',
  },
  sureTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'left',
    marginBottom: WP('3'),
  },
  supportTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'left',
  },
  buttonMainContainer: {
    flexDirection: 'row',
    marginTop: WP('6'),
    marginBottom: WP('4'),
    alignItems: 'center',
  },
  cancelOrderButtonContainer: {
    maxWidth: '100%',
    backgroundColor: '#FF2C3C',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: WP('8'),
    paddingVertical: WP('3.5'),
  },
  cancelOrderTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 16,
    color: colors.background.light,
  },
  cancelTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    marginLeft: WP('9'),
  },
});
