/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../../../infrustructure/theme/colors';
import {AppButton, AppHeader} from '../../../../../components';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../../../../infrustructure/theme/fonts';
import {WP} from '../../../../../infrustructure/theme/responsive';
import {appIcons} from '../../../../../assets';

const Settings = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<any>();

  const payment_Options_List = [
    {
      id: 0,
      title: 'Cash on Delivery',
      image: appIcons.cod,
    },
    {
      id: 1,
      title: 'Wallet',
      image: appIcons.wallet,
    },
    {
      id: 2,
      title: 'Credit/Debit Card',
      image: appIcons.card,
    },
    {
      id: 3,
      title: 'Apple Pay',
      image: appIcons.applePay,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <AppHeader
        title={'Payment Options'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          maxWidth: '100%',
          marginHorizontal: WP('5'),
          marginTop: WP('5'),
        }}>
        <Text
          style={{
            fontSize: 18,
            color: colors.text.main,
            fontFamily: fonts.soraBold,
            textAlign: 'left',
          }}>
          Favorite Payment Method
        </Text>
        <FlatList
          data={payment_Options_List}
          style={{
            flexGrow: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          renderItem={({item, index}) => (
            <Pressable
              key={index}
              onPress={() => {
                setSelected((prevExpanded: any) =>
                  prevExpanded === item ? null : item,
                );
              }}
              style={{
                maxWidth: '100%',
                flexDirection: 'row',
                marginTop: WP('4'),
                alignItems: 'center',
              }}>
              <Image
                source={item.image}
                resizeMode={'contain'}
                style={{
                  width: 30,
                  height: 24,
                  tintColor:
                    selected?.id === item.id ? colors.primary.main : undefined,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.soraSemiBold,
                  color:
                    selected?.id === item.id
                      ? colors.primary.main
                      : colors.text.main,
                  marginLeft: WP('2'),
                }}>
                {item?.title}
              </Text>
              <Image
                source={
                  selected?.id === item?.id
                    ? appIcons.checked
                    : appIcons.unCheckedCircle
                }
                resizeMode={'contain'}
                style={{
                  width: 24,
                  height: 24,
                  position: 'absolute',
                  right: WP('1'),
                }}
              />
            </Pressable>
          )}
        />
      </View>
      <AppButton
        style={styles.buttonContainer}
        title={'Save & Exit'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: WP('10'),
  },
});
