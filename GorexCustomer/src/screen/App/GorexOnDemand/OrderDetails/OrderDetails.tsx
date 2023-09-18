/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, Pressable, Image, FlatList} from 'react-native';

//** constant list */
import {
  Order_Details_List,
  Service_Details_List,
} from '../../../../utils/constant';

//** assets */
import {appIcons} from '../../../../assets';

//** components */
import {AppHeader} from '../../../../components';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** theme */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';

const OrderDetails = () => {
  //** navigation */
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'Order# GOD4321'}
        cancel={true}
        onPressCancel={() => {
          navigation.navigate('OrderHistoryStack', {screen: 'OrderCancel'});
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.orderDetailsText}>Order Details</Text>
        <View style={styles.orderDetailContainer}>
          <FlatList
            data={Order_Details_List}
            renderItem={({item, index}) => (
              <View
                style={[
                  styles.listOrderContainer,
                  {
                    borderBottomWidth: item.id === 2 ? 0 : 1,
                    borderBottomColor: item.id === 2 ? undefined : '#B0B3BA19',
                  },
                ]}
                key={index}>
                <Text style={styles.orderTitleStyle}>{item.title}</Text>
                <Text style={styles.orderSubTitleStyle}>{item.subTitle}</Text>
              </View>
            )}
          />
        </View>
      </View>
      <View
        style={[
          styles.contentContainer,
          {
            marginTop: WP('8'),
          },
        ]}>
        <Text style={styles.orderDetailsText}>Service Details</Text>
        <View style={styles.orderDetailContainer}>
          <FlatList
            data={Service_Details_List}
            renderItem={({item, index}) => (
              <View
                style={[
                  styles.listOrderContainer,
                  {
                    borderBottomWidth: item.id === 5 ? 0 : 1,
                    borderBottomColor: item.id === 5 ? undefined : '#B0B3BA19',
                  },
                ]}
                key={index}>
                <Text style={styles.orderTitleStyle}>{item.title}</Text>
                {item.id === 4 ? (
                  <Pressable
                    style={styles.viewContainer}
                    onPress={() => {
                      navigation.navigate('OrderHistoryStack', {
                        screen: 'OrderListView',
                      });
                    }}>
                    <Text style={styles.viewTextStyle}>{item.subTitle}</Text>
                    <Image
                      source={appIcons.guestArrow}
                      style={styles.guestArrowStyle}
                      resizeMode={'contain'}
                    />
                  </Pressable>
                ) : (
                  <Text style={styles.orderSubTitleStyle}>{item.subTitle}</Text>
                )}
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  contentContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    marginTop: WP('5'),
  },
  orderDetailsText: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
  },
  orderDetailContainer: {
    maxWidth: '100%',
    // marginHorizontal: WP('1'),
    backgroundColor: colors.background.light,
    borderRadius: 13,
    padding: WP('2'),
    marginTop: WP('3'),
  },
  orderTitleStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.text.main,
  },
  orderSubTitleStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
  },
  listOrderContainer: {
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: WP('3'),
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestArrowStyle: {
    tintColor: colors.primary.main,
    width: 10,
    height: 12,
    marginLeft: WP('2'),
    alignSelf: 'center',
  },
  viewTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.primary.main,
  },
});
