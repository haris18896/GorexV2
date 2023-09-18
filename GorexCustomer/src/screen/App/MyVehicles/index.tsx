/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Platform,
  StatusBar,
  Pressable,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../infrustructure/theme/colors';
import {AppButton, HomeListModal, RBSheetModal} from '../../../components';
import {HP, WP} from '../../../infrustructure/theme/responsive';
import {appIcons, appImage} from '../../../assets';
import {fonts} from '../../../infrustructure/theme/fonts';
import {Choose_Vehicle_List} from '../../../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  DeleteVehicleApi,
  GetVehicleMakeApi,
  GetVehiclesApi,
  SetVehicleAsPrimaryApi,
} from '../../../redux/App/MyVehiclesActions/VehiclesActions';
import {SearchInput} from '../../../components';

const MyVehicles = () => {
  const navigation = useNavigation<any>();
  const listRef = useRef<any>(null);
  //** use Ref */
  const actionRef = useRef<any>(null);
  const vehicleRef = useRef<any>(null);

  //** state */
  const [vehicle, setVehicle] = useState(false);
  const [action, setAction] = useState(false);
  const [vehicleId, setVehicleId] = useState();
  const [searchVehicle, setSearchVehicle] = useState('');

  const {user} = useSelector((state: any) => state?.authSlice);
  const {vehicles, isLoading, vehicleMake} = useSelector(
    (state: any) => state?.vehicleSlice,
  );
  const dispatch = useDispatch<any>();

  const statusBarHeight = StatusBar.currentHeight ?? 0;

  const filteredData = vehicleMake.filter((item: any) =>
    item?.name.toLowerCase().includes(searchVehicle.toLowerCase()),
  );

  const renderItem = (item: any) => (
    <Pressable
      style={styles.listContainer2}
      onPress={() => {
        setVehicle(false);
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

  //** getNearBy */
  const getVehicles = () => {
    try {
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
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
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

  //** getNearBy */
  const SetVehicleAsPrimary = () => {
    try {
      const get_Vehicle_Primary_body = {
        vehicle_id: vehicleId,
      };

      dispatch(
        SetVehicleAsPrimaryApi({
          data: get_Vehicle_Primary_body,
          callback: (_response: any) => {
            setAction(false);
            getVehicles();
          },
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  const handleDeleteVehicle = () => {
    try {
      const delete_Vehicle_body = {
        params: {
          model: 'gorex.vehicle',
          method: 'write',
          args: [
            [vehicleId],
            {
              active: false,
            },
          ],
          kwargs: {},
        },
      };

      dispatch(
        DeleteVehicleApi({
          data: delete_Vehicle_body,
          callback: (_response: any) => {
            setAction(false);
            getVehicles();
          },
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getVehicles();
      getVehicleMake();
    });
    return unsubscribe;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <View
        style={[
          styles.headerMainContainer,
          {
            height:
              Platform.OS === 'android' ? HP(13) - statusBarHeight : WP('30'),
            paddingTop: Platform.OS === 'android' ? WP('-10') : WP('13'),
            paddingHorizontal: Platform.OS === 'android' ? WP('7') : 0,
          },
        ]}>
        <Pressable
          onPress={() => {
            listRef.current.open();
          }}>
          <Image
            source={appIcons.menuIcon}
            resizeMode={'contain'}
            style={[
              styles.imageStyle,
              {
                marginLeft: Platform.OS === 'ios' ? WP('5') : 0,
              },
            ]}
          />
        </Pressable>
        <Text style={styles.titleStyle}>My Vehicles</Text>
        <Pressable
          style={[
            styles.markAsContainer,
            {
              top: Platform?.OS === 'ios' ? WP('17') : WP('4'),
            },
          ]}
          onPress={() => {
            navigation.navigate('MyVehicleStack', {screen: 'AddVehicle'});
          }}>
          <Image
            source={appIcons.add}
            resizeMode={'contain'}
            style={styles.asReadImage}
          />
          <Text style={styles.asReadTextStyle}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={vehicles}
        showsVerticalScrollIndicator={false}
        style={{
          flexGrow: 1,
        }}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.listContainer}>
              <View style={styles.listContentContainer}>
                <Image
                  source={
                    item?.file !== false
                      ? {uri: item?.file}
                      : appIcons.myVehiclesBlack
                  }
                  resizeMode={'contain'}
                  style={styles.vehicleImageStyle}
                />
              </View>
              <View style={styles.listSecondContent}>
                <Text style={styles.carModalTextStyle}>
                  {item.manufacturer[1]}
                </Text>
                <Text style={styles.plateTextStyle}>{item?.name}</Text>
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
                <Pressable
                  onPress={() => {
                    navigation.navigate('MyVehicleStack', {
                      screen: 'ViewProfile',
                      params: {
                        vehicles: item,
                      },
                    });
                  }}
                  style={{
                    flexDirection: 'row',
                    marginTop: WP('2'),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={appIcons.openEye}
                    resizeMode={'contain'}
                    style={{
                      width: 19,
                      height: 14,
                      tintColor: colors.primary.main,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.soraBold,
                      fontSize: 14,
                      color: colors.primary.main,
                      marginLeft: WP('3'),
                    }}>
                    View Profile
                  </Text>
                </Pressable>
              </View>
              {item?.is_primary === true && (
                <View
                  style={{
                    maxWidth: '100%',
                    backgroundColor: colors.primary.main,
                    paddingHorizontal: WP('2'),
                    paddingVertical: WP('1.5'),
                    borderRadius: 18,
                    flexDirection: 'row',
                    position: 'absolute',
                    top: WP('5'),
                    right: WP('15'),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={appIcons.primary}
                    resizeMode={'contain'}
                    style={{
                      width: 10,
                      height: 8,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: WP('1'),
                      marginRight: WP('5'),
                      fontFamily: fonts.soraBold,
                      fontSize: 10,
                      color: colors.background.light,
                    }}>
                    PRIMARY
                  </Text>
                </View>
              )}
              <Pressable
                style={{
                  position: 'absolute',
                  top: WP('5'),
                  right: WP('5'),
                }}
                onPress={() => {
                  setAction(true);
                  setVehicleId(item?.id);
                }}>
                <Image
                  source={appIcons.cvv}
                  resizeMode={'contain'}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </Pressable>
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getVehicles} />
        }
        ListEmptyComponent={
          isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: WP('80'),
              }}>
              <ActivityIndicator size={'small'} />
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

      <KeyboardAvoidingView>
        <HomeListModal
          listRef={listRef}
          onPressCancel={() => {
            listRef.current.close();
          }}
        />
        <RBSheetModal
          refRBSheet={actionRef}
          open={action}
          height={HP('32')}
          onClose={() => {
            setAction(false);
          }}
          title={'Choose Action'}
          draggable={true}>
          <View
            style={{
              marginVertical: WP('5'),
            }}>
            <FlatList
              data={Choose_Vehicle_List}
              renderItem={({item, index}) => (
                <Pressable
                  onPress={() => {
                    if (item.id === 0) {
                      setAction(false);
                      setTimeout(() => {
                        setVehicle(true);
                      }, 300);
                    } else {
                      SetVehicleAsPrimary();
                    }
                  }}
                  key={index}
                  style={{
                    maxWidth: '100%',
                    paddingHorizontal: WP('6'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: WP('5'),
                  }}>
                  <Image
                    source={item.image}
                    resizeMode={'contain'}
                    style={{
                      height: 16,
                      width: 14,
                      tintColor: colors.primary.main,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.soraSemiBold,
                      fontSize: 16,
                      color: colors.text.main,
                      textAlign: 'left',
                      marginHorizontal: WP('2'),
                    }}>
                    {item.title}
                  </Text>
                </Pressable>
              )}
            />
            <AppButton
              title={'Delete Profile'}
              onPress={() => {
                handleDeleteVehicle();
              }}
              style={styles.buttonContainer}
              backgroundColor={colors.errors.main}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
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
            data={filteredData}
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default MyVehicles;

const styles = StyleSheet.create({
  headerMainContainer: {
    maxWidth: WP('100'),
    backgroundColor: colors.background.light,
    borderBottomWidth: 2,
    borderBottomColor: '#0000000D',
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: WP('3'),
    position: 'relative',
  },
  markAsContainer: {
    position: 'absolute',
    right: WP('5'),
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 18,
    paddingVertical: WP('2.2'),
  },
  asReadImage: {
    width: 15,
    height: 15,
    marginRight: WP('1'),
    marginLeft: WP('3'),
  },
  asReadTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.background.light,
    marginRight: WP('7'),
    marginLeft: WP('1.5'),
  },

  imageStyle: {
    width: 24,
    height: 24,
    tintColor: colors.primary.main,
  },
  titleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    marginLeft: 16,
  },
  listMainContainer: {
    maxWidth: '100%',
    position: 'relative',
  },
  listContainer: {
    backgroundColor: colors.background.light,
    padding: WP('3'),
    marginTop: WP('2'),
    marginHorizontal: WP('5'),
    borderRadius: 13,
    flexDirection: 'row',
    marginBottom: 10,
  },
  listContainer2: {
    width: WP('42'),
    padding: WP('3'),
    backgroundColor: '#B0B3BA19',
    borderRadius: 16,
    maxWidth: '100%',
    marginHorizontal: WP('2'),
    marginVertical: WP('2'),
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
  vehicleImageStyle: {
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
    marginTop: WP('1'),
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
    marginBottom: WP('5'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 12,
    color: colors.text.main,
    textAlign: 'left',
    marginBottom: WP('3'),
  },
  nameTextStyle: {
    fontFamily: fonts.soraRegular,
    color: '#B0B3BA',
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
  vehicleContainer: {
    width: 36,
    height: 36,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4AD5940F',
    marginBottom: WP('2'),
  },
  vehicleTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
  },
});
