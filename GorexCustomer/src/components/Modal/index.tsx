/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// ** Third Party Packages
import RBSheet from 'react-native-raw-bottom-sheet';
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {Image} from '@rneui/base';
import {appIcons} from '../../assets';
import {fonts} from '../../infrustructure/theme/fonts';

const RBSheetModal = (props: any) => {
  const {
    children,
    refRBSheet,
    open,
    onClose,
    height,
    title,
    backgroundColor,
    draggable = true,
    wrapperColor,
    cross = false,
  } = props;

  useEffect(() => {
    if (open) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [open]);

  return (
    <RBSheet
      height={height}
      ref={refRBSheet}
      animationType={'fade'}
      onClose={onClose}
      dragFromTopOnly={true}
      closeOnDragDown={draggable}
      customStyles={{
        container: [
          styles.modalContainer,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.background.light,
          },
        ],
        wrapper: {
          backgroundColor: wrapperColor ? wrapperColor : '#0000004D',
        },
        draggableIcon: styles.spacer,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: WP('5'),
          paddingVertical: draggable ? WP('3') : WP('5'),
          backgroundColor: colors.background.light,
        }}>
        {title && (
          <Text
            style={[
              styles.selectVehicleStyle,
              {
                position: draggable && 'absolute',
                top: draggable && WP('4'),
                left: draggable && WP('6'),
              },
            ]}>
            {title}
          </Text>
        )}
        {cross ? null : (
          <TouchableOpacity
            onPress={onClose}
            style={[
              styles.cancelIconContainer,
              {
                overflow: 'visible',
                position: draggable && 'absolute',
                top: draggable && WP('0'),
                right: draggable && WP('6'),
              },
            ]}>
            <Image
              source={appIcons.closeSheet}
              resizeMode={'contain'}
              style={styles.closeSheetStyle}
            />
          </TouchableOpacity>
        )}
      </View>

      {children}
    </RBSheet>
  );
};

export {RBSheetModal};

const styles = StyleSheet.create({
  modalContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalMainContainer: {
    width: WP('100'),
    padding: WP('5'),
    backgroundColor: colors.background.light,
    position: 'relative',
  },
  modalContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 63,
    height: 6,
    backgroundColor: colors.disabled.light,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: WP('3'),
  },
  cancelIconContainer: {
    width: WP('8'),
    height: WP('8'),
    backgroundColor: colors.disabled.light,
    borderRadius: WP('10'),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeSheetStyle: {
    width: 36,
    height: 36,
  },
  selectVehicleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'left',
  },
});
