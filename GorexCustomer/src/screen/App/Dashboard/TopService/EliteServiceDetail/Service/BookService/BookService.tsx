/* eslint-disable react-native/no-inline-styles */
import React, {FC, Fragment, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

//** RBSheet */
import RBSheet from 'react-native-raw-bottom-sheet';

//** redux */
import {useDispatch, useSelector} from 'react-redux';

//** navigation */
import {useNavigation} from '@react-navigation/native';

//** third party component */
import {AppButton} from '../../../../../../../components';

//** assets */
import {appIcons, appImage} from '../../../../../../../assets';

//** theme */
import {fonts} from '../../../../../../../infrustructure/theme/fonts';
import {colors} from '../../../../../../../infrustructure/theme/colors';
import {HP, WP} from '../../../../../../../infrustructure/theme/responsive';

//** api  */
import {
  GetAvailableServiceApi,
  GetServiceTypesApi,
} from '../../../../../../../redux/App/ServiceActions/BookServiceActions';
import {
  getServiceProviders,
  updateServices,
} from '../../../../../../../redux/App/ServiceActions/BookServiceSlice';

interface Props {
  itemService: any;
}

const BookService: FC<Props> = ({itemService}) => {
  //** ref */
  const typeRef = useRef<any>(null);

  const navigation = useNavigation<any>();
  //** state */
  const [confirm, setConfirm] = useState<any>();
  const [expanded, setExpanded] = useState<any>();
  const [selectedType, setSelectedType] = useState<any>();
  const [selectedServices, setSelectedServices] = useState<any>([]);

  //** selectors and dispatch */
  const dispatch = useDispatch<any>();
  const {serviceTypes, availableServices, isLoading} = useSelector(
    (state: any) => state.bookServiceSlice,
  );

  //** getNearBy */
  const getServiceType = () => {
    try {
      const get_Service_Types_body = {
        params: {
          model: 'res.partner',
          method: 'get_service_categories',
          args: [[]],
          kwargs: {partner_id: itemService?.id},
        },
      };

      dispatch(
        GetServiceTypesApi({
          data: get_Service_Types_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
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
          kwargs: {branch: itemService?.id, filter: false},
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

  const handleFreshApi = () => {
    getServiceType();
    getAvailableService();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleFreshApi();
    });
    return unsubscribe;
  });

  const toggleItemSelection = (item: any) => {
    if (selectedServices.includes(item)) {
      setSelectedServices(
        selectedServices.filter((selected: any) => selected !== item),
      );
    } else {
      setSelectedServices([...selectedServices, item]);
    }
  };

  const renderItem = (item: any) => {
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
              <View style={styles.listContentContainer}>
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
              {expanded ? null : (
                <View style={styles.startContainer}>
                  <Text style={styles.startTextStyle}>Starts from </Text>

                  <Text style={styles.srTextStyle}>
                    SAR <Text style={styles.priceTextStyle}>45.99</Text>
                  </Text>
                </View>
              )}
            </View>
            {item?.services.map((obj: any) => (
              <Pressable
                style={styles.accordionSecondContent}
                onPress={() => {
                  toggleItemSelection(obj);
                }}>
                <View style={styles.listContentContainer}>
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
                <View style={styles.startContainer}>
                  <Text
                    style={[
                      styles.srTextStyle,
                      {
                        color: colors.primary.main,
                      },
                    ]}>
                    SAR <Text style={styles.priceTextStyle}>{obj?.price}</Text>
                  </Text>
                </View>
              </Pressable>
            ))}
          </Pressable>
        ) : (
          <Pressable
            key={item.id}
            style={styles.listContainer}
            onPress={() => {
              setExpanded((prevExpanded: any) =>
                prevExpanded === item ? null : item,
              );
            }}>
            <View style={styles.listContentContainer}>
              <Image
                source={expanded ? appIcons.checked : appIcons.unChecked}
                resizeMode={'contain'}
                style={styles.verifiedImageStyle}
              />
              <Text style={styles.oilChangeTextStyle}>{item?.name}</Text>
            </View>
            <View style={styles.startContainer}>
              <Text style={styles.startTextStyle}>Starts from </Text>

              <Text style={styles.srTextStyle}>
                SAR <Text style={styles.priceTextStyle}>45.99</Text>
              </Text>
            </View>
          </Pressable>
        )}
      </Fragment>
    );
  };

  //** renderItem */
  const renderModalItem = (item: any) => (
    <Pressable
      style={styles.listContainer2}
      onPress={() => {
        setSelectedType((prevExpanded: any) =>
          prevExpanded === item ? null : item,
        );
      }}>
      <Image
        source={selectedType ? appIcons.checked : appIcons.unCheckedCircle}
        resizeMode={'contain'}
        style={styles.listImageStyle}
      />
      <Text style={styles.titleTextStyle}>{item?.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleFreshApi} />
        }>
        <Text style={styles.selectServiceStyle}>Select Service Type</Text>
        <View style={styles.contentContainer}>
          <Image
            source={appIcons.service}
            resizeMode={'contain'}
            style={styles.subStyle}
          />
          <Pressable
            style={styles.serviceTypeContainer}
            onPress={() => {
              typeRef.current.open();
            }}>
            <Text style={styles.serviceTypeStyle}>Select Service Type</Text>
            <Text style={styles.allServiceStyle}>
              {confirm ? confirm?.name : 'All Services'}
            </Text>
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
          renderItem={({item}) => renderItem(item)}
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
      </ScrollView>
      <KeyboardAvoidingView>
        <RBSheet
          ref={typeRef}
          height={HP('55')}
          openDuration={250}
          customStyles={{
            container: styles.modalContainer,
          }}>
          <View style={styles.modalMainContainer}>
            <View style={styles.spacer} />
            <TouchableOpacity
              onPress={() => {
                typeRef.current.close();
                setSelectedType(null);
                setConfirm(null);
              }}
              style={styles.cancelIconContainer}>
              <Image
                source={appIcons.closeSheet}
                resizeMode={'contain'}
                style={styles.closeSheetStyle}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.serviceTextStyle}>Select Service Type</Text>
          <FlatList
            data={serviceTypes}
            renderItem={({item}) => renderModalItem(item)}
          />
          <AppButton
            title={'Select'}
            backgroundColor={
              selectedType ? colors?.primary?.main : colors.disabled.main
            }
            style={[styles.buttonContainer]}
            disabled={selectedType ? false : true}
            onPress={() => {
              setConfirm(selectedType);
              typeRef.current.close();
            }}
          />
        </RBSheet>
      </KeyboardAvoidingView>
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
            dispatch(updateServices(selectedServices));
            dispatch(getServiceProviders(itemService));
          }}
          disabled={selectedServices.length !== 0 ? false : true}
          backgroundColor={
            selectedServices.length !== 0
              ? colors?.primary?.main
              : colors.disabled.main
          }
        />
      </View>
    </View>
  );
};

