import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';

/** Third party component */
import {AppHeader} from '../../../../components';

/** styles */
import {styles} from './styles';

/** navigation */
import {useNavigation} from '@react-navigation/native';

interface Props {}

const OfferDetails: FC<Props> = ({route}: any) => {
  //** navigation */
  const navigation = useNavigation<any>();

  const item = route.params?.params;

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={item?.name}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Image
        source={{uri: `data:image/jpeg;base64,${item?.image}`}}
        resizeMode={'cover'}
        style={styles.imageStyle}
      />
      <Text style={styles.titleTextStyle}>{item?.name}</Text>
      <Text style={styles.subTitleTextStyle}>{item?.description}</Text>
    </View>
  );
};

export default OfferDetails;
