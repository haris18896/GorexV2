/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  RefreshControl,
  FlatList,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../../../../../infrustructure/theme/colors';
import {AppButton, AppHeader} from '../../../../../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {GetSlotsApi} from '../../../../../redux/App/ServiceActions/BookServiceActions';
import {showToast} from '../../../../../utils/common';
import {WP} from '../../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {
  updateDate,
  updateTimeSlots,
  updateVehicles,
} from '../../../../../redux/App/ServiceActions/BookServiceSlice';
import {appIcons, appImage} from '../../../../../assets';
import {GetAddressApi} from '../../../../../redux/App/SettingActions/SettingActions';

const GoDChooseAddressAndSlots = ({route}: any) => {
  const vehicle = route?.params?.vehicle;

  //** navigation */
  const navigation = useNavigation<any>();

  //** selectors && dispatch */
  const dispatch = useDispatch<any>();
  const {slots, isLoading} = useSelector(
    (state: any) => state.bookServiceSlice,
  );
  const {user} = useSelector((state: any) => state.authSlice);
  const {address} = useSelector((state: any) => state.settingSlice);
  const {nearByService} = useSelector((state: any) => state?.bookServiceSlice);

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dateNo = Object.keys(slots);

  //** states */
  const [timeSlotExpanded, setTimeSlotExpanded] = useState<any>(
    nearByService?.timeSlot ? nearByService?.timeSlots : false,
  );
  const [dateSlotExpanded, setDateSlotExpanded] = useState<any>(
    nearByService?.date ? nearByService?.date : null,
  );
  const [onSelectAddress, setOnSelectAddress] = useState<any>(false);

  //** getNearBy */
  const getSlotsService = () => {
    try {
      const get_slots_body = {
        params: {
          model: 'gorex.slot',
          method: 'get_unique_dates_slots',
          args: [[]],
          kwargs: {service: nearByService?.services[0]?.id},
        },
      };

      dispatch(
        GetSlotsApi({
          data: get_slots_body,
          callback: (response: any) => {
            let initialDate = Object.keys(response)?.[0];
            setDateSlotExpanded(initialDate);
            if (nearByService?.date) {
              setDateSlotExpanded(nearByService?.date || dateSlotExpanded);
            } else {
              setDateSlotExpanded(initialDate);
            }
          },
          errorCallback: (err: any) => {
            showToast('Error', err?.message, 'error');
          },
        }),
      );
    } catch (error) {}
  };

  const selectTimeSlotHandler = (date: any, item: any) => {
    setTimeSlotExpanded((prevState: any) => {
      const updatedTimeSlotExpanded = {
        ...prevState,
        [date]: [item], // Replace the array with a new one containing the selected item
      };

      // Reset time slots for other dates
      for (const otherDate in updatedTimeSlotExpanded) {
        if (otherDate !== date) {
          updatedTimeSlotExpanded[otherDate] = [];
        }
        // Remove date key if time slots array is empty
        if (updatedTimeSlotExpanded[otherDate].length === 0) {
          delete updatedTimeSlotExpanded[otherDate];
        }
      }

      return updatedTimeSlotExpanded;
    });
  };

  const getAddress = () => {
    try {
      const get_address_body = {
        params: {
          model: 'customer.address',
          method: 'search_read',
          args: [[['partner_id', '=', user?.data?.profile_id]]],

          kwargs: {
            context: {lang: 'ar_001'},
            fields: ['id', 'name', 'address', 'latitude', 'longitude'],
          },
        },
      };

      dispatch(
        GetAddressApi({
          data: get_address_body,
          callback: (_response: any) => {},
          errorCallback: (err: any) => {
            showToast('Error', err?.data?.message, 'error');
          },
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAddress();
      getSlotsService();
    });
    return unsubscribe;
  });

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'Gorex on Demand'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={{
          flexGrow: 1,
          marginBottom: WP('22'),
        }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <View style={styles.listHeaderContainer}>
          <Text style={styles.listHeaderTitle}>Select Vehicle</Text>
          <Pressable onPress={() => {}}>
            <Text style={styles.listHeaderSubTitle}>+Add New</Text>
          </Pressable>
        </View>
        <FlatList
          data={address}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={getAddress} />
          }
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                setOnSelectAddress((selectAddress: any) =>
                  selectAddress === item ? null : item,
                );
              }}
              style={{
                maxWidth: '100%',
                marginHorizontal: WP('5'),
                backgroundColor: colors.background.light,
                paddingHorizontal: WP('4'),
                paddingVertical: WP('4'),
                borderRadius: 13,
                marginTop: WP('3'),
                flexDirection: 'row',
                borderWidth: onSelectAddress === item ? 2 : 0,
                borderColor:
                  onSelectAddress === item
                    ? colors.primary.main
                    : colors.background.light,
              }}>
              <Image
                source={
                  item?.name === 'Work' ? appIcons.activeWork : appIcons.address
                }
                style={{
                  width: 50,
                  height: 50,
                }}
                resizeMode={'contain'}
              />
              <View
                style={{
                  marginLeft: WP('4'),
                  width: WP('58'),
                }}>
                <Text
                  style={{
                    fontFamily: fonts.soraMedium,
                    fontSize: 14,
                    color: '#B0B3BA',
                    textAlign: 'left',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                    fontSize: 16,
                    color: colors.text.main,
                    marginTop: WP('0.4'),
                    textAlign: 'left',
                  }}>
                  {item?.address}
                </Text>
                {/* <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 12,
                  color: '#B0B3BA',
                  marginTop: WP('0.4'),
                  textAlign: 'left',
                }}>
                Al Imam Saud Ibn Abdul Aziz Branch Rd, Al{'\n'}
                Mohammadiyyah, Riyadh 12363, Saudi{'\n'}Arabia.
              </Text> */}
              </View>
              <View>
                <Image
                  source={
                    onSelectAddress === item
                      ? appIcons.checked
                      : appIcons.unChecked
                  }
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  resizeMode={'contain'}
                />
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            isLoading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: WP('80'),
                }}>
                <ActivityIndicator size={'small'} color={colors.primary.main} />
                <Text
                  style={{
                    fontFamily: fonts.soraSemiBold,
                    fontSize: 18,
                    color: colors.text.main,
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Please wait a moment
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginVertical: WP('65'),
                }}>
                <Image
                  source={appImage.noData}
                  resizeMode={'contain'}
                  style={{
                    width: 192,
                    height: 160,
                    marginBottom: WP('4'),
                  }}
                />
                <Text
                  style={{
                    fontFamily: fonts.soraBold,
                    fontSize: 20,
                    color: colors.text.main,
                    textAlign: 'center',
                  }}>
                  No data available.
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.soraMedium,
                    fontSize: 16,
                    color: '#B8B9C1',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  There’s nothing to display here yet.
                </Text>
              </View>
            )
          }
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitleTextStyle}>Choose Service Date</Text>
          <Text style={styles.headerSubtitleTextStyle}>
            Select a day that works for you
          </Text>
          <View style={styles.contentContainer}>
            <View style={styles.selectDayContainer}>
              <Image
                source={appIcons.time}
                resizeMode={'contain'}
                style={styles.calendarStyle}
              />
              <Text style={styles.selectDayTextStyle}>Select Day</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {Object.keys(slots).map(item => {
                const dayName = dayNames[new Date(item).getDay()].substring(
                  0,
                  3,
                );
                return (
                  <Pressable
                    onPress={() => {
                      setDateSlotExpanded((prevExpanded: string | null) =>
                        prevExpanded === item ? null : item,
                      );
                    }}
                    style={[
                      styles.daysContainer,
                      {
                        borderColor:
                          dateSlotExpanded === item
                            ? colors.primary.main
                            : 'transparent',
                        borderWidth: dateSlotExpanded === item ? 1.5 : 0,
                        borderRadius: dateSlotExpanded === item ? 10 : 0,
                      },
                    ]}>
                    <View>
                      <Text
                        style={[
                          styles.dayTextStyle,
                          {
                            color:
                              dateSlotExpanded === item
                                ? colors.primary.main
                                : '#B0B3BA',
                          },
                        ]}>
                        {dayName}
                      </Text>
                      <Text
                        style={[
                          styles.dateTextStyle,
                          {
                            color:
                              dateSlotExpanded === item
                                ? colors.primary.main
                                : '#17151F',
                          },
                        ]}>
                        {item.split('-')[2]}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
            <Text
              style={[
                styles.todayTextStyle,
                {
                  top: dateSlotExpanded === dateNo[0] ? WP('28') : WP('27'),
                  color:
                    dateSlotExpanded === dateNo[0]
                      ? colors.primary.main
                      : '#17151F',
                },
              ]}>
              TODAY
            </Text>
          </View>
        </View>

        <View style={styles.timeSlotHeaderContainer}>
          <FlatList
            data={slots[dateSlotExpanded] || []}
            numColumns={2}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getSlotsService}
              />
            }
            contentContainerStyle={{
              flexGrow: 1,
              marginBottom: WP('5'),
            }}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
              <View>
                <Text style={styles.headerTitleTextStyle}>
                  Reserve Preferred Timeslot
                </Text>
                <Text style={styles.headerSubtitleTextStyle}>
                  Select a time that fits your schedule
                </Text>
              </View>
            )}
            renderItem={({item, index}: any) => (
              <Pressable
                key={index}
                style={[
                  styles.timeSlotListContainer,
                  {
                    borderWidth:
                      nearByService.timeSlots?.[dateSlotExpanded]?.some(
                        (slot: any) => slot.id === item.id,
                      ) || timeSlotExpanded?.[dateSlotExpanded]?.includes(item)
                        ? 1
                        : 0,
                    borderColor:
                      nearByService.timeSlots?.[dateSlotExpanded]?.some(
                        (slot: any) => slot.id === item.id,
                      ) || timeSlotExpanded?.[dateSlotExpanded]?.includes(item)
                        ? colors.primary.main
                        : colors.background.light,
                  },
                ]}
                onPress={() => {
                  selectTimeSlotHandler(dateSlotExpanded, item);
                }}>
                <Image
                  source={
                    nearByService.timeSlots?.[dateSlotExpanded]?.some(
                      (slot: any) => slot.id === item.id,
                    ) || timeSlotExpanded?.[dateSlotExpanded]?.includes(item)
                      ? appIcons.checked
                      : appIcons.unChecked
                  }
                  resizeMode={'contain'}
                  style={[styles.listIconStyle]}
                />
                <Text style={styles.listTextStyle}>
                  {item?.start_time} - {item?.end_time}
                </Text>
              </Pressable>
            )}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: WP('22'),
                }}>
                <Image
                  source={appImage.noTimeSlot}
                  resizeMode={'contain'}
                  style={{
                    width: 110,
                    height: 110,
                    marginBottom: WP('3'),
                  }}
                />
                <Text
                  style={{
                    fontFamily: fonts.soraBold,
                    fontSize: 20,
                    color: 'No timeslots available.',
                    textAlign: 'center',
                  }}>
                  No timeslots available.
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.soraMedium,
                    fontSize: 16,
                    color: '#B8B9C1',
                    textAlign: 'center',
                  }}>
                  Please choose another date.
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.footerContentContainer}>
          <Text style={styles.totalTextStyle}>Total</Text>
          <Text style={styles.sarTextStyle}>
            SAR <Text style={styles.footerPriceText}>0.00</Text>
          </Text>
        </View>
        <AppButton
          style={styles.bookedButtonContainer}
          title={'Next'}
          onPress={() => {
            navigation.navigate('MyCartStack', {
              screen: 'MyCart',
            });
            dispatch(updateTimeSlots(timeSlotExpanded));
            dispatch(updateDate(dateSlotExpanded));
            dispatch(updateVehicles(vehicle));
          }}
          disabled={timeSlotExpanded !== false ? false : true}
          backgroundColor={
            timeSlotExpanded !== false
              ? colors.primary.main
              : colors.disabled.main
          }
        />
      </View>
    </View>
  );
};

