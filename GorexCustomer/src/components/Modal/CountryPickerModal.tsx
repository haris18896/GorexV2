import {View, Button} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, {Children, FC} from 'react';

interface Props {
  pickerRef?: any;
  children?: any;
  container?: any;
}

const CountryPickerModal: FC<Props> = ({pickerRef, children, container}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <RBSheet
        ref={pickerRef}
        height={320}
        openDuration={250}
        customStyles={{
          container: container,
        }}>
        {children}
      </RBSheet>
    </View>
  );
};

export {CountryPickerModal};
