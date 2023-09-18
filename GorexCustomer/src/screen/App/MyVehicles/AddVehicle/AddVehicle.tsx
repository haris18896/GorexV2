/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

//** third party component */
import {
  AddVehicleModal,
  AppButton,
  AppHeader,
  RBSheetModal,
  SearchInput,
  SelectVehicleModel,
  VehicleColorModal,
  VehicleInput,
  VehiclePlateModal,
} from '../../../../components';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** assets */
import {appIcons, appImage} from '../../../../assets';

//** theme */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {colors} from '../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../infrustructure/theme/responsive';

//** redux */
import {useDispatch, useSelector} from 'react-redux';
import {
  AddNewVehiclesApi,
  GetVehicleColorApi,
  GetVehicleMakeApi,
  GetVehicleModelApi,
  GetVehicleYearApi,
} from '../../../../redux/App/MyVehiclesActions/VehiclesActions';

const AddVehicle = () => {
  const navigation = useNavigation<any>();
  //** use Ref */
  const vehicleRef = useRef<any>(null);
  const addVehicleRef = useRef<any>(null);
  const yearVehicleRef = useRef<any>(null);
  const vehicleColorRef = useRef<any>(null);
  const vehiclePlateRef = useRef<any>(null);
  const selectVehicleRef = useRef<any>(null);

  //** state */
  const [vehicle, setVehicle] = useState(false);
  const [confirmYear, setConfirmYear] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [addVehicle, setAddVehicle] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const [yearVehicle, setYearVehicle] = useState(false);
  const [searchVehicle, setSearchVehicle] = useState('');
  const [vehicleColor, setVehicleColor] = useState(false);
  const [vehiclePlate, setVehiclePlate] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [selectVehicle, setSelectVehicle] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState('');
  const [numericInputValue, setNumericInputValue] = useState('');
  const [englishInputValue, setEnglishInputValue] = useState('');
  const [urduInputValue, setUrduInputValue] = useState('');

  // useEffect(() => {
  //   setSelectedVehiclesModel();
  // }, [selectedVehicle]);

  //** redux */
  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state.authSlice);
  const {
    vehicleMake,
    vehicleModel,
    isLoading,
    vehicleYear,
    vehiclesColor,
    vehicles,
  } = useSelector((state: any) => state?.vehicleSlice);

  const filteredVehicleMake = vehicleMake.filter((item: any) =>
    item?.name.toLowerCase().includes(searchVehicle.toLowerCase()),
  );

  const filteredVehicleModel = vehicleModel.filter((item: any) =>
    item?.name.toLowerCase().includes(searchVehicle.toLowerCase()),
  );

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

  const handleApi = async () => {
    await getVehicleMake();
    await getVehicleYear();
    await getVehicleColors();
  };

  useEffect(() => {
    handleApi();
  }, [navigation]);

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
      .map(char => englishToUrduMapping[char] || char)
      .join('');
  }

  function convertUrduToEnglish(text: any) {
    return text
      .split('')
      .map(char => urduToEnglishMapping[char] || char)
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <AppHeader
        title={'Add Vehicle'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <VehicleInput
        vehicleImage={appIcons.vehicle}
        vehicleLabel={'Vehicle Make'}
        vehicleName={
          selectedVehicle ? selectedVehicle?.name : 'Please select vehicle'
        }
        onPress={() => {
          setVehicle(true);
        }}
      />
      <VehicleInput
        vehicleImage={appIcons.vehicle}
        vehicleLabel={'Vehicle Model'}
        vehicleName={
          selectedVehicleModal
            ? selectedVehicleModal?.name
            : 'Please select vehicle model'
        }
        onPress={() => {
          setSelectVehicle(true);
        }}
        disabled={selectedVehicle !== undefined ? false : true}
        style={{
          opacity: selectedVehicle !== undefined ? 1 : 0.45,
        }}
      />
      <VehicleInput
        vehicleImage={appIcons.vehicle}
        vehicleLabel={'Year'}
        vehicleName={
          confirmYear ? confirmYear?.year : 'Please select vehicle year'
        }
        onPress={() => {
          setYearVehicle(true);
        }}
        disabled={selectedVehicleModal !== undefined ? false : true}
        style={{
          opacity: selectedVehicleModal !== undefined ? 1 : 0.45,
        }}
      />
      <VehicleInput
        vehicleImage={appIcons.vehicle}
        vehicleLabel={'Vehicle Color'}
        vehicleName={
          selectedColor ? selectedColor?.name : 'Please select a vehicle color'
        }
        onPress={() => {}}
        disabled={selectedYear !== undefined ? false : true}
        style={{
          opacity: selectedYear !== undefined ? 1 : 0.45,
        }}
      />
      <VehicleInput
        vehicleImage={appIcons.vehicle}
        vehicleLabel={'Vehicle Plate Number'}
        vehicleName={'Please enter vehicle plate number'}
        onPress={() => {
          setVehiclePlate(true);
        }}
        disabled={selectedColor !== undefined ? false : true}
        style={{
          opacity: selectedColor !== undefined ? 1 : 0.45,
        }}
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
              }, 1000);
            }}
            list={vehicles}
          />
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
                setConfirmYear(selectedYear);
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

export default AddVehicle;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalMainContainer: {
    paddingHorizontal: WP('4.5'),
    paddingTop: WP('4.5'),
    backgroundColor: colors.background.light,
  },
  modalContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 63,
    padding: WP('0.6'),
    backgroundColor: colors.disabled.light,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cancelIconContainer: {
    width: WP('8'),
    height: WP('8'),
    backgroundColor: colors.disabled.light,
    borderRadius: WP('10'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: WP('6'),
    right: WP('6'),
  },
  closeSheetStyle: {
    width: 36,
    height: 36,
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
  inputStyle: {
    borderRadius: 12,
  },
  emptyStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'center',
    marginTop: 10,
  },
});
