import {View, Text, KeyboardAvoidingView} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../infrustructure/theme/colors';
import {PaymentHeader} from './Features/PaymentHeader';
import {appIcons} from '../../../assets';
import {styles} from './styles';
import {HomeListModal} from '../../../components';
import PaymentMethodTabs from '../../../navigation/TopTab/PaymentMethodTabs';

const Payment = () => {
  //**React UseRef Hook */
  const listRef = useRef<any>(null);

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <PaymentMethodTabs />
    </View>
  );
};

export default Payment;
