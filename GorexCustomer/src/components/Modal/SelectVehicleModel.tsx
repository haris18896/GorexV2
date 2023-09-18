/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

//**theme */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

//** third party component */
import {SearchInput} from '../Input/SearchInput';

//**Interface Props */
interface Props {
  onPress?: (item: any) => void;
  data: any;
  value: any;
  onChangeText: any;
  refreshControl: any;
  isLoading: any;
}

const SelectVehicleModel: FC<Props> = ({
  data,
  value,
  onPress,
  onChangeText,
  refreshControl,
  isLoading,
}) => {
  return (
    <View style={styles.mainContainer}>
      <SearchInput
        placeholder={'Search for your vehicle'}
        value={value}
        onChangeText={onChangeText}
        inputStyle={styles.inputStyle}
      />
      <FlatList
        data={data}
        refreshControl={refreshControl}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: WP('4'),
        }}
        renderItem={({item}) => (
          <Pressable
            style={styles.lisContainer}
            onPress={() => {
              onPress(item);
            }}>
            <Text style={styles.listTextStyle}>{item?.name}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.emptyStyle}>
              <Text style={styles.waitTextStyle}>Please wait for a moment</Text>
            </View>
          ) : (
            <View style={styles.emptyStyle}>
              <Text style={styles.waitTextStyle}>No data found</Text>
            </View>
          )
        }
      />
    </View>
  );
};

export {SelectVehicleModel};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  inputStyle: {
    borderRadius: 12,
    marginVertical: WP('4'),
  },
  lisContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5.8'),
    borderBottomWidth: 1,
    borderBottomColor: '#B0B3BA19',
    marginBottom: WP('5'),
  },
  listTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 15,
    color: colors.text.main,
    // marginBottom: WP('4'),
    bottom: WP('2'),
  },
  emptyStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'center',
    marginTop: 10,
  },
});
