/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {Fragment, useRef, useState} from 'react';
import {colors} from '../../../../../../../infrustructure/theme/colors';
import {fonts} from '../../../../../../../infrustructure/theme/fonts';
import {WP} from '../../../../../../../infrustructure/theme/responsive';
import {AppButton, ServiceTypeModal} from '../../../../../../../components';
import {appIcons} from '../../../../../../../assets';
import {Available_Packages_List} from '../../../../../../../utils/constant';
import {useNavigation} from '@react-navigation/native';

const BookPackage = () => {
  const typeRef = useRef<any>(null);
  const [expanded, setExpanded] = useState(false);

  const navigation = useNavigation();

  const renderItem = (item: any) => {
    return (
      <Fragment>
        {expanded === item ? (
          <Pressable
            onPress={() => {
              setExpanded(false);
            }}
            style={styles.expandedContainer}>
            <View style={styles.expandedContentContainer}>
              <View>
                <Text style={styles.titleTextStyle}>{item.title}</Text>
                <Text style={styles.subTitleStyle}>{item.subTitle}</Text>
              </View>
              <Text style={styles.priceTextStyle}>{item.price}</Text>
            </View>
            <Pressable
              style={styles.showPackageContainer}
              onPress={() => {
                typeRef.current.open();
              }}>
              <Text style={styles.showPackageTextStyle}>
                Show Package Details
              </Text>
              <View style={[styles.buttonContainerStyle]}>
                <Text style={styles.buttonTextStyle}>Remove</Text>
              </View>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setExpanded(prevExpanded =>
                prevExpanded === item ? null : item,
              );
            }}
            style={styles.listContainerStyle}>
            <View style={styles.expandedContentContainer}>
              <View>
                <Text style={styles.titleTextStyle}>{item.title}</Text>
                <Text style={styles.subTitleStyle}>{item.subTitle}</Text>
              </View>
              <Text style={styles.priceTextStyle}>{item.price}</Text>
            </View>
            <Pressable
              style={styles.showPackageContainer}
              onPress={() => {
                typeRef.current.open();
              }}>
              <Text style={styles.showPackageTextStyle}>
                Show Package Details
              </Text>
              <View style={styles.listButtonContainer}>
                <Text style={styles.buttonTextStyle}>Select</Text>
              </View>
            </Pressable>
          </Pressable>
        )}
      </Fragment>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <Text style={styles.selectServiceStyle}>Select Package Type</Text>
        <View style={styles.contentContainer}>
          <Image
            source={appIcons.subs}
            resizeMode={'contain'}
            style={styles.subStyle}
          />
          <Pressable
            style={styles.serviceTypeContainer}
            onPress={() => {
              typeRef.current.open();
            }}>
            <Text style={styles.serviceTypeStyle}>Select Package Type</Text>
            <Text style={styles.allServiceStyle}>All Packages</Text>
          </Pressable>
          <View style={styles.arrowContainer}>
            <Image
              source={appIcons.arrowUp}
              resizeMode={'contain'}
              style={styles.arrowUpStyle}
            />
            <Image
              source={appIcons.downArrow}
              resizeMode={'contain'}
              style={styles.arrowUpStyle}
            />
          </View>
        </View>
        <Text style={styles.availableTextStyle}>Available Packages</Text>
        <Text style={styles.selectMoreTextStyle}>Select one package only.</Text>
        <FlatList
          data={Available_Packages_List}
          renderItem={({item}) => renderItem(item)}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{
            flexGrow: 1,
            marginBottom: WP('18'),
          }}
        />
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.footerContentContainer}>
          <Text style={styles.totalTextStyle}>Total</Text>
          <Text style={styles.sarTextStyle}>
            SAR <Text style={styles.footerPriceText}>45.99</Text>
          </Text>
        </View>
        <AppButton
          style={styles.bookedButtonContainer}
          title={'Booking Time'}
          onPress={() => {
            navigation.navigate('BookTimeSlot');
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <ServiceTypeModal
          typeRef={typeRef}
          onPressCancel={() => {
            typeRef.current.close();
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default BookPackage;

const styles = StyleSheet.create({
  bookedButtonContainer: {
    width: WP('51'),
    marginTop: -40,
    marginLeft: WP('15'),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#B0B3BA19',
  },
  selectServiceStyle: {
    textAlign: 'left',
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    paddingTop: WP('7'),
    paddingHorizontal: WP('4'),
    marginBottom: WP('4'),
  },
  contentContainer: {
    width: WP('92'),
    padding: WP('4'),
    alignSelf: 'center',
    backgroundColor: colors.background.light,
    borderRadius: 13,
    flexDirection: 'row',
    paddingHorizontal: WP('5'),
  },
  subStyle: {
    width: 20,
    height: 20,
    tintColor: colors.primary.main,
    alignSelf: 'center',
  },
  serviceTypeContainer: {
    width: WP('76'),
    paddingHorizontal: WP('3'),
  },
  serviceTypeStyle: {
    textAlign: 'left',
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: '#B0B3BA',
  },
  allServiceStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowUpStyle: {
    width: 7,
    height: 10,
  },
  availableTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'left',
    paddingTop: WP('7'),
    paddingHorizontal: WP('4'),
  },
  selectMoreTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'left',
    paddingHorizontal: WP('4'),
    marginBottom: WP('4'),
  },
  footerContainer: {
    width: WP('100'),
    backgroundColor: colors.background.light,
    padding: WP('3'),
    flexDirection: 'row',
    borderTopColor: '#B8B9C133',
    borderTopWidth: 1,
    paddingTop: WP('15'),
    alignItems: 'center',
    paddingBottom: WP('6'),
    position: 'absolute',
    bottom: WP('1'),
  },
  footerContentContainer: {
    marginTop: WP(-10),
  },
  totalTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: '#B0B3BA',
    textAlign: 'left',
  },
  sarTextStyle: {
    fontFamily: fonts.soraRegular,
    fontSize: 20,
    color: colors.text.main,
    textAlign: 'left',
  },
  footerPriceText: {
    color: colors.primary.main,
    fontFamily: fonts.soraBold,
  },
  expandedContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    backgroundColor: colors.background.light,
    borderRadius: 16,
    padding: WP('2'),
    marginBottom: WP('3.5'),
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  expandedContentContainer: {
    flexDirection: 'row',
    padding: WP('4'),
  },
  titleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.text.main,
  },
  subTitleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
  },
  priceTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    position: 'absolute',
    top: WP('4'),
    right: WP('4'),
  },
  showPackageContainer: {
    flexDirection: 'row',
    padding: WP('4'),
    marginBottom: WP('2'),
  },
  showPackageTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.primary.main,
    textDecorationLine: 'underline',
  },
  buttonContainerStyle: {
    maxWidth: '100%',
    marginHorizontal: WP('10'),
    backgroundColor: colors.text.dark,
    padding: WP('2'),
    borderRadius: 9,
    paddingHorizontal: WP('6'),
    position: 'absolute',
    top: WP('1.5'),
    right: WP('-7'),
  },
  buttonTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: colors.background.light,
  },
  listContainerStyle: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    backgroundColor: colors.background.light,
    borderRadius: 16,
    padding: WP('2'),
    marginBottom: WP('3.5'),
  },
  listButtonContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('10'),
    backgroundColor: colors.primary.main,
    padding: WP('2'),
    borderRadius: 9,
    paddingHorizontal: WP('8'),
    position: 'absolute',
    top: WP('1.5'),
    right: WP('-7'),
  },
});
