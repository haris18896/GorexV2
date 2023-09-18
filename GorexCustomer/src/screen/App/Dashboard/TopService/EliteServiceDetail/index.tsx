import React, {FC} from 'react';
import {View} from 'react-native';

/** My Tabs */
import MyTabs from '../../../../../navigation/TopTab';

/** styles */
import {styles} from './styles';

interface Props {
  route: any;
}

const EliteServiceDetail: FC<Props> = ({route}) => {
  const item = route?.params?.item;

  return (
    <View style={styles.mainContainer}>
      <MyTabs customItem={item} />
    </View>
  );
};

export default EliteServiceDetail;
