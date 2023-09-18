/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from 'react-native';

//**Library */
import RBSheet from 'react-native-raw-bottom-sheet';

//**theme */
import {HP, WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

//**assets */
import {appIcons} from '../../assets';

//** third party component */
import {AppButton} from '../Button/AppButton';

//**Interface Props */
interface Props {
  typeRef?: any;
  onPressCancel?: () => void;
  item?: any;
}

const ServiceTypeModal: FC<Props> = ({typeRef, onPressCancel, item}) => {
  //** renderItem */
  const renderItem = () => (
    <View style={styles.listContainer}>
      <Image
        source={appIcons.verified}
        resizeMode={'contain'}
        style={styles.listImageStyle}
      />
      <Text style={styles.titleTextStyle}>All Services</Text>
    </View>
  );

  return (
    // <SafeAreaView
    // style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <RBSheet
      ref={typeRef}
      height={HP('55')}
      openDuration={250}
      customStyles={{
        container: styles.modalContainer,
      }}>
      <View style={styles.modalMainContainer}>
        <View style={styles.spacer} />
        <TouchableOpacity
          onPress={onPressCancel}
          style={styles.cancelIconContainer}>
          <Image
            source={appIcons.closeSheet}
            resizeMode={'contain'}
            style={styles.closeSheetStyle}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.serviceTextStyle}>Select Service Type</Text>
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={() => renderItem()}
        keyExtractor={item => {
          item?.id;
        }}
      />
      <AppButton title={'Select'} style={styles.buttonContainer} />
    </RBSheet>
    // </SafeAreaView>
  );
};

export {ServiceTypeModal};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.background.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalMainContainer: {
    paddingHorizontal: WP('4'),
    paddingTop: WP('4'),
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
  buttonContainer: {
    marginBottom: WP('10'),
  },
  listContainer: {
    flexDirection: 'row',
    marginTop: WP('5'),
    marginHorizontal: WP('5'),
  },
  listImageStyle: {
    width: 24,
    height: 24,
    tintColor: colors.primary.main,
  },
  titleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP(3),
    fontWeight: '500',
  },
  serviceTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP('5'),
    fontWeight: '600',
  },
});
