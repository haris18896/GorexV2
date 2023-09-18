/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

//**theme */
import {WP} from '../../infrustructure/theme/responsive';

import DatePicker from 'react-native-date-picker';
import {AppButton} from '../Button/AppButton';

//**Interface Props */
interface Props {
  pickerOpen: boolean;
  onPress?: () => void;
}

const YearVehicleModal: FC<Props> = ({pickerOpen, onPress}) => {
  //** state */
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  //** useEffect */
  useEffect(() => {
    setShowDatePicker(pickerOpen);
  }, [pickerOpen]);

  const YearPicker = ({date, onDateChange}) => {
    return (
      <View style={styles.datePicker}>
        <DatePicker
          date={date}
          onDateChange={onDateChange}
          mode={'date'}
          androidVariant="nativeAndroid"
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {showDatePicker && <YearPicker date={date} onDateChange={setDate} />}
      <View
        style={{
          marginTop: WP('3'),
          position: 'absolute',
          top: WP('50'),
        }}>
        <AppButton title={'Select'} onPress={onPress} />
      </View>
    </View>
  );
};

export {YearVehicleModal};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  datePicker: {
    maxWidth: '100%',
    marginTop: WP('5'),
    position: 'absolute',
    top: WP('5'),
    bottom: WP('10'),
  },
  yearText: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
});
