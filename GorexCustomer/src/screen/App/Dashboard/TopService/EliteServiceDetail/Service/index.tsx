/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {FC, Fragment, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

/** theme */
import {colors} from '../../../../../../infrustructure/theme/colors';

/** third party component */
import {AppButton} from '../../../../../../components';

/** styles */
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {appIcons} from '../../../../../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {GetServicesApi} from '../../../../../../redux/App/ServiceActions/BookServiceActions';
import {WP} from '../../../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../../../infrustructure/theme/fonts';

interface Props {
  customItem: any;
}

const Service: FC<Props> = ({customItem}) => {
  /** navigation */
  const navigation = useNavigation<any>();

  const {isLoading} = useSelector((state: any) => state?.bookServiceSlice);
  const {service} = useSelector((state: any) => state?.bookServiceSlice);
  const dispatch = useDispatch<any>();

  //** getServices */
  const getServices = () => {
    try {
      const get_Service_Types_body = {
        params: {
          model: 'res.partner',
          method: 'get_branch_details',
          args: [[]],
          kwargs: {branch: customItem?.id},
        },
      };

      dispatch(
        GetServicesApi({
          data: get_Service_Types_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getServices();
    });
    return unsubscribe;
  });

  /** render Item */
  const renderItem = (item: any) => (
    <View key={item?.id} style={styles.listContainer}>
      <Text style={styles.titleTextStyle}>{item?.name}</Text>
    </View>
  );

  return (
    <Fragment>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getServices} />
        }>
        {!isLoading ? (
          <View style={styles.mainContainer}>
            <FlatList
              data={service}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={styles.contentContainer}>
                  <Text style={styles.repairTextStyle}>{item?.name}</Text>
                  <FlatList
                    data={item?.services}
                    horizontal={false}
                    scrollEnabled={false}
                    numColumns={2}
                    contentContainerStyle={styles.listContentContainerStyle}
                    renderItem={({item}) => renderItem(item)}
                    ListEmptyComponent={() => (
                      <View
                        style={{
                          padding: WP(5),
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          marginHorizontal: WP('14'),
                        }}>
                        <ActivityIndicator size={'small'} color={'black'} />
                        <Text
                          style={{
                            fontFamily: fonts.soraSemiBold,
                            fontSize: 14,
                            color: colors.text.main,
                            marginTop: WP('3'),
                          }}>
                          No Top Service found
                        </Text>
                      </View>
                    )}
                  />
                </View>
              )}
            />

            {/* <View style={styles.thirdContentContainer}>
            <Text
              style={[styles.paintTextStyle, {color: colors.background.light}]}>
              Gorex on Demand
            </Text>
            <FlatList
              data={Repair_List}
              horizontal={false}
              scrollEnabled={false}
              numColumns={3}
              contentContainerStyle={styles.listContentContainerStyle}
              renderItem={({item}) => renderItem(item)}
            />
          </View> */}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              padding: WP(5),
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: WP('14'),
              marginVertical: WP('50'),
            }}>
            <ActivityIndicator size={'small'} color={'black'} />
            <Text
              style={{
                fontFamily: fonts.soraSemiBold,
                fontSize: 14,
                color: colors.text.main,
                marginTop: WP('3'),
              }}>
              No Services found
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonMainContainer}>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('InboxDetail');
          }}>
          <Image
            source={appIcons.messageIcon}
            resizeMode={'contain'}
            style={styles.messageImageStyle}
          />
        </Pressable>
        <AppButton
          style={styles.bookedButtonContainer}
          title={'Book Service'}
          onPress={() => {
            navigation.navigate('BookServiceDetail', {item: customItem});
          }}
        />
      </View>
    </Fragment>
  );
};

export default Service;
