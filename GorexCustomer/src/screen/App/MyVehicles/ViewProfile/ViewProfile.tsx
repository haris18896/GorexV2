/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {AppButton, RBSheetModal, SearchInput} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {HP, WP} from '../../../../infrustructure/theme/responsive';
import {appIcons, appImage} from '../../../../assets';
import {fonts} from '../../../../infrustructure/theme/fonts';
import {Choose_Vehicle_List} from '../../../../utils/constant';
import {
  DeleteVehicleApi,
  SetVehicleAsPrimaryApi,
} from '../../../../redux/App/MyVehiclesActions/VehiclesActions';
import {useDispatch, useSelector} from 'react-redux';

const ViewProfile = ({route}: any) => {
  const navigation = useNavigation<any>();
  const vehicles = route?.params?.vehicles;
  //** use Ref */
  const actionRef = useRef<any>(null);
  const vehicleRef = useRef<any>(null);

  //** state */
  const [vehicle, setVehicle] = useState(false);
  const [action, setAction] = useState(false);
  const [searchVehicle, setSearchVehicle] = useState('');

  const statusBarHeight = StatusBar.currentHeight ?? 0;

  const dispatch = useDispatch<any>();
  const {isLoading, vehicleMake} = useSelector(
    (state: any) => state?.vehicleSlice,
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      vehicleMake;
    });
    return unsubscribe;
  });

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
  const SetVehicleAsPrimary = () => {
    try {
      const get_Vehicle_Primary_body = {
        vehicle_id: vehicles?.id,
      };

      dispatch(
        SetVehicleAsPrimaryApi({
          data: get_Vehicle_Primary_body,
          callback: (_response: any) => {
            setAction(false);
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
            [vehicles?.id],
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
            navigation.goBack();
          },
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

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
            navigation.goBack();
          }}>
          <Image
            source={appIcons.backArrow}
            resizeMode={'contain'}
            style={styles.imageStyle}
          />
        </Pressable>
        <Text style={styles.titleStyle}>{vehicles?.name} Profile</Text>
        <Pressable
          onPress={() => {
            setAction(true);
          }}
          style={{
            position: 'absolute',
            right: WP('5'),
            top: Platform.OS === 'ios' ? WP('17') : WP('4'),
          }}>
          <Image
            source={appIcons.options}
            resizeMode={'contain'}
            style={{
              height: 32,
              width: 32,
            }}
          />
        </Pressable>
      </View>

      <View style={styles.listMainContainer}>
        <View style={styles.listContainer}>
          <View style={styles.listContentContainer}>
            <Image
              source={appIcons.myVehiclesBlack}
              resizeMode={'contain'}
              style={styles.vehicleImageStyle}
            />
          </View>
          <View style={styles.listSecondContent}>
            <Text style={styles.carModalTextStyle}>
              {vehicles.manufacturer?.[1]}
            </Text>
            <Text style={styles.plateTextStyle}>{vehicles.name}</Text>
            <View style={styles.carDetailContainer}>
              <Text style={styles.valueTextStyle}>
                Model
                <Text style={styles.nameTextStyle}>
                  {'\n'}
                  {vehicles?.vehicle_model?.[1]}
                </Text>
              </Text>
              <Text style={styles.valueTextStyle}>
                Year
                <Text style={styles.nameTextStyle}>
                  {'\n'}
                  {vehicles?.year_id?.[1]}
                </Text>
              </Text>
              <Text style={styles.valueTextStyle}>
                Color
                <Text style={styles.nameTextStyle}>
                  {'\n'}
                  {vehicles?.vehicle_color?.[1]}
                </Text>
              </Text>
            </View>
          </View>
          {vehicles?.is_primary === true && (
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
                right: WP('5'),
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
        </View>
      </View>

      <View
        style={{
          marginHorizontal: WP('5'),
          maxWidth: '100%',
          marginTop: WP('8'),
        }}>
        <Text
          style={{
            fontFamily: fonts.soraBold,
            fontSize: 18,
            color: colors.text.main,
            textAlign: 'left',
          }}>
          Maintenance Timeline
        </Text>
        <Text
          style={{
            fontFamily: fonts.soraSemiBold,
            fontSize: 14,
            color: '#B0B3BA',
            textAlign: 'left',
          }}>
          Track your vehicle’s maintenance history
        </Text>
        <Pressable
          style={{
            position: 'absolute',
            right: WP('1'),
          }}>
          <Image
            source={appIcons.filter}
            resizeMode={'contain'}
            style={{
              width: 23,
              height: 19,
              tintColor: colors.primary.main,
            }}
          />
        </Pressable>
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: WP('5'),
        }}
        renderItem={() => (
          <View
            style={{
              maxWidth: '100%',
              marginHorizontal: WP('5'),
              borderRadius: 16,
              backgroundColor: colors.background.light,
              paddingHorizontal: WP('3'),
              paddingVertical: WP('6'),
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: WP('9'),
            }}>
            <Image
              source={appIcons.cricleService}
              resizeMode={'contain'}
              style={{
                width: 40,
                height: 40,
              }}
            />
            <View
              style={{
                marginHorizontal: WP('3'),
                marginTop: -10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 16,
                  color: colors.primary.main,
                  marginBottom: 3,
                }}>
                Oil Change
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 14,
                  color: '#B0B3BA',
                  marginBottom: 3,
                }}>
                Elite Auto Service
              </Text>
              <Text
                style={{
                  fontFamily: fonts.soraMedium,
                  fontSize: 12,
                  color: '#B0B3BA',
                }}>
                June 3, 2023
              </Text>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate('OrderHistoryStack', {
                  screen: 'OrderView',
                });
              }}
              style={{
                position: 'absolute',
                right: WP('5'),
              }}>
              <Text
                style={{
                  fontFamily: fonts.soraSemiBold,
                  fontSize: 12,
                  color: colors.primary.main,
                  textDecorationLine: 'underline',
                  textTransform: 'uppercase',
                }}>
                VIEW ORDER
              </Text>
            </Pressable>
          </View>
        )}
      />

      <KeyboardAvoidingView>
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
            refreshControl={<RefreshControl refreshing={isLoading} />}
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

export default ViewProfile;

const styles = StyleSheet.create({
  headerMainContainer: {
    width: WP('100'),
    backgroundColor: colors.background.light,
    borderBottomWidth: 2,
    borderBottomColor: '#0000000D',
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: WP('13'),
    marginBottom: WP('5'),
  },
  imageStyle: {
    width: 12,
    height: 20,
    marginLeft: Platform.OS === 'ios' ? WP('5') : 0,
  },
  titleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    marginLeft: 16,
  },
  buttonContainer: {
    marginBottom: WP('5'),
    marginTop: WP('5'),
    width: WP('90'),
  },
  listMainContainer: {
    maxWidth: '100%',
    position: 'relative',
  },
  listContainer: {
    backgroundColor: colors.background.light,
    padding: WP('3'),
    // marginTop: WP('5'),
    marginHorizontal: WP('5'),
    borderRadius: 13,
    flexDirection: 'row',
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
  inputStyle: {
    borderRadius: 12,
  },
  contentContainerStyle: {
    flexGrow: 1,
    marginHorizontal: WP('4'),
  },
  vehicleTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
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
  listContainer2: {
    width: WP('42'),
    padding: WP('3'),
    backgroundColor: '#B0B3BA19',
    borderRadius: 16,
    maxWidth: '100%',
    marginHorizontal: WP('2'),
    marginVertical: WP('2'),
  },
});
