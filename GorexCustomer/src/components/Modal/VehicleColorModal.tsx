/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, StyleSheet, Image, FlatList, Pressable} from 'react-native';
import {WP} from '../../infrustructure/theme/responsive';
import {appImage} from '../../assets';

interface Props {
  data: any;
  onPress?: (item: any) => void;
}

const VehicleColorModal: FC<Props> = ({onPress, data}) => {
  const renderItem = (item: any) => {
    return (
      <Pressable
        style={{
          width: WP('43'),
          padding: WP('6'),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#B0B3BA19',
          borderRadius: 16,
          marginHorizontal: WP('1.7'),
          marginBottom: WP('3'),
        }}
        onPress={() => {
          onPress(item);
        }}>
        <Image
          source={appImage.car}
          resizeMode={'cover'}
          style={{
            width: 99.66,
            height: 35.52,
            tintColor: item?.name
              ? item?.name.toLowerCase().toString()
              : 'white',
          }}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        numColumns={2}
        horizontal={false}
        contentContainerStyle={{
          flex: 1,
          marginTop: WP('8'),
          alignItems: 'center',
        }}
        renderItem={({item}) => renderItem(item)}
      />
    </View>
  );
};

export {VehicleColorModal};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