export default GoDChooseAddressAndSlots;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  headerTextContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    marginVertical: WP('6'),
    paddingBottom: WP('3'),
  },
  headerTitleTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'left',
  },
  headerSubtitleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'left',
  },
  contentContainer: {
    maxWidth: '100%',
    backgroundColor: colors.background.light,
    padding: WP('3'),
    marginHorizontal: WP('0.5'),
    borderRadius: 16,
    marginTop: WP('5'),
    paddingBottom: WP('6'),
  },
  selectDayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('2'),
  },
  calendarStyle: {
    width: 24,
    height: 24,
    tintColor: colors.primary.main,
  },
  selectDayTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP('4'),
  },
  daysContainer: {
    width: WP('10'),
    padding: 3,
    marginVertical: WP('5'),
    alignItems: 'center',
    marginLeft: WP('1.5'),
  },
  dayTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 10,
    color: '#B0B3BA',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  dateTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 20,
    color: '#17151F',
    textAlign: 'left',
  },
  todayTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 10,
    color: '#17151F',
    textAlign: 'left',
    position: 'absolute',
    left: WP('5'),
  },
  timeSlotHeaderContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
  },
  timeSlotListContainer: {
    width: '47%',
    padding: WP('3'),
    backgroundColor: colors.background.light,
    borderRadius: 16,
    marginTop: WP('4'),
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: WP('4.5'),
  },
  listIconStyle: {
    width: 24,
    height: 24,
  },
  listTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: '#17151F',
    textAlign: 'center',
    marginLeft: WP('3'),
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
    justifyContent: 'center',
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
  bookedButtonContainer: {
    width: WP('51'),
    marginTop: -40,
    marginLeft: WP('15'),
  },
  modalContainer2: {
    backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalMainContainer2: {
    width: WP('100'),
    padding: WP('5'),
    backgroundColor: colors.background.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalContentContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer2: {
    width: 63,
    height: 6,
    backgroundColor: colors.disabled.light,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cancelIconContainer2: {
    width: WP('8'),
    height: WP('8'),
    backgroundColor: colors.disabled.light,
    borderRadius: WP('10'),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeSheetStyle2: {
    width: 36,
    height: 36,
  },
  listMainContainer: {
    maxWidth: '100%',
    position: 'relative',
  },
  listContainer2: {
    backgroundColor: colors.background.light,
    padding: WP('3'),
    marginTop: WP('5'),
    marginHorizontal: WP('5'),
    borderRadius: 13,
    flexDirection: 'row',
  },
  buttonContainer: {
    marginBottom: WP('5'),
    marginTop: WP('5'),
    width: WP('90'),
  },
  listContentContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#4AD5940F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleImageStyle2: {
    width: 24,
    height: 19,
    tintColor: colors.primary.main,
  },
  listSecondContent: {
    marginLeft: WP('5'),
    maxWidth: '100%',
  },
  carModalTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'left',
  },
  plateTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
  },
  carDetailContainer: {
    width: WP('50'),
    flexDirection: 'row',
    marginTop: WP('2'),
    marginBottom: WP('2'),
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#B0B3BA19',
  },
  carDetailContentContainer: {
    marginRight: WP('10'),
  },
  valueTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 12,
    color: colors.text.main,
    textAlign: 'left',
  },
  nameTextStyle: {
    fontFamily: fonts.soraRegular,
    color: '#B0B3BA',
  },
  addVehicleContainer: {
    maxWidth: '100%',
    paddingHorizontal: WP('5'),
    paddingVertical: WP('1'),
    borderRadius: 16,
    borderColor: colors.primary.main,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginHorizontal: WP('5'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('5'),
  },
  addVehicleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.primary.main,
    flex: 1,
    textAlign: 'center',
  },
  inputStyle: {
    borderRadius: 12,
  },
  listContainer: {
    width: WP('42'),
    padding: WP('3'),
    backgroundColor: '#B0B3BA19',
    borderRadius: 16,
    maxWidth: '100%',
    marginHorizontal: WP('2'),
    marginVertical: WP('2'),
  },
  vehicleContainer: {
    width: 36,
    height: 36,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4AD5940F',
    marginBottom: WP('2'),
  },
  vehicleImageStyle: {
    width: 17,
    height: 14,
    tintColor: colors.primary.main,
  },
  vehicleTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
  },
  selectVehicleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'left',
    position: 'absolute',
    top: WP('13'),
    left: WP('7'),
  },
  contentContainerStyle: {
    flexGrow: 1,
    marginHorizontal: WP('4'),
  },
  listHeaderContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: WP('5'),
  },
  listHeaderTitle: {
    fontSize: 18,
    fontFamily: fonts.soraBold,
    color: colors.text.main,
  },
  listHeaderSubTitle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.primary.main,
  },
});
