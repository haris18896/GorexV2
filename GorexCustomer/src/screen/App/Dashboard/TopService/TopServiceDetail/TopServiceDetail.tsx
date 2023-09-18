import {View, KeyboardAvoidingView, FlatList} from 'react-native';
import React, {useRef, useState} from 'react';

/** navigation */
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {
  AppHeader,
  CategoriesModal,
  EliteAutoService,
  TopAutoService,
  TopServiceSort,
} from '../../../../../components';
import {colors} from '../../../../../infrustructure/theme/colors';
import {useSelector} from 'react-redux';

const TopServiceDetail = () => {
  //** state */
  const [horizontalView, setHorizontalView] = useState(true);
  const [verticalView, setVerticalView] = useState(false);

  const {near_By} = useSelector((state: any) => state?.homeSlice);

  const handlePressHorizontal = () => {
    setHorizontalView(true);
    setVerticalView(false);
  };

  const handlePressVertical = () => {
    setHorizontalView(false);
    setVerticalView(true);
  };

  //** navigation */
  const navigation = useNavigation<any>();

  //** useRef */
  const categoriesRef = useRef<any>(null);

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'Top Services'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <TopServiceSort
        onPressLeftClick={() => {
          handlePressHorizontal();
        }}
        onPressRightClick={() => {
          handlePressVertical();
        }}
        onPressSortBy={() => {
          categoriesRef.current.open();
        }}
        backgroundLeftColor={
          horizontalView && !verticalView ? '#E9FAF2' : 'transparent'
        }
        backgroundRightColor={
          verticalView && !horizontalView ? '#E9FAF2' : 'transparent'
        }
        verticalTintColor={
          horizontalView && !verticalView ? colors.primary.main : undefined
        }
        horiTintColor={
          verticalView && !horizontalView ? colors.primary.main : undefined
        }
      />
      {horizontalView ? (
        <FlatList
          data={near_By?.data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            const distance = item?.distance / 1000;
            const fractionalPart = distance - Math.floor(distance);
            return (
              <EliteAutoService
                key={index}
                onPress={() => {
                  navigation.navigate('EliteServiceDetail', {item: item});
                }}
                name={item?.name}
                rating={item?.rating === false ? 0 : item?.rating}
                distance={fractionalPart.toFixed(2)}
              />
            );
          }}
          keyExtractor={(item, index) => item.id + index.toString()}
        />
      ) : verticalView ? (
        <FlatList
          data={near_By?.data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            const distance = item?.distance / 1000;
            const fractionalPart = distance - Math.floor(distance);
            return (
              <TopAutoService
                closed={index === 1 ? true : false}
                onPress={() => {
                  navigation.navigate('EliteServiceDetail', {item: item});
                }}
                name={item?.name}
                rating={item?.rating === false ? 0 : item?.rating}
                distance={fractionalPart?.toFixed(2)}
              />
            );
          }}
          keyExtractor={(item, index) => item.id + index.toString()}
        />
      ) : null}

      <KeyboardAvoidingView>
        <CategoriesModal
          categoriesRef={categoriesRef}
          onPressCancel={() => {
            categoriesRef.current.close();
          }}
          onPressApply={() => {
            categoriesRef.current.close();
          }}
          onPressClear={() => {
            categoriesRef.current.close();
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default TopServiceDetail;
