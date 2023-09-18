/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

/** styles */
import {styles} from './styles';

/** redux */
import {useDispatch, useSelector} from 'react-redux';

/** navigation */
import {useNavigation} from '@react-navigation/native';

import {appIcons, appImage} from '../../../../assets';
/** Third party component */
import {AppHeader, HomeListModal} from '../../../../components';

/** theme */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {WP} from '../../../../infrustructure/theme/responsive';
import {colors} from '../../../../infrustructure/theme/colors';

/** api's */
import {GetAllOffersApi} from '../../../../redux/App/HomeActions/homeAction';

interface Props {}

const Offers: FC<Props> = () => {
  //**React UseRef Hook */
  const listRef = useRef<any>(null);

  //** navigation */
  const navigation = useNavigation<any>();

  //** redux state */
  const dispatch = useDispatch<any>();
  const offer = useSelector((state: any) => state?.homeSlice?.offers);

  //** getAllOffers */
  const getAllOffers = () => {
    try {
      const get_all_offers_body = {
        params: {
          model: 'offer.management',
          method: 'get_all_offers',
          args: [[]],
          kwargs: {},
        },
      };

      dispatch(
        GetAllOffersApi({
          data: get_all_offers_body,
          callback: (_response: any) => {},
          errorCallback: (_err: any) => {},
        }),
      );
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      getAllOffers();
    }, 500);
  }, [navigation]);

  /** render Item */
  const renderItem = (item: any, index: any) => (
    <Pressable
      key={index}
      style={styles.listContainer}
      onPress={() => {
        navigation.navigate('OfferDetails', {
          params: item,
        });
      }}>
      <View style={styles.listContentContainer}>
        <View
          style={{
            flexDirection: 'row',
            maxWidth: '70%',
            marginHorizontal: 5,
          }}>
          <Image
            source={{uri: `data:image/jpeg;base64,${item?.image}`}}
            resizeMode={'cover'}
            style={styles.listImageStyle}
          />

          <Text style={styles.offerTextStyle}>
            {item?.name}
            {'\n'}
            <Text style={styles.discountTextStyle}>
              {item?.discount}% discount
            </Text>
          </Text>
        </View>
      </View>
      <Image
        source={appIcons.guestArrow}
        resizeMode={'contain'}
        style={styles.guestArrowStyle}
      />
    </Pressable>
  );

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={'Offers'}
        source={appIcons.menuIcon}
        imageStyle={styles.imageStyle}
        onPress={() => {
          listRef.current.open();
        }}
      />
      <View style={styles.imageContainer}>
        <ImageBackground
          source={appImage.offerFestival}
          resizeMode={'cover'}
          style={styles.backgroundImageStyle}
          imageStyle={{
            borderRadius: 10,
          }}>
          <Text style={styles.dummyTextStyle}>Dummy offer</Text>
          <Text style={styles.dummyDiscountStyle}>20% discount</Text>
        </ImageBackground>
      </View>
      <FlatList
        data={offer?.data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => item.id + index.toString()}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'small'} color={'black'} />
            <Text
              style={{
                fontFamily: fonts.soraSemiBold,
                fontSize: 14,
                color: colors.text.main,
                marginTop: WP('3'),
              }}>
              No Offers && Promos found
            </Text>
          </View>
        )}
      />

      <KeyboardAvoidingView>
        <HomeListModal
          listRef={listRef}
          onPressCancel={() => {
            listRef.current.close();
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Offers;
