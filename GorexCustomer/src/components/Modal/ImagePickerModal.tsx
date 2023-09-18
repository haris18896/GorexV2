/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';
import {WP} from '../../infrustructure/theme/responsive';
import {fonts} from '../../infrustructure/theme/fonts';

interface Props {
  isVisible: boolean;
  onPressHide?: () => void;
  onPressCamera?: () => void;
  onPressPhoto?: () => void;
  onPressCancel?: () => void;
}

const ImagePickerModal: FC<Props> = ({
  isVisible,
  onPressHide,
  onPressCamera,
  onPressPhoto,
  onPressCancel,
}) => {
  return (
    <View style={styles.mainContainer}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onPressHide}
        swipeDirection={'down'}
        backdropColor="#0000004D">
        <View style={styles.contentContainer}>
          <Pressable style={styles.cameraContainer} onPress={onPressCamera}>
            <Text style={styles.cameraTextStyle}>Camera</Text>
          </Pressable>
          <Pressable
            style={styles.photoLibraryContainer}
            onPress={onPressPhoto}>
            <Text style={styles.photoLibraryTextStyle}>Photo Library</Text>
          </Pressable>
        </View>
        <Pressable style={styles.cancelContainer} onPress={onPressCancel}>
          <Text style={styles.cancelTextStyle}>Cancel</Text>
        </Pressable>
      </Modal>
    </View>
  );
};

export {ImagePickerModal};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: 'rgba(220,220, 220,1)',
    position: 'absolute',
    bottom: WP('20'),
    borderRadius: 14,
  },
  cameraContainer: {
    borderBottomColor: '#11111172',
    borderBottomWidth: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: WP('4'),
  },
  cameraTextStyle: {
    fontSize: 20,
    fontFamily: fonts.soraRegular,
    color: '#0A84FF',
  },
  photoLibraryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: WP('4'),
  },
  photoLibraryTextStyle: {
    fontSize: 20,
    fontFamily: fonts.soraRegular,
    color: '#0A84FF',
  },
  cancelContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: WP('3.5'),
    position: 'absolute',
    bottom: WP('4'),
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelTextStyle: {
    fontSize: 20,
    fontFamily: fonts.soraRegular,
    color: '#0A84FF',
  },
});
