/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';

//** styles */
import {styles} from './styles';

//*** assets */
import {appIcons} from '../../../../../assets';

//** redux state */
import {useDispatch, useSelector} from 'react-redux';

//** toast */
import {showToast} from '../../../../../utils/common';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** themes */
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {colors} from '../../../../../infrustructure/theme/colors';

//** components */
import {AppButton, AppHeader, Layout} from '../../../../../components';

//** map library */
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

//** apis */
import {
  CreateAddressApi,
  UpdateAddressApi,
} from '../../../../../redux/App/SettingActions/SettingActions';
import {CancelModal} from '../../../OrderHistory/Features/CancelModal';

const AddAddress = ({route}: any) => {
  //** routes */
  const item = route?.params?.item;
  const editAddress = route?.params?.editAddress;

  //** navigation */
  const navigation = useNavigation();

  //** state */
  const [isFocus, setIsFocus] = useState(false);
  const [inputFocus, setInputFocus] = useState<any>(false);
  const [editAble, setEditAble] = useState<any>(editAddress);
  const [cancelModal, setCancelModal] = useState<any>(false);
  const [customInputValue, setCustomInputValue] = useState<any>();
  const [currentCoordinates, setCurrentCoordinates] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [getAddress, setGetAddress] = useState<any>(
    item?.address ? item?.address : '',
  );
  const [selected, setSelected] = useState<any>(
    item?.name ? item?.name : undefined,
  );

  //** redux  */
  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: any) => state.authSlice);

  //** getCurrentLocation */
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (location: any) => {
        setCurrentCoordinates({
          latitude: parseFloat(location?.coords.latitude),
          longitude: parseFloat(location?.coords.longitude),
        });
      },
      (_error: any) => {
        setCurrentCoordinates({latitude: 24.7136, longitude: 46.6753});
      },
    );
  };

  //** address_list */
  const address_List = [
    {
      id: 0,
      title: 'Home',
      image: appIcons.homeCircle,
      activeImage: appIcons.homeActiveCircle,
    },
    {
      id: 1,
      title: 'Work',
      image: appIcons.work,
      activeImage: appIcons.activeWork,
    },
  ];

  //** useEffect */
  useEffect(() => {
    return navigation.addListener('focus', getCurrentLocation);
  }, [navigation]);

  //** onSaveAddress */
  const onSaveAddress = () => {
    setLoading(true);
    const create_address_body = {
      params: {
        method: 'create',
        model: 'customer.address',
        args: [
          {
            partner_id: user?.data?.profile_id,
            name: customInputValue?.length > 0 ? customInputValue : selected,
            address: getAddress
              ? getAddress
              : item?.address
              ? item?.address
              : 'No Address Yet',
            latitude: currentCoordinates?.latitude
              ? currentCoordinates?.latitude
              : item?.latitude
              ? item?.latitude
              : '',
            longitude: currentCoordinates?.longitude
              ? currentCoordinates?.longitude
              : item?.longitude
              ? item?.longitude
              : '',
          },
        ],
        kwargs: {},
      },
    };
    dispatch(
      CreateAddressApi({
        data: create_address_body,
        callback: (_response: any) => {
          navigation.goBack();
          setLoading(false);
        },
        errorCallback: (err: any) => {
          setLoading(false);
          showToast('Error', err?.data?.message, 'error');
        },
      }),
    );
  };

  //** onUpdateAddress */
  const onUpdateAddress = () => {
    setLoading(true);
    const update_address_body = {
      params: {
        model: 'customer.address',
        method: 'write',
        args: [
          [item?.id],
          {
            name: customInputValue?.length > 0 ? customInputValue : selected,
            address: getAddress,
            latitude: currentCoordinates?.latitude
              ? currentCoordinates?.latitude
              : item?.latitude
              ? item?.latitude
              : '',
            longitude: currentCoordinates?.longitude
              ? currentCoordinates?.longitude
              : item?.longitude
              ? item?.longitude
              : '',
          },
        ],
        kwargs: {context: {lang: 'en_US'}},
      },
    };
    dispatch(
      UpdateAddressApi({
        data: update_address_body,
        callback: (_response: any) => {
          setLoading(false);
          navigation.goBack();
        },
        errorCallback: (err: any) => {
          setLoading(false);
          showToast('Error', err?.data?.message, 'error');
        },
      }),
    );
  };

  return (
    <Fragment>
      <AppHeader
        title={editAddress ? 'Edit Address' : 'Add New Address'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Layout barStyle={'dark-content'}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: item?.latitude
              ? item?.latitude
              : currentCoordinates?.latitude
              ? currentCoordinates?.latitude
              : 37.78825,
            longitude: item?.longitude
              ? item?.longitude
              : currentCoordinates?.longitude
              ? currentCoordinates?.longitude
              : -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            key={'1'}
            coordinate={{
              latitude: item?.latitude
                ? item?.latitude
                : currentCoordinates?.latitude
                ? currentCoordinates?.latitude
                : 37.78825,
              longitude: item?.longitude
                ? item?.longitude
                : currentCoordinates?.longitude
                ? currentCoordinates?.longitude
                : -122.4324,
            }}>
            <Image
              source={appIcons.mapPin}
              style={styles.mapPinStyle}
              resizeMode={'contain'}
            />
          </Marker>
        </MapView>
        {editAble ? (
          <View style={styles.contentContainer}>
            <View style={styles.draggableStyle} />
            <Text style={styles.selectAddressStyle}>Select Address</Text>
            {editAble ? (
              <Pressable
                style={styles.cancelMainContainer}
                onPress={() => {
                  setCancelModal(true);
                }}>
                <Image
                  source={appIcons.cancel}
                  resizeMode={'contain'}
                  style={styles.cancelImageStyle}
                />
                <Text style={styles.deleteTextStyle}>Delete</Text>
              </Pressable>
            ) : null}

            <View style={styles.currentMapMainContainer}>
              <Image
                source={appIcons.currentMap}
                style={styles.currentMapImageStyle}
                resizeMode={'contain'}
              />
              <View style={styles.currentAddressContainer}>
                <Text style={styles.currentAddressTextStyle}>
                  {editAddress ? 'Current Address' : 'Selected Address'}
                </Text>
                <Text style={styles.getAddressTextStyle}>
                  {getAddress ? getAddress : 'No address'}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  setEditAble(false);
                }}
                style={styles.editImageContainer}>
                <Image
                  source={appIcons.editBlack}
                  resizeMode={'contain'}
                  style={styles.editImageStyle}
                />
              </Pressable>
            </View>
            <View style={styles.addressTypeContainer}>
              <Image
                source={appIcons.editIcon}
                resizeMode={'contain'}
                style={styles.addressTypeImageStyle}
              />
              <Text style={styles.addressTypeTextStyle}>Address Type</Text>
            </View>
            <FlatList
              data={address_List}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              renderItem={({item, index}) => (
                <Pressable
                  disabled={inputFocus ? true : false}
                  key={index}
                  onPress={() => {
                    setSelected((obj: any) =>
                      obj === item ? null : item.title,
                    );
                  }}
                  style={[
                    styles.listItemMainContainer,
                    {
                      borderWidth: selected === item.title ? 1.5 : 0,
                      borderColor:
                        selected === item.title
                          ? colors.primary.main
                          : undefined,
                    },
                  ]}>
                  <Image
                    source={
                      selected === item.title ? item.activeImage : item.image
                    }
                    resizeMode={'contain'}
                    style={styles.listImageStyle}
                  />
                  <Text
                    style={[
                      styles.listTextStyle,
                      {
                        fontFamily:
                          selected === item.title
                            ? fonts.soraBold
                            : fonts.soraMedium,
                      },
                    ]}>
                    {item.title}
                  </Text>
                  <Image
                    source={
                      selected === item.title
                        ? appIcons.checked
                        : appIcons.unChecked
                    }
                    resizeMode={'contain'}
                    style={styles.listSecondImageStyle}
                  />
                </Pressable>
              )}
              ListFooterComponent={
                <View
                  style={[
                    styles.customInputContainer,
                    {
                      borderWidth: inputFocus ? 1.5 : 0,
                      borderColor: inputFocus ? colors.primary.main : undefined,
                    },
                  ]}>
                  <Image
                    source={
                      inputFocus
                        ? appIcons.activeCustomLocation
                        : appIcons.customLocation
                    }
                    resizeMode={'contain'}
                    style={styles.customImageStyle}
                  />
                  <TextInput
                    style={styles.customInputStyle}
                    placeholder={'Add custom name here'}
                    placeholderTextColor={'#B0B3BA'}
                    value={customInputValue}
                    onChangeText={(text: any) => {
                      setCustomInputValue(text);
                    }}
                    onFocus={() => {
                      setInputFocus(true);
                      setSelected(false);
                    }}
                    onBlur={() => {
                      setInputFocus(false);
                    }}
                  />
                  <Image
                    source={inputFocus ? appIcons.checked : appIcons.unChecked}
                    resizeMode={'contain'}
                    style={styles.listSecondImageStyle}
                  />
                </View>
              }
            />
            <AppButton
              title={'Save Address'}
              onPress={() => {
                if (editAble) {
                  console.log('Please Enter Edit Address');
                  onUpdateAddress();
                } else {
                  console.log('Save Address');
                  onSaveAddress();
                }
              }}
              style={styles.addressButtonContainer}
              loading={loading}
              disabled={loading ? true : false}
              backgroundColor={
                loading ? colors.disabled.main : colors.primary.main
              }
            />
          </View>
        ) : (
          <KeyboardAvoidingView
            style={{
              flex: 1,
            }}
            behavior="height"
            keyboardVerticalOffset={100}>
            <View style={styles.secondModalMainContainer}>
              <View style={styles.draggableStyle} />
              <Text style={styles.selectAddressStyle}>Select Address</Text>
              <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, _details = null) => {
                  console.log('data', data?.description);
                  setGetAddress(data?.description);
                }}
                minLength={2}
                query={{
                  key: 'AIzaSyAC8v-kKXGvsLJ5j70V332XFxa-m-WKjzE',
                  language: 'en',
                }}
                styles={{
                  container: {
                    flex: 1,
                  },
                  textInputContainer: [
                    styles.textInputContainer,
                    {borderColor: isFocus ? colors.primary.main : '#B0B3BA33'},
                  ],
                  textInput: styles.textInput,
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                textInputProps={{
                  onBlur: () => {
                    setIsFocus(false);
                  },
                  onFocus: () => {
                    setIsFocus(true);
                  },
                }}
              />
              <Pressable
                onPress={() => {
                  setEditAble(true);
                }}
                style={styles.currentLocationStyle}>
                <Image
                  source={appIcons.currentUser}
                  resizeMode={'contain'}
                  style={styles.currentUserImageStyle}
                />
                <Text style={styles.currentLocationTextStyle}>
                  Use my current location
                </Text>
                <Image
                  source={appIcons.guestArrow}
                  resizeMode={'contain'}
                  style={styles.guestArrowStyle}
                />
              </Pressable>
              <View style={styles.currentMapPinImageContainer}>
                <Image
                  source={appIcons.currentMap}
                  resizeMode={'contain'}
                  style={styles.currentMapPinImageStyle}
                />
                <Text style={styles.getCurrentAddressStyle}>
                  {getAddress ? getAddress : 'No Address Available'}
                </Text>
              </View>
              <AppButton
                title={'Add Address'}
                style={styles.buttonContainer}
                onPress={() => {
                  setEditAble(true);
                }}
              />
            </View>
          </KeyboardAvoidingView>
        )}
      </Layout>
      <KeyboardAvoidingView>
        <CancelModal
          isVisible={cancelModal}
          onPressHide={() => {
            setCancelModal(false);
          }}
          onPressCancel={() => {
            setCancelModal(false);
          }}
          onPressCancelOrder={() => {
            setCancelModal(false);
          }}
          // loading={isLoading}
          title={'Delete Address?'}
          subTitle={
            'Are you sure you want to delete\nthis? This action cannot be undone.'
          }
          buttonTitle={'Delete'}
        />
      </KeyboardAvoidingView>
    </Fragment>
  );
};

export default AddAddress;
