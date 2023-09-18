/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../../../../../infrustructure/theme/colors';
import {
  Loader,
  AppButton,
  AppHeader,
  SearchInput,
  RBSheetModal,
  AddVehicleModal,
  VehicleColorModal,
  VehiclePlateModal,
  SelectVehicleModel,
} from '../../../../../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetVehiclesApi,
  AddNewVehiclesApi,
  GetVehicleMakeApi,
  GetVehicleYearApi,
  GetVehicleModelApi,
  GetVehicleColorApi,
} from '../../../../../redux/App/MyVehiclesActions/VehiclesActions';
import {appIcons, appImage} from '../../../../../assets';
import {HP, WP} from '../../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {GetAvailableServiceApi} from '../../../../../redux/App/ServiceActions/BookServiceActions';
import {styles} from './styles';
import {
  getServiceProviders,
  updateServices,
} from '../../../../../redux/App/ServiceActions/BookServiceSlice';

const GoDChooseVehicles = () => {
  //** use Ref */
  const vehicleRef = useRef<any>(null);
  const addVehicleRef = useRef<any>(null);
  const yearVehicleRef = useRef<any>(null);
  const vehicleColorRef = useRef<any>(null);
  const vehiclePlateRef = useRef<any>(null);
  const selectVehicleRef = useRef<any>(null);

  //** state */
  const [expanded, setExpanded] = useState<any>();
  const [vehicle, setVehicle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<any>();
  const [addVehicle, setAddVehicle] = useState<any>(false);
  const [selectedColor, setSelectedColor] = useState<any>();
  const [yearVehicle, setYearVehicle] = useState<any>(false);
  const [searchVehicle, setSearchVehicle] = useState<any>('');
  const [vehicleColor, setVehicleColor] = useState<any>(false);
  const [vehiclePlate, setVehiclePlate] = useState<any>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>();
  const [urduInputValue, setUrduInputValue] = useState<any>('');
  const [selectVehicle, setSelectVehicle] = useState<any>(false);
  const [otherInputValue, setOtherInputValue] = useState<any>('');
  const [selectedServices, setSelectedServices] = useState<any>([]);
  const [numericInputValue, setNumericInputValue] = useState<any>('');
  const [englishInputValue, setEnglishInputValue] = useState<any>('');
  const [selectedVehicleModal, setSelectedVehiclesModel] = useState<any>();
  const [godSelectedVehicle, setGodSelectedVehicle] = useState<any>(false);

  //** navigation */
  const navigation = useNavigation<any>();

  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state?.authSlice);
  const {
    vehicles,
    isLoading,
    vehicleMake,
    vehicleYear,
    vehicleModel,
    vehiclesColor,
  } = useSelector((state: any) => state?.vehicleSlice);
  const {availableServices} = useSelector(
    (state: any) => state.bookServiceSlice,
  );

  const filteredVehicleMake = vehicleMake.filter((item: any) =>
    item?.name.toLowerCase().includes(searchVehicle.toLowerCase()),
  );

  const filteredVehicleModel = vehicleModel.filter((item: any) =>
    item?.name.toLowerCase().includes(searchVehicle.toLowerCase()),
  );

  const [selected, setSelected] = useState<any>(null);

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

  const renderItemService = (item: any) => {
    return (
      <Fragment>
        {expanded === item ? (
          <Pressable
            onPress={() => {
              setExpanded('');
              setSelectedServices([]);
            }}
            style={styles.accordionContainer}>
            <View style={styles.accordionContentContainer}>
              <View style={styles.listContentContainer4}>
                <Image
                  source={
                    expanded?.id === item?.id
                      ? appIcons.checked
                      : appIcons.unChecked
                  }
                  resizeMode={'contain'}
                  style={styles.verifiedImageStyle}
                />
                <Text style={styles.oilChangeTextStyle}>{item?.name}</Text>
              </View>
            </View>
            {/* <View style={styles.startContainer}> */}
            <Image
              source={appIcons.arrowUp}
              resizeMode={'contain'}
              style={[
                styles.arrowStyle,
                {
                  position: 'absolute',
                  right: WP('5'),
                  top: WP('6'),
                },
              ]}
            />
            {/* </View> */}
            {item?.services.map((obj: any) => (
              <Pressable
                style={styles.accordionSecondContent}
                onPress={() => {
                  toggleItemSelection(obj);
                }}>
                <View style={styles.listContentContainer4}>
                  <Image
                    source={
                      selectedServices?.some(
                        (service: any) => service.id === obj.id,
                      )
                        ? appIcons.checked
                        : appIcons.unChecked
                    }
                    resizeMode={'contain'}
                    style={styles.verifiedImageStyle}
                  />
                  <Text style={[styles.oilChangeTextStyle, {fontSize: 14}]}>
                    {obj?.name}
                  </Text>
                </View>
              </Pressable>
            ))}
          </Pressable>
        ) : (
          <Pressable
            key={item.id}
            style={styles.listContainer4}
            onPress={() => {
              setExpanded((prevExpanded: any) =>
                prevExpanded === item ? null : item,
              );
            }}>
            <View style={styles.listContentContainer4}>
              <Image
                source={expanded ? appIcons.checked : appIcons.unChecked}
                resizeMode={'contain'}
                style={styles.verifiedImageStyle}
              />
              <Text style={styles.oilChangeTextStyle}>{item?.name}</Text>
            </View>
            {/* <View style={styles.startContainer}> */}
            <Image
              source={appIcons.downArrow}
              resizeMode={'contain'}
              style={[
                styles.arrowStyle,
                {
                  position: 'absolute',
                  right: WP('5'),
                  top: WP('7.5'),
                },
              ]}
            />
            {/* </View> */}
          </Pressable>
        )}
      </Fragment>
    );
  };

  //** getVehicleMake */
  const getVehicleMake = () => {
    try {
      const get_Vehicle_Make_body = {
        params: {
          model: 'gorex.manufacturer',
          method: 'search_read',
          args: [],
          kwargs: {
            fields: ['id', 'name', 'image_file'],
          },
        },
      };

      dispatch(
        GetVehicleMakeApi({
          data: get_Vehicle_Make_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

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

  //** getVehicleYear */
  const getVehicleYear = () => {
    try {
      const get_Vehicle_Year_body = {
        params: {
          model: 'gorex.year',
          method: 'search_read',
          args: [],
          kwargs: {
            fields: ['id', 'year'],
          },
        },
      };

      dispatch(
        GetVehicleYearApi({
          data: get_Vehicle_Year_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {
      console.error('Error fetching vehicle models:', error);
    }
  };

  //** getVehicleYear */
  const getVehicleColors = () => {
    try {
      const get_Vehicle_Color_body = {
        params: {
          model: 'vehicle.color',
          method: 'search_read',
          args: [],
          kwargs: {
            fields: ['name'],
          },
        },
      };

      dispatch(
        GetVehicleColorApi({
          data: get_Vehicle_Color_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {
      console.error('Error fetching vehicle models:', error);
    }
  };

  //** getNearBy */
  const getVehicles = () => {
    try {
      setLoading(true);
      const get_Vehicle_body = {
        params: {
          model: 'gorex.vehicle',
          method: 'search_read',
          args: [[['customer', '=', user?.data?.profile_id]]],
          kwargs: {
            fields: [
              'driver',
              'customer',
              'manufacturer',
              'vehicle_model',
              'vehicle_variant',
              'year_id',
              'name',
              'file',
              'is_primary',
              'vehicle_color',
            ],
          },
        },
      };

      dispatch(
        GetVehiclesApi({
          data: get_Vehicle_body,
          callback: (response: any) => {
            setSelected(response[0]);
            setGodSelectedVehicle(response[0]);
            setLoading(false);
          },
          errorCallback: (_err: any) => {
            setLoading(false);
          },
        }),
      );
    } catch (error) {}
  };

  //** getNearBy */
  const getAvailableService = () => {
    try {
      const get_Available_Service_body = {
        params: {
          model: 'res.partner',
          method: 'get_available_services_of_branch',
          args: [[]],
          kwargs: {branch: 115, filter: false},
        },
      };

      dispatch(
        GetAvailableServiceApi({
          data: get_Available_Service_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  const toggleItemSelection = (item: any) => {
    if (selectedServices.includes(item)) {
      setSelectedServices(
        selectedServices.filter((selected: any) => selected !== item),
      );
    } else {
      setSelectedServices([...selectedServices, item]);
    }
  };

  const handleApi = async () => {
    await getVehicles();
    await getVehicleMake();
    await getVehicleYear();
    await getVehicleColors();
    await getAvailableService();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      handleApi();
    });
    return unsubscribe;
  });

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

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'Gorex on Demand'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.listHeaderContainer}>
        <Text style={styles.listHeaderTitle}>Select Vehicle</Text>
        <Pressable
          onPress={() => {
            setAddVehicle(true);
          }}>
          <Text style={styles.listHeaderSubTitle}>+Add New</Text>
        </Pressable>
      </View>
      <FlatList
        data={vehicles}
        horizontal={true}
        style={{
          flexGrow: 0.01,
        }}
        renderItem={({item}) => (
          <View style={styles.listMainContainer3}>
            <Pressable
              style={[
                styles.listContainer3,
                {
                  borderWidth: godSelectedVehicle === item ? 2 : 0,
                  borderColor:
                    godSelectedVehicle === item
                      ? colors.primary.main
                      : undefined,
                },
              ]}
              onPress={() => {
                setGodSelectedVehicle((chooseVehicle: any) =>
                  chooseVehicle === item ? null : item,
                );
              }}>
              <View style={styles.listContentContainer3}>
                <Image
                  source={appIcons.myVehiclesBlack}
                  resizeMode={'contain'}
                  style={styles.vehicleImageStyle}
                />
              </View>
              <Image
                source={
                  godSelectedVehicle === item
                    ? appIcons.checked
                    : appIcons.unChecked
                }
                resizeMode={'contain'}
                style={styles.listIconStyle}
              />
              <View style={styles.listSecondContent}>
                <Text style={styles.carModalTextStyle}>
                  {item.manufacturer?.[1]}
                </Text>
                <Text style={styles.plateTextStyle}>{item?.name}</Text>
                <View style={styles.carDetailContainer}>
                  <Text style={styles.valueTextStyle}>
                    Model
                    <Text style={styles.nameTextStyle}>
                      {'\n'}
                      {item?.vehicle_model?.[1]}
                    </Text>
                  </Text>
                  <Text style={styles.valueTextStyle}>
                    Year
                    <Text style={styles.nameTextStyle}>
                      {'\n'}
                      {item?.year_id?.[1]}
                    </Text>
                  </Text>
                  <Text style={styles.valueTextStyle}>
                    Color
                    <Text style={styles.nameTextStyle}>
                      {'\n'}
                      {item?.vehicle_color?.[1]}
                    </Text>
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        )}
      />

      <FlatList
        data={availableServices}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ListHeaderComponent={
          <View>
            {availableServices && (
              <>
                <Text style={styles.availableTextStyle}>
                  Available Services
                </Text>
                <Text style={styles.selectMoreTextStyle}>
                  Select one or more.
                </Text>
              </>
            )}
          </View>
        }
        renderItem={({item}) => renderItemService(item)}
        keyExtractor={({item}) => item?.id}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              padding: WP(5),
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: WP('14'),
            }}>
            <Image
              source={appImage.noServices}
              resizeMode={'contain'}
              style={{
                width: 190.3,
                height: 160,
              }}
            />
            <Text
              style={{
                fontFamily: fonts.soraBold,
                fontSize: 20,
                color: colors.text.main,
                marginTop: WP('3'),
                textAlign: 'center',
              }}>
              No services available.
            </Text>
            <Text
              style={{
                fontFamily: fonts.soraMedium,
                fontSize: 16,
                color: '#B8B9C1',
                textAlign: 'center',
              }}>
              Sorry, there are no services{'\n'}currently available.
            </Text>
          </View>
        }
      />

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
                  style={styles.vehicleImageStyle}
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
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getVehicleMake}
              />
            }
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
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getVehicleMake}
              />
            }
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
            // dispatch(getServiceProviders(''));
            dispatch(updateServices(selectedServices));
            navigation.navigate('GoDChooseAddressAndSlots', {
              vehicle: godSelectedVehicle,
            });
          }}
          disabled={selectedServices.length !== 0 ? false : true}
          backgroundColor={
            selectedServices.length !== 0
              ? colors?.primary?.main
              : colors.disabled.main
          }
        />
      </View>
      <Loader visible={loading} />
    </View>
  );
};

export default GoDChooseVehicles;
