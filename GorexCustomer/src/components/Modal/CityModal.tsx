/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  Pressable,
} from 'react-native';

//**Library */
import RBSheet from 'react-native-raw-bottom-sheet';

//**theme */
import {HP, WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

//**assets */
import {appIcons} from '../../assets';
import {AppButton} from '../Button/AppButton';
import {SearchInput} from '../Input/SearchInput';
import {District_List} from '../../utils/constant';

//**vector icon */
import Check from 'react-native-vector-icons/MaterialCommunityIcons';

//**Interface Props */
interface Props {
  cityRef?: any;
  onPressCancel?: () => void;
  onPressConfirm?: () => void;
}

const CityModal: FC<Props> = ({cityRef, onPressCancel, onPressConfirm}) => {
  //** state */
  const [district, setDistrict] = useState(District_List);
  const [selectedCity, setSelectedCity] = useState([]);
  const [searchList, setSearchList] = useState('');

  /** toggle Item */
  const toggleItemExpansion = (itemId, subTitleId) => {
    setDistrict(prevList => {
      return prevList.map(item => {
        if (item.id === itemId) {
          const newSubTitles = item.subTitle.map(sub => {
            if (sub.id === subTitleId) {
              return {
                ...sub,
                selected: !sub.selected,
              };
            }
            return sub;
          });

          return {
            ...item,
            expanded: true, // Set expanded to true
            subTitle: newSubTitles,
          };
        } else {
          return {
            ...item,
            expanded: false, // Set expanded to false for other items
            subTitle: item.subTitle.map(sub => ({
              ...sub,
              selected: false,
            })),
          };
        }
      });
    });
  };

  //** renderItem */
  const renderItem = (item, index) => (
    <View>
      <TouchableOpacity
        style={styles.renderContainer}
        onPress={() => {
          toggleItemExpansion(item.id, null);
        }}>
        <Text style={styles.titleStyle}>{item.title}</Text>
        <Image
          source={appIcons.downArrow}
          resizeMode={'contain'}
          style={{
            width: 8,
            height: 13,
            marginRight: 5,
            transform: item?.expanded
              ? [{rotate: '180deg'}]
              : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>
      {item?.expanded
        ? item.subTitle.map((obj: any) => (
            <Pressable
              key={obj.id}
              style={{
                width: WP('95'),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                toggleItemExpansion(item.id, obj.id);
              }}>
              <Text
                key={obj.id}
                style={[
                  styles.nameStyle,
                  {color: obj.selected ? colors.primary.main : '#7C7C7C'},
                ]}>
                {obj.name}
              </Text>
              {obj.selected && (
                <Image
                  source={appIcons.checked}
                  resizeMode={'contain'}
                  style={{
                    width: 18,
                    height: 18,
                  }}
                />
              )}
            </Pressable>
          ))
        : null}
    </View>
  );

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <RBSheet
        ref={cityRef}
        height={HP('94')}
        openDuration={250}
        customStyles={{
          container: styles.modalContainer,
          wrapper: {
            backgroundColor: '#0000004D',
          },
        }}>
        <View style={styles.modalMainContainer}>
          <View style={styles.spacer} />
          <TouchableOpacity
            onPress={() => {
              toggleItemExpansion(null, null);
              onPressCancel();
            }}
            style={styles.cancelIconContainer}>
            <Image
              source={appIcons.closeSheet}
              resizeMode={'contain'}
              style={styles.closeSheetStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.headingStyle}>Select your District</Text>
        </View>
        <SearchInput
          placeholder={'Search for your district'}
          value={searchList}
          onChangeText={text => {
            setSearchList(text);
          }}
          onPressClear={() => {
            setSearchList('');
          }}
        />
        <FlatList
          data={district}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(item, index) => `key-${index}`}
        />
        <AppButton
          title={'Confirm'}
          onPress={onPressConfirm}
          style={styles.buttonContainer}
        />
      </RBSheet>
    </SafeAreaView>
  );
};

export {CityModal};

const styles = StyleSheet.create({
  modalContainer: {
    // backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalMainContainer: {
    width: WP('100'),
    padding: WP('4.5'),
    backgroundColor: colors.background.light,
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
    marginBottom: WP('6'),
    backgroundColor: 'red',
  },
  headingContainer: {
    width: WP('100'),
    paddingHorizontal: WP('6'),
    flexDirection: 'row',
  },
  headingStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
  },
  renderContainer: {
    width: WP('89'),
    paddingVertical: WP('3'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderBottomWidth: 0.9,
    borderBottomColor: '#B0B3BA19',
  },
  titleStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 18,
    color: colors.text.main,
  },
  nameStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 16,
    color: '#7C7C7C',
    marginHorizontal: WP('5'),
    marginVertical: WP('3'),
  },
});
