/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
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

//**vector icon */
import Check from 'react-native-vector-icons/MaterialCommunityIcons';

//**assets */
import {appIcons} from '../../assets';
import {Sort_List} from '../../utils/constant';
import {AppButton} from '../Button/AppButton';

//**Interface Props */
interface Props {
  categoriesRef?: any;
  onPressCancel?: () => void;
  onPressApply?: () => void;
  onPressClear?: () => void;
}

const CategoriesModal: FC<Props> = ({
  categoriesRef,
  onPressCancel,
  onPressApply,
  onPressClear,
}) => {
  //** state */
  const [sortData, setSortData] = useState(Sort_List);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSort, setSelectedSort] = useState([]);

  const toggleItemSelection = (item: any) => {
    setSelectedItems(prevSelectedItems => {
      const isItemSelected = prevSelectedItems.includes(item);
      if (isItemSelected) {
        // Item is already selected, remove it from the selectedItems array
        return prevSelectedItems.filter(selectedItem => selectedItem !== item);
      } else {
        // Item is not selected, add it to the selectedItems array
        return [...prevSelectedItems, item];
      }
    });
  };

  const toggleSortSelection = (item: any) => {
    setSelectedSort(prevSelectedItems => {
      const isItemSelected = prevSelectedItems.includes(item);
      if (isItemSelected) {
        // Item is already selected, remove it from the selectedItems array
        return prevSelectedItems.filter(selectedItem => selectedItem !== item);
      } else {
        // Item is not selected, add it to the selectedItems array
        return [...prevSelectedItems, item];
      }
    });
  };

  const clearSelection = () => {
    setSelectedItems([]);
    setSelectedSort([]);
  };

  //** renderItem */
  const numColumnsFirstRow = 4;
  interface renderProps {
    item: any;
    index: any;
  }

  const renderItem: FC<renderProps> = (item, index) => {
    // const numColumns = index === 0 ? numColumnsFirstRow : numColumnsOtherRows;
    return (
      <Pressable
        key={index}
        style={
          selectedItems.includes(item)
            ? styles.selectCategoriesContainer
            : styles.categoriesContainer
        }
        onPress={() => {
          toggleItemSelection(item);
        }}>
        <Text
          key={index}
          style={
            selectedItems.includes(item)
              ? styles.selectCategoriesStyle
              : styles.categoriesTextStyle
          }>
          All
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <RBSheet
        ref={categoriesRef}
        height={HP('65')}
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
              onPressCancel();
              clearSelection();
            }}
            style={styles.cancelIconContainer}>
            <Image
              source={appIcons.closeSheet}
              resizeMode={'contain'}
              style={styles.closeSheetStyle}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <View style={styles.headingContainer}>
            <Image
              source={appIcons.menuIcon}
              resizeMode={'contain'}
              style={styles.categoryImageStyle}
            />
            <Text style={styles.headingStyle}>Categories</Text>
          </View>
          <View>
            <FlatList
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              numColumns={numColumnsFirstRow}
              horizontal={false}
              scrollEnabled={false}
              contentContainerStyle={{
                flexGrow: 1,
                marginBottom: WP('5'),
              }}
              renderItem={({item, index}) => renderItem(item, index)}
              keyExtractor={(item, index) => item.id + index.toString()}
            />
          </View>
          <View style={styles.sortContainer}>
            <Image
              source={appIcons.sortBy}
              resizeMode={'contain'}
              style={styles.sortImageStyle}
            />
            <Text style={styles.sortTextStyle}>Sort by</Text>
          </View>
          <View>
            <FlatList
              data={sortData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id + index.toString()}
              scrollEnabled={false}
              contentContainerStyle={{
                flex: 1,
                marginTop: WP('2'),
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    toggleSortSelection(item);
                  }}
                  style={styles.sortListContainer}>
                  <Image
                    source={
                      selectedSort.includes(item)
                        ? appIcons.checked
                        : appIcons.unChecked
                    }
                    resizeMode={'contain'}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                  <Text style={styles.sortTitleStyle}>{item?.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <AppButton
            title={'Apply Settings'}
            onPress={onPressApply}
            style={styles.buttonContainer}
          />
          <Pressable
            onPress={() => {
              onPressClear();
              clearSelection();
            }}>
            <Text style={styles.clearFilterStyle}>Clear filters</Text>
          </Pressable>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
};

export {CategoriesModal};

const styles = StyleSheet.create({
  modalContainer: {
    // backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalMainContainer: {
    paddingHorizontal: WP('4.5'),
    paddingTop: WP('4.5'),
    backgroundColor: colors.background.light,
  },
  modalContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 63,
    padding: WP('0.6'),
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
    marginTop: WP('10'),
  },
  headingContainer: {
    width: WP('100'),
    paddingHorizontal: WP('5'),
    flexDirection: 'row',
    marginBottom: WP('4'),
  },
  headingStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
  },
  categoriesContainer: {
    padding: WP('3'),
    backgroundColor: '#C7CCD133',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: WP('4'),
    marginBottom: 8,
  },
  selectCategoriesContainer: {
    padding: WP('3'),
    backgroundColor: '#17B26A',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: WP('4'),
    marginBottom: 8,
  },
  categoriesTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: '#7C7C7C',
    textTransform: 'uppercase',
  },
  selectCategoriesStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  sortContainer: {
    width: WP('100'),
    paddingHorizontal: WP('5'),
    flexDirection: 'row',
  },
  sortTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
  },
  sortListContainer: {
    paddingHorizontal: WP('4'),
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  sortTitleStyle: {
    fontFamily: fonts.soraSemiBold,
    color: colors.text.main,
    fontSize: 16,
    marginHorizontal: 10,
  },
  clearFilterStyle: {
    color: colors.text.main,
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: WP('4'),
  },
  categoryImageStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginRight: 8,
    tintColor: colors.primary.main,
  },
  sortImageStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginRight: 8,
    tintColor: colors.primary.main,
  },
});
