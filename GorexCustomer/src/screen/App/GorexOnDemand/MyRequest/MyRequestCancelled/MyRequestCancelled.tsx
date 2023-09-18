import React from 'react';
import {View, StyleSheet, FlatList, Image, Text} from 'react-native';

//** assets */
import {appImage} from '../../../../../assets';

//** component */
import {RequestList} from '../../Feature/RequestList';

//**theme */
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {colors} from '../../../../../infrustructure/theme/colors';
import {WP} from '../../../../../infrustructure/theme/responsive';
import {useNavigation} from '@react-navigation/native';

const MyRequestCancelled = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={[1, 2]}
        renderItem={() => (
          <RequestList
            status={'CANCELLED'}
            statusBg={'#FFF2F3'}
            orderId={'Order# GOD4321'}
            orderTime={'9:00 - 10:00'}
            orderDate={'1st Apr, 2023'}
            statusTextColor={'#FF2C3C'}
            provideName={'Elite Auto Service'}
            onPressOrderDetail={() => {
              navigation.navigate('OrderDetails');
            }}
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

export default MyRequestCancelled;

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
