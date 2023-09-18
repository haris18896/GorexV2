/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

//** moment */
import moment from 'moment';

//** component */
import {
  OrderList,
  AppButton,
  AppHeader,
  EditButton,
  PromoButton,
  RBSheetModal,
  AddVehicleModal,
  SelectVehicleModel,
  SearchInput,
  VehicleColorModal,
  VehiclePlateModal,
} from '../../../components';

//** assets */
import {appIcons, appImage} from '../../../assets';

//** redux state */
import {useDispatch, useSelector} from 'react-redux';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** theme */
import {fonts} from '../../../infrustructure/theme/fonts';
import {colors} from '../../../infrustructure/theme/colors';
import {HP, WP} from '../../../infrustructure/theme/responsive';

//** api's */
import {
  checkPromoApi,
  CreateOrderApi,
  GetPaymentMethodApi,
} from '../../../redux/App/ServiceActions/BookServiceActions';
import {showToast} from '../../../utils/common';
import {
  AddNewVehiclesApi,
  GetVehicleModelApi,
} from '../../../redux/App/MyVehiclesActions/VehiclesActions';

const MyCart = () => {
  const navigation = useNavigation<any>();

  //** state */
  const [apply, setApply] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [promoValue, setPromoValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);

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
  const {profile_data} = useSelector((state: any) => state.settingSlice);
  const {nearByService, serviceProviders, paymentMethod} = useSelector(
    (state: any) => state?.bookServiceSlice,
  );

  const timeSlots = Object.values(nearByService.timeSlots)?.[0];
  const totalPrice = nearByService?.services?.reduce(
    (total: any, service: any) => total + service.price,
    0,
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
  const [selectedVehicles, setSelectedVehicles] = useState();
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
        setSelectedVehicles(item);
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
              manufacturer: nearByService?.vehicles?.id,
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
  const getPaymentMethod = () => {
    try {
      const get_payment_body = {
        params: {
          model: 'res.partner',
          method: 'get_payment_methods',
          args: [[]],
          kwargs: {service_provider: serviceProviders?.id},
        },
      };

      dispatch(
        GetPaymentMethodApi({
          data: get_payment_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPaymentMethod();
    });
    return unsubscribe;
  });

  //** handleApplyPromo */
  const handleApplyPromo = () => {
    if (promoValue.length <= 0) {
      showToast('Error', 'Please enter coupon code', 'error');
    } else {
      try {
        setLoading(true);
        const check_promo_body = {
          driver: user?.data?.profile_id, //profile_id
          vehicle_id: nearByService?.vehicles?.id, //vehicle_id
          service_provider: serviceProviders?.id, //service_id
          // payment_method_id: expanded?.id, //payment_method_id
          coupon_codes: promoValue, //input value
          card_number: false, //same
          schedule_date: nearByService?.date, //selected date
          notes: '', //same
          on_demand: false, //same
          slot_id: timeSlots?.[0]?.id, //time_slot_id
          sub_total: totalPrice, // total price
          order_lines: [
            [
              0,
              0,
              {
                product_id: nearByService?.services?.[0]?.id,
                quantity: 1,
                price: nearByService?.services?.[0]?.price,
                total_price: nearByService?.services?.[0]?.price,
              },
            ],
          ],
        };

        dispatch(
          checkPromoApi({
            data: check_promo_body,
            callback: (_response: any) => {
              setLoading(false);
              if (isFocus) {
                setApply(true);
                setIsFocus(false);
              } else {
                setApply(false);
                setIsFocus(!isFocus);
              }
            },
            errorCallback: (_err: any) => {
              console.log('errorCallback', _err);
              setLoading(false);
              showToast('Error', _err, 'error');
            },
          }),
        );
      } catch (error) {}
    }
  };

  //** createOrder */
  const createOrder = () => {
    try {
      setContinueLoading(true);
      const create_order_body = {
        params: {
          method: 'create',
          model: 'gorex.order',
          args: [
            {
              driver: user?.data?.profile_id, //profile_id
              vehicle_id: nearByService?.vehicles?.id, //vehicle_id
              service_provider: serviceProviders?.id, //serviceprovider_id
              payment_method_id: 5, //payment method id
              card_number: false, // same
              schedule_date: nearByService?.date, //selected date
              date: nearByService?.date, //selected date
              on_demand: false,
              coupon_codes: promoValue,
              slot_id: timeSlots?.[0]?.id, // time slot and single slot is selected
              order_lines: [
                [
                  0,
                  0,
                  {
                    product_id: nearByService?.services?.[0]?.id,
                    quantity: 1,
                    price: nearByService?.services?.[0]?.price,
                    total_price: nearByService?.services?.[0]?.price,
                  },
                ],
              ],
              sub_total: totalPrice, //products total price
            },
          ],
          kwargs: {},
        },
      };
      dispatch(
        CreateOrderApi({
          data: create_order_body,
          callback: (_response: any) => {
            setContinueLoading(false);
            showToast('Success', 'Order created successfully!', 'success');
            navigation.navigate('Success', {
              params: {
                title: 'Your order has been received!',
                message:
                  'We’ve received your order and\nwill start processing it soon.',
                image: appImage.signUpSuccess,
                buttonTitle: 'View Order Details',
                route: 'OrderHistoryStack',
              },
            });
          },
          errorCallback: (_err: any) => {
            setContinueLoading(false);
            console.log('Error', _err);
            showToast('Error', _err?.message, 'error');
          },
        }),
      );
    } catch (error) {}
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#B0B3BA19',
      }}>
      <AppHeader
        title={'Checkout'}
        rightIcon={true}
        onPressHome={() => {
          navigation.navigate('Home');
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {nearByService && serviceProviders ? (
        <Fragment>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            style={{
              marginBottom: WP('26'),
            }}>
            <Text style={styles.labelTextStyle}>Vehicle</Text>
            <EditButton
              icon={appIcons.myVehiclesBlack}
              title={nearByService?.vehicles?.manufacturer[1]}
              subTitle={nearByService?.vehicles?.name}
              onPressEdit={() => {
                setAddVehicle(true);
              }}
            />

            <Text
              style={[
                styles.labelTextStyle,
                {
                  marginTop: WP('7'),
                },
              ]}>
              Services
            </Text>
            <FlatList
              data={nearByService?.services}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <EditButton
                    icon={appIcons.service}
                    title={item?.name}
                    subTitle={item?.price}
                    // detail={'Clutch Repair'}
                    color={colors.primary.main}
                  />
                );
              }}
            />

            <Text style={styles.labelTextStyle}>Booking Time</Text>
            <EditButton
              icon={appIcons.time}
              title={moment(nearByService?.date).format('MMMM D')}
              subTitle={
                timeSlots?.[0]?.start_time + '-' + timeSlots?.[0]?.end_time
              }
              color={colors.primary.main}
            />
            <Text style={styles.labelTextStyle}>Promo Code</Text>
            <PromoButton
              expanded={isFocus}
              apply={apply}
              onPressApply={() => {
                handleApplyPromo();
              }}
              onBlur={() => {
                setIsFocus(false);
              }}
              onFocus={() => {
                setIsFocus(true);
              }}
              onPressDelete={() => {
                setApply(false);
              }}
              backgroundColor={
                loading ? colors.disabled.main : colors.primary.main
              }
              value={promoValue}
              onChangeText={(text: any) => {
                setPromoValue(text);
              }}
              isLoading={loading}
            />
            <Text style={styles.labelTextStyle}>Order Summary</Text>
            <OrderList list={nearByService?.services} />
            <Text style={styles.labelTextStyle}>Payment Method</Text>
            <FlatList
              data={paymentMethod?.data}
              contentContainerStyle={{
                flexGrow: 1,
                marginBottom: 5,
              }}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.mainContainer} key={index}>
                    <Pressable
                      style={[
                        styles.contentContainer,
                        {
                          borderWidth: expanded?.id === item?.id ? 2 : 0,
                          borderColor:
                            expanded?.id === item?.id
                              ? colors.primary.main
                              : colors.background.light,
                          paddingVertical:
                            item?.name === 'Apple Pay' ? WP('5.2') : WP('4'),
                        },
                      ]}
                      onPress={() => {
                        setExpanded(prevExpanded =>
                          prevExpanded === item ? null : item,
                        );
                      }}>
                      <Image
                        source={
                          item?.name === 'COD'
                            ? appIcons.cod
                            : item?.name === 'Wallet'
                            ? appIcons.wallet
                            : item?.name === 'Apple Pay'
                            ? appIcons.applePay
                            : item?.name === 'Credit Card'
                            ? appIcons.card
                            : ''
                        }
                        resizeMode={'contain'}
                        style={styles.vehicleImageStyle}
                      />
                      <View style={styles.secondContentContainer}>
                        <Text style={styles.subTitleStyle}>{item?.name}</Text>
                        {item?.name === 'Apple Pay' ? null : (
                          <Text style={styles.titleTextStyle}>
                            {item?.name === 'COD'
                              ? 'Cash on delivery'
                              : item?.name === 'Wallet'
                              ? profile_data?.[0]?.balance
                              : item?.name === 'Credit Card'
                              ? 'No cards added, yet.'
                              : ''}
                          </Text>
                        )}
                      </View>
                      {item?.name === 'Credit Card' ? (
                        <Pressable
                          onPress={() => {}}
                          style={{
                            position: 'absolute',
                            right: WP('5'),
                          }}>
                          <Text
                            style={{
                              fontFamily: fonts.soraBold,
                              fontSize: 12,
                              color: colors.primary.main,
                              textAlign: 'left',
                            }}>
                            +ADD NEW
                          </Text>
                        </Pressable>
                      ) : (
                        <Image
                          source={
                            expanded?.id === item?.id
                              ? appIcons.checked
                              : appIcons.unChecked
                          }
                          resizeMode={'contain'}
                          style={{
                            width: 24,
                            height: 24,
                            position: 'absolute',
                            right: WP('5'),
                          }}
                        />
                      )}
                    </Pressable>
                  </View>
                );
              }}
            />
          </ScrollView>
          <View style={styles.footerContainer}>
            <View style={styles.footerContentContainer}>
              <Text style={styles.totalTextStyle}>Total</Text>
              <Text style={styles.sarTextStyle}>
                SAR <Text style={styles.footerPriceText}>{totalPrice}</Text>
              </Text>
            </View>
            <AppButton
              style={styles.bookedButtonContainer}
              title={'Complete Booking'}
              onPress={() => {
                createOrder();
              }}
              disabled={expanded ? false : true}
              backgroundColor={
                expanded ? colors.primary.main : colors.disabled.main
              }
              loading={continueLoading}
            />
          </View>
        </Fragment>
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
      )}
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
              setSelectedVehicles(selected);
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
    </View>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  labelTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'left',
    marginLeft: WP('5'),
    marginTop: WP('5'),
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
  mainContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    marginTop: WP('3'),
  },

  contentContainer: {
    maxWidth: '100%',
    backgroundColor: colors.background.light,
    paddingHorizontal: WP('5'),
    paddingVertical: WP('4'),
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleImageStyle: {
    width: 21,
    height: 17,
  },
  secondContentContainer: {
    marginHorizontal: WP('4'),
    maxWidth: '100%',
  },
  subTitleStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
    marginBottom: 2,
  },
  titleTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'left',
    width: '100%',
  },
  editContainer: {
    width: WP('19'),
    padding: WP('2'),
    borderRadius: 20,
    backgroundColor: colors.primary.main,
    position: 'absolute',
    top: WP('5'),
    right: WP('5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImageStyle: {
    width: 15,
    height: 15,
    tintColor: colors.primary.main,
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
  vehicleImage2Style: {
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
