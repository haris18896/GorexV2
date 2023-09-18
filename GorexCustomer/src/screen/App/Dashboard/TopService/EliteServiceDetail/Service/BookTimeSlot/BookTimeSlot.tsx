/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';

//** third party component */
import {
  AppButton,
  AppHeader,
  SearchInput,
  RBSheetModal,
  AddVehicleModal,
  VehicleColorModal,
  VehiclePlateModal,
  SelectVehicleModel,
  Loader,
} from '../../../../../../../components';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** assets */
import {appIcons, appImage} from '../../../../../../../assets';

//** redux */
import {useDispatch, useSelector} from 'react-redux';

//** themes */
import {fonts} from '../../../../../../../infrustructure/theme/fonts';
import {colors} from '../../../../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../../../../infrustructure/theme/responsive';

//** api */
import {GetSlotsApi} from '../../../../../../../redux/App/ServiceActions/BookServiceActions';
import {
  updateDate,
  updateTimeSlots,
  updateVehicles,
} from '../../../../../../../redux/App/ServiceActions/BookServiceSlice';
import {
  AddNewVehiclesApi,
  GetVehicleModelApi,
} from '../../../../../../../redux/App/MyVehiclesActions/VehiclesActions';
import {ActivityIndicator} from 'react-native-paper';
import {showToast} from '../../../../../../../utils/common';

