/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';

/** Third party component */
import {AppHeader, HomeTopService} from '../../../../../components';

/** navigation */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamsList} from '../../../../../navigation/AppStack/HomeStack';

/** styles */
import {styles} from './styles';
import {WP} from '../../../../../infrustructure/theme/responsive';
import {useDispatch, useSelector} from 'react-redux';
import {GetAllServiceApi} from '../../../../../redux/App/HomeActions/homeAction';
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {colors} from '../../../../../infrustructure/theme/colors';

const TopServiceView = () => {
  //** navigation */
  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeStackParamsList, 'TopServiceView'>
    >();

  const dispatch = useDispatch<any>();

  //** onSubmit Login */
  const getAllServices = () => {
    try {
      const get_all_offers_body = {
        params: {
          model: 'product.template',
          method: 'get_all_services',
          args: [[]],
          kwargs: {},
        },
      };

      dispatch(
        GetAllServiceApi({
          data: get_all_offers_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      getAllServices();
    }, 500);
  }, [navigation]);

  const all_Service = useSelector(
    (state: any) => state?.homeSlice?.all_Service,
  );

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'Top Services'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={all_Service?.data}
        horizontal={false}
        numColumns={3}
        style={{
          flexGrow: 1,
          // marginLeft: WP('1'),
          marginTop: WP('4'),
        }}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <HomeTopService
            item={item}
            style={styles.topServiceContainer}
            contentContainerStyle={styles.contentContainerStyle}
            onPress={() => {
              navigation.navigate('TopServiceDetail');
            }}
            imageStyle={styles.imageStyle}
          />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size={'small'} color={'black'} />
            <Text
              style={{
                fontFamily: fonts.soraSemiBold,
                fontSize: 18,
                color: colors.text.main,
                marginTop: WP('3'),
              }}>
              No Services found
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default TopServiceView;