export default BookService;

const styles = StyleSheet.create({
  bookedButtonContainer: {
    width: WP('51'),
    marginTop: -40,
    marginLeft: WP('15'),
  },
  listContainer: {
    width: WP('92'),
    padding: WP('5'),
    backgroundColor: colors.background.light,
    borderRadius: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: WP('3'),
  },
  listContentContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedImageStyle: {
    width: 24,
    height: 24,
  },
  oilChangeTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP('2.5'),
  },
  startContainer: {
    maxWidth: '100%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  startTextStyle: {
    fontFamily: fonts.soraRegular,
    fontSize: 12,
    color: '#B0B3BA',
    textAlign: 'right',
    textAlignVertical: 'top',
  },
  srTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'right',
  },
  priceTextStyle: {
    fontFamily: fonts.soraBold,
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
  accordionContainer: {
    width: WP('92'),
    padding: WP('5'),
    backgroundColor: colors.background.light,
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: WP('3'),
    borderWidth: 1.5,
    borderColor: colors.primary.main,
  },
  accordionContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accordionSecondContent: {
    marginLeft: WP('8'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
  },
  modalContainer: {
    backgroundColor: colors.background.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalMainContainer: {
    paddingHorizontal: WP('4'),
    paddingTop: WP('4'),
  },
  modalContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 63,
    height: 6,
    backgroundColor: colors.disabled.light,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cancelIconContainer: {
    width: WP('8'),
    height: WP('8'),
    backgroundColor: colors.disabled.light,
    borderRadius: WP('10'),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeSheetStyle: {
    width: 36,
    height: 36,
  },
  buttonContainer: {
    marginBottom: WP('10'),
  },
  listContainer2: {
    flexDirection: 'row',
    marginTop: WP('5'),
    marginHorizontal: WP('5'),
  },
  listImageStyle: {
    width: 24,
    height: 24,
  },
  titleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP(3),
    fontWeight: '500',
  },
  serviceTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP('5'),
    fontWeight: '600',
  },
});