const BookTimeSlot = () => {
  //** navigation */
  const navigation = useNavigation<any>();

  //** use Ref */

  //** selectors && dispatch */
  const dispatch = useDispatch<any>();
  const {
    vehicles,
    vehicleMake,
    vehicleModel,
    isLoading,
    vehicleYear,
    vehiclesColor,
  } = useSelector((state: any) => state?.vehicleSlice);
  const {user} = useSelector((state: any) => state?.authSlice);
  const {slots} = useSelector((state: any) => state.bookServiceSlice);
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

  const [timeSlotExpanded, setTimeSlotExpanded] = useState<any>(
    nearByService?.timeSlot ? nearByService?.timeSlots : false,
  );
  const [dateSlotExpanded, setDateSlotExpanded] = useState<any>(
    nearByService?.date ? nearByService?.date : null,
  );
  //** use Ref */
  const vehicleRef = useRef<any>(null);
  const addVehicleRef = useRef<any>(null);
  const yearVehicleRef = useRef<any>(null);
  const vehicleColorRef = useRef<any>(null);
  const vehiclePlateRef = useRef<any>(null);
  const selectVehicleRef = useRef<any>(null);

  //** state */
  const [vehicle, setVehicle] = useState(false);
  const [selectedYear, setSelectedYear] = useState();
  const [addVehicle, setAddVehicle] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const [yearVehicle, setYearVehicle] = useState(false);
  const [searchVehicle, setSearchVehicle] = useState('');
  const [vehicleColor, setVehicleColor] = useState(false);
  const [vehiclePlate, setVehiclePlate] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [selectVehicle, setSelectVehicle] = useState(false);
  const [englishInputValue, setEnglishInputValue] = useState('');
  const [urduInputValue, setUrduInputValue] = useState('');
  const [otherInputValue, setOtherInputValue] = useState('');
  const [numericInputValue, setNumericInputValue] = useState('');
  const [selectedVehicleModal, setSelectedVehiclesModel] = useState();

  const filteredVehicleMake = vehicleMake.filter((item: any) =>
    item?.name.toLowerCase().includes(searchVehicle.toLowerCase()),
  );

  const filteredVehicleModel = vehicleModel.filter((item: any) =>
    item?.name.toLowerCase().includes(searchVehicle.toLowerCase()),
  );

  const [selected, setSelected] = useState<any>(vehicles[0]);

  //** render Item */
  const renderItem = (item: any) => (
    <Pressable
      style={styles.listContainer}
      onPress={() => {
        setVehicle(false);
        setSelectedVehicle(item);
        getVehicleModel(item?.id);
        setSearchVehicle('');
        setTimeout(() => {
          setSelectVehicle(true);
        }, 1000);
      }}>
      {item?.image_file !== false ? (
        <Image
          source={{uri: `data:image/jpeg;base64,${item?.image_file}`}}
          style={[
            styles.vehicleImageStyle,
            {
              tintColor: undefined,
              width: 36,
              height: 36,
              borderRadius: 36,
            },
          ]}
          resizeMode={'contain'}
        />
      ) : (
        <View style={styles.vehicleContainer}>
          <Image
            source={appIcons.myVehiclesBlack}
            style={[
              styles.vehicleImageStyle,
              {
                tintColor: colors.primary.main,
              },
            ]}
            resizeMode={'contain'}
          />
        </View>
      )}

      <Text style={styles.vehicleTextStyle}>{item?.name}</Text>
    </Pressable>
  );

  //** getVehicleModel */
  const getVehicleModel = async (vehicle_id: any) => {
    try {
      const get_Vehicle_Model_body = {
        params: {
          model: 'vehicle.model',
          method: 'search_read',
          args: [[['manufacturer', '=', vehicle_id]]],
          kwargs: {
            fields: ['id', 'name', 'manufacturer'],
          },
        },
      };

      await dispatch(
        GetVehicleModelApi({
          data: get_Vehicle_Model_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {
      console.error('Error fetching vehicle models:', error);
    }
  };

  function convertArabicToWestern(number: string) {
    return number
      .replace(/٠/g, '0')
      .replace(/١/g, '1')
      .replace(/٢/g, '2')
      .replace(/٣/g, '3')
      .replace(/٤/g, '4')
      .replace(/٥/g, '5')
      .replace(/٦/g, '6')
      .replace(/٧/g, '7')
      .replace(/٨/g, '8')
      .replace(/٩/g, '9');
  }

  function convertWesternToArabic(number: string) {
    return number
      .replace(/0/g, '٠')
      .replace(/1/g, '١')
      .replace(/2/g, '٢')
      .replace(/3/g, '٣')
      .replace(/4/g, '٤')
      .replace(/5/g, '٥')
      .replace(/6/g, '٦')
      .replace(/7/g, '٧')
      .replace(/8/g, '٨')
      .replace(/9/g, '٩');
  }

  const englishToUrduMapping = {
    A: 'أ',
    B: 'ب',
    J: 'ح',
    D: 'د',
    R: 'ر',
    S: 'س',
    X: 'ص',
    T: 'ط',
    E: 'ع',
    V: 'ى',
    G: 'ق',
    K: 'ك',
    L: 'ل',
    Z: 'م',
    N: 'ن',
    H: 'ه',
    U: 'و',
  };

  const urduToEnglishMapping = {
    أ: 'A',
    ب: 'B',
    ح: 'J',
    د: 'D',
    ر: 'R',
    س: 'S',
    ص: 'X',
    ط: 'T',
    ع: 'E',
    ى: 'V',
    ق: 'G',
    ك: 'K',
    ل: 'L',
    م: 'Z',
    ن: 'N',
    ه: 'H',
    و: 'U',
  };

  function convertEnglishToUrdu(text: any) {
    return text
      .split('')
      .map((char: any) => englishToUrduMapping[char] || char)
      .join('');
  }

  function convertUrduToEnglish(text: any) {
    return text
      .split('')
      .map((char: any) => urduToEnglishMapping[char] || char)
      .join('');
  }

  const handleInputChange = (text: string, inputType: any) => {
    if (inputType === 'english') {
      setEnglishInputValue(text);
      const urduText = convertEnglishToUrdu(text);
      setUrduInputValue(urduText);
    } else if (inputType === 'urdu') {
      setUrduInputValue(text);
      const englishText = convertUrduToEnglish(text);
      setEnglishInputValue(englishText);
    }
  };

  const handleNumericInputChange = (text: string, inputType: any) => {
    if (inputType === 'numeric') {
      setNumericInputValue(text);
      const arabicUrduNumber = convertWesternToArabic(text);
      setOtherInputValue(arabicUrduNumber);
    } else if (inputType === 'arabic') {
      setOtherInputValue(text);
      const numericNumber = convertArabicToWestern(text);
      setNumericInputValue(numericNumber);
    }
  };

  const AddNewVehicleApi = async () => {
    try {
      const add_new_Vehicle_body = {
        params: {
          method: 'create',
          model: 'gorex.vehicle',
          args: [
            {
              driver: user?.data?.profile_id,
              customer: user?.data?.profile_id,
              manufacturer: selectedVehicle?.id,
              vehicle_model: selectedVehicleModal?.id,
              year_id: selectedYear?.id,
              name: `${englishInputValue}-${numericInputValue}`,
              vehicle_color: selectedColor?.id,
            },
          ],
          kwargs: {},
        },
      };

      dispatch(
        AddNewVehiclesApi({
          data: add_new_Vehicle_body,
          callback: (_response: any) => {
            setVehiclePlate(false);
            navigation.navigate('Success', {
              params: {
                title: 'Vehicle added successfully!',
                message:
                  'Your vehicle details have been\nadded to your account.',
                image: appImage.signUpSuccess,
                buttonTitle: 'Continue',
                route: 'BottomTab',
              },
            });
          },
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {
      console.error('Error fetching vehicle models:', error);
    }
  };

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
            let initialDate = Object.keys(response)[0];
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
    const updatedTimeSlotExpanded = {
      ...timeSlotExpanded,
      [date]: timeSlotExpanded[date] ? [...timeSlotExpanded[date]] : [],
    };

    const selectedSlotsForDate = updatedTimeSlotExpanded[date];

    const slotIndex = selectedSlotsForDate.findIndex(
      (slot: any) => slot.id === item.id,
    );

    if (slotIndex !== -1) {
      selectedSlotsForDate.splice(slotIndex, 1);
    } else if (selectedSlotsForDate.length < 1) {
      selectedSlotsForDate.push(item);
    }

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

    setTimeSlotExpanded(updatedTimeSlotExpanded);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSlotsService();
    });
    return unsubscribe;
  });

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'Book Service'}
        onPress={() => {
          navigation.goBack();
        }}
        right={true}
        onPressRight={() => {
          setAddVehicle(true);
        }}
        vehicleModal={selected?.manufacturer?.[1]}
        vehicleNumber={selected?.name}
      />
      <ScrollView
        style={{
          flexGrow: 1,
          marginBottom: WP('22'),
        }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
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
            renderItem={({item, index}) => (
              <Pressable
                key={index}
                style={[
                  styles.timeSlotListContainer,
                  {
                    borderWidth:
                      nearByService.timeSlots[dateSlotExpanded]?.some(
                        (slot: any) => slot.id === item.id,
                      ) || timeSlotExpanded[dateSlotExpanded]?.includes(item)
                        ? 1
                        : 0,
                    borderColor:
                      nearByService.timeSlots[dateSlotExpanded]?.some(
                        (slot: any) => slot.id === item.id,
                      ) || timeSlotExpanded[dateSlotExpanded]?.includes(item)
                        ? colors.primary.main
                        : colors.background.light,
                  },
                ]}
                onPress={() => {
                  selectTimeSlotHandler(dateSlotExpanded, item);
                }}>
                <Image
                  source={
                    nearByService.timeSlots[dateSlotExpanded]?.some(
                      (slot: any) => slot.id === item.id,
                    ) || timeSlotExpanded[dateSlotExpanded]?.includes(item)
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
            SAR{' '}
            <Text style={styles.footerPriceText}>
              {nearByService?.services[0]?.price}
            </Text>
          </Text>
        </View>
        <AppButton
          style={styles.bookedButtonContainer}
          title={'Continue to Checkout'}
          onPress={() => {
            navigation.navigate('MyCartStack', {
              screen: 'MyCart',
            });
            dispatch(updateTimeSlots(timeSlotExpanded));
            dispatch(updateDate(dateSlotExpanded));
            dispatch(updateVehicles(selected));
          }}
          disabled={timeSlotExpanded !== false ? false : true}
          backgroundColor={
            timeSlotExpanded !== false
              ? colors.primary.main
              : colors.disabled.main
          }
        />
      </View>
      <KeyboardAvoidingView>
        <RBSheetModal
          refRBSheet={addVehicleRef}
          open={addVehicle}
          height={HP('58')}
          onClose={() => {
            setAddVehicle(false);
          }}
          title={'Select Vehicle'}
          draggable={false}
          backgroundColor={'#F2F2F2'}>
          <AddVehicleModal
            onPressAddNew={() => {
              setAddVehicle(false);
              setTimeout(() => {
                setVehicle(true);
              }, 300);
            }}
            list={vehicles}
            onPressSelectVehicle={(selected: any) => {
              setSelectedVehicle(selected);
              setAddVehicle(false);
            }}
          />
        </RBSheetModal>

        <RBSheetModal
          refRBSheet={addVehicleRef}
          open={addVehicle}
          height={HP('58')}
          onClose={() => {
            setAddVehicle(false);
          }}
          title={'Select Vehicle'}
          draggable={false}
          backgroundColor={'#F2F2F2'}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              marginBottom: WP('3'),
            }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.listMainContainer}>
              {vehicles.map((item: any, index: any) => (
                <Pressable
                  key={index}
                  style={[
                    styles.listContainer2,
                    {
                      borderWidth: selected === item ? 1.5 : 0,
                      borderColor:
                        selected === item
                          ? colors.primary.main
                          : colors.background.light,
                    },
                  ]}
                  onPress={() => {
                    setSelected((prevExpanded: any) =>
                      prevExpanded === item ? null : item,
                    );
                  }}>
                  <View style={styles.listContentContainer}>
                    <Image
                      source={appIcons.myVehiclesBlack}
                      resizeMode={'contain'}
                      style={styles.vehicleImageStyle2}
                    />
                  </View>
                  <View style={styles.listSecondContent}>
                    <Text style={styles.carModalTextStyle}>
                      {item.manufacturer[1]}
                    </Text>
                    <Text style={styles.plateTextStyle}>{item.name}</Text>
                    <View style={styles.carDetailContainer}>
                      <View style={styles.carDetailContainer}>
                        <Text style={styles.valueTextStyle}>
                          Model
                          <Text style={styles.nameTextStyle}>
                            {'\n'}
                            {item?.vehicle_model[1]}
                          </Text>
                        </Text>
                        <Text style={styles.valueTextStyle}>
                          Year
                          <Text style={styles.nameTextStyle}>
                            {'\n'}
                            {item?.year_id[1]}
                          </Text>
                        </Text>
                        <Text style={styles.valueTextStyle}>
                          Color
                          <Text style={styles.nameTextStyle}>
                            {'\n'}
                            {item?.vehicle_color[1]}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Image
                    source={
                      selected === item ? appIcons.checked : appIcons.unChecked
                    }
                    resizeMode={'contain'}
                    style={{
                      width: 24,
                      height: 24,
                      position: 'absolute',
                      top: WP('5'),
                      right: WP('5'),
                    }}
                  />
                </Pressable>
              ))}
            </View>
            <Pressable
              style={styles.addVehicleContainer}
              onPress={() => {
                setAddVehicle(false);
                setTimeout(() => {
                  setVehicle(true);
                }, 300);
              }}>
              <View style={styles.listContentContainer}>
                <Image
                  source={appIcons.myVehiclesBlack}
                  resizeMode={'contain'}
                  style={styles.vehicleImageStyle2}
                />
              </View>
              <Text style={styles.addVehicleTextStyle}>+Add New Vehicle</Text>
            </Pressable>

            <AppButton
              title={'Select Vehicle'}
              onPress={() => {
                setSelected(selected);
                setAddVehicle(false);
              }}
              style={styles.buttonContainer}
            />
          </ScrollView>
        </RBSheetModal>

        <RBSheetModal
          refRBSheet={vehicleRef}
          open={vehicle}
          height={HP('90')}
          onClose={() => {
            setVehicle(false);
          }}
          title={'Select vehicle'}>
          <View
            style={{
              marginTop: WP('5'),
            }}>
            <SearchInput
              placeholder={'Search for your vehicle'}
              value={searchVehicle}
              onChangeText={(text: string) => {
                setSearchVehicle(text);
              }}
              inputStyle={styles.inputStyle}
            />
          </View>

          <FlatList
            refreshControl={<RefreshControl refreshing={isLoading} />}
            data={filteredVehicleMake}
            numColumns={2}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(_item, index) => `${index}`}
            ListEmptyComponent={
              isLoading ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: WP('80'),
                  }}>
                  <ActivityIndicator
                    size={'small'}
                    color={colors.primary.main}
                  />
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
        </RBSheetModal>

        <RBSheetModal
          refRBSheet={selectVehicleRef}
          height={HP('58')}
          open={selectVehicle}
          onClose={() => {
            setSelectVehicle(false);
          }}
          title={'Select Vehicle Model'}>
          <SelectVehicleModel
            onPress={(item: any) => {
              setSelectVehicle(false);
              setSelectedVehiclesModel(item);
              setTimeout(() => {
                setYearVehicle(true);
              }, 300);
            }}
            data={filteredVehicleModel}
            refreshControl={<RefreshControl refreshing={isLoading} />}
            value={searchVehicle}
            onChangeText={(text: any) => {
              setSearchVehicle(text);
            }}
            isLoading={isLoading}
          />
        </RBSheetModal>

        <RBSheetModal
          refRBSheet={yearVehicleRef}
          height={HP('50')}
          open={yearVehicle}
          onClose={() => {
            setYearVehicle(false);
          }}
          title={'Select Year'}>
          <View
            style={{
              flex: 0.76,
              marginTop: WP('10'),
            }}>
            <FlatList
              data={vehicleYear}
              contentContainerStyle={{
                marginBottom: WP('70'),
              }}
              showsVerticalScrollIndicator={false}
              decelerationRate="fast"
              snapToAlignment="start"
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    setSelectedYear(item);
                  }}
                  style={
                    selectedYear === item
                      ? {
                          maxWidth: '100%',
                          marginHorizontal: WP('5'),
                          borderRadius: 9,
                          backgroundColor: '#F4F4F5',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: WP('4'),
                        }
                      : {
                          maxWidth: '100%',
                          padding: WP('3'),
                        }
                  }>
                  <Text
                    style={{
                      fontFamily: fonts.soraMedium,
                      fontSize: 17,
                      color: '#4D4D4D',
                      textAlign: 'center',
                    }}>
                    {item?.year}
                  </Text>
                </Pressable>
              )}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={
                isLoading ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: WP('80'),
                    }}>
                    <ActivityIndicator
                      size={'small'}
                      color={colors.primary.main}
                    />
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
                      // marginVertical: WP('55'),
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
          </View>
          <View
            style={{
              maxWidth: '100%',
              marginTop: WP('3'),
              position: 'absolute',
              bottom: WP('6'),
              alignSelf: 'center',
            }}>
            <AppButton
              title={'Select'}
              onPress={() => {
                setYearVehicle(false);
                setTimeout(() => {
                  setVehicleColor(true);
                }, 300);
              }}
              disabled={selectedYear !== null ? false : true}
              backgroundColor={
                selectedYear !== null
                  ? colors.primary.main
                  : colors.disabled.main
              }
            />
          </View>
        </RBSheetModal>

        <RBSheetModal
          refRBSheet={vehicleColorRef}
          height={HP('80')}
          open={vehicleColor}
          onClose={() => {
            setVehicleColor(false);
          }}
          title={'Select Vehicle Color'}>
          <VehicleColorModal
            onPress={(item: any) => {
              setVehicleColor(false);
              setSelectedColor(item);
              setTimeout(() => {
                setVehiclePlate(true);
              }, 300);
            }}
            data={vehiclesColor}
          />
        </RBSheetModal>

        <RBSheetModal
          refRBSheet={vehiclePlateRef}
          height={HP('40')}
          open={vehiclePlate}
          onClose={() => {
            setVehiclePlate(false);
            setOtherInputValue('');
            setNumericInputValue('');
            setEnglishInputValue('');
            setUrduInputValue('');
          }}
          title={'Vehicle Plate Number'}>
          <VehiclePlateModal
            isLoading={isLoading}
            alphabetInputValue={englishInputValue}
            arabicValue={otherInputValue}
            urduValue={urduInputValue}
            numericInputValue={numericInputValue}
            onPress={() => {
              AddNewVehicleApi();
            }}
            onChangeAlphabet={(text: string) => {
              handleInputChange(text, 'english');
            }}
            onChangeNumeric={(text: string) => {
              handleNumericInputChange(text, 'numeric');
            }}
            onChangeArabic={(text: string) => {
              handleNumericInputChange(text, 'arabic');
            }}
            onChangeUrdu={(text: string) => {
              handleInputChange(text, 'urdu');
            }}
          />
        </RBSheetModal>
      </KeyboardAvoidingView>

      <Loader visible={isLoading} />
    </View>
  );
};

export default BookTimeSlot;

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
});
