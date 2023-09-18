import React from 'react';
import {View, StyleSheet, FlatList, Image, Text} from 'react-native';

//** assets */
import {appImage} from '../../../../../assets';

//** component */
import {RequestList} from '../../Feature/RequestList';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//**theme */
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {colors} from '../../../../../infrustructure/theme/colors';
import {WP} from '../../../../../infrustructure/theme/responsive';

const MyRequestConfirmed = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={[1, 2]}
        renderItem={() => (
          <RequestList
            status={'CONFIRMED'}
            statusBg={'#4AD5940F'}
            orderId={'Order# GOD4321'}
            orderTime={'9:00 - 10:00'}
            statusTextColor={'#17B26A'}
            orderDate={'1st Apr, 2023'}
            onPressOrderDetail={() => {
              navigation.navigate('OrderDetails');
            }}
            provideName={'Elite Auto Service'}
          />
        )}
        ListEmptyComponent={
          <View style={styles.noDatContainer}>
            <Image
              source={appImage.noData}
              resizeMode={'contain'}
              style={styles.noDataImage}
            />
            <Text style={styles.noDataTextStyle}>No data available.</Text>
            <Text style={styles.displayTextStyle}>
              There’s nothing to display here yet.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default MyRequestConfirmed;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  noDatContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: WP('40'),
  },
  noDataImage: {
    width: 192,
    height: 160,
    marginBottom: WP('4'),
  },
  noDataTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 20,
    color: colors.text.main,
    textAlign: 'center',
  },
  displayTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 16,
    color: '#B8B9C1',
    textAlign: 'center',
    marginTop: 10,
  },
});
