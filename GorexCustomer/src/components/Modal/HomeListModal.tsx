/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Text,
  Pressable,
} from 'react-native';

//**Library */
import RBSheet from 'react-native-raw-bottom-sheet';

//**theme */
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';
import {HP, WP} from '../../infrustructure/theme/responsive';

//**constant */
import {Gorex_List, Home_list} from '../../utils/constant';

//**assets */
import {appIcons} from '../../assets';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

//**Interface Props */
interface Props {
  listRef?: any;
  name?: string;
  onPressCancel?: () => void;
  onPressEditProfile?: () => void;
}

const HomeListModal: FC<Props> = ({
  name,
  listRef,
  onPressCancel,
  onPressEditProfile,
}) => {
  const navigation = useNavigation<any>();
  const {isLoginIn} = useSelector((state: any) => state.authSlice);

  const renderItem = (item: any) => {
    if (item.id === 2) {
      return (
        <Pressable
          style={[styles.itemRowContainer]}
          onPress={() => {
            listRef.current.close();
            if (isLoginIn) {
              if (item.title === 'Inbox') {
                navigation.navigate(item?.route, {screen: 'Inbox'});
              } else {
                navigation.navigate(item?.route);
              }
            } else {
              navigation.navigate('ContinueAsGuest');
            }
          }}>
          <View style={styles.itemContentContainer}>
            <Image
              source={item.icon}
              resizeMode={'contain'}
              style={styles.listIconStyle}
            />
            <Text style={styles.listTitleStyle}>{item.title}</Text>
          </View>

          <View style={styles.numberContainer}>
            <Text style={styles.numberTextStyle}>5</Text>
          </View>
        </Pressable>
      );
    }
    return (
      <Pressable
        style={styles.listContainer}
        onPress={() => {
          listRef.current.close();
          if (isLoginIn) {
            navigation.navigate(item?.route);
          } else if (item.id === 0 && !isLoginIn) {
            navigation.navigate(item?.route);
          } else {
            navigation.navigate('ContinueAsGuest');
          }
        }}>
        <Image
          source={item.icon}
          resizeMode={'contain'}
          style={styles.listIconStyle}
        />
        <Text style={styles.listTitleStyle}>{item.title}</Text>
      </Pressable>
    );
  };

  const gorexRenderItem = ({item}: any) => {
    if (item?.id === 3) {
      return (
        <Pressable
          style={styles.itemRowContainer}
          onPress={() => {
            if (isLoginIn) {
              listRef.current.close();
              navigation.navigate(item?.route);
            } else {
              listRef.current.close();
              navigation.navigate('ContinueAsGuest');
            }
          }}>
          <View style={styles.itemContentContainer}>
            <Image
              source={item.icon}
              resizeMode={'contain'}
              style={styles.listIconStyle}
            />
            <Text style={styles.listTitleStyle}>
              {item?.title === 'Setting' && item?.title}
            </Text>
          </View>
          <View style={styles.itemSecondContentContainer}>
            <Text style={styles.itemTitleStyle}>APP VER. 4.0</Text>
          </View>
        </Pressable>
      );
    } else if (item.id === 1) {
      return (
        <Pressable
          style={styles.itemRowContainer}
          onPress={() => {
            if (isLoginIn) {
              listRef.current.close();
              navigation.navigate(item?.route);
            } else {
              listRef.current.close();
              navigation.navigate('ContinueAsGuest');
            }
          }}>
          <View style={styles.itemContentContainer}>
            <Image
              source={item.icon}
              resizeMode={'contain'}
              style={styles.listIconStyle}
            />
            <Text style={styles.listTitleStyle}>{item?.title}</Text>
          </View>
          <Text style={styles.goCoinTextStyle}>
            Go Coins{' '}
            <Text
              style={{
                color: '#FFAE00',
              }}>
              12,051
            </Text>
          </Text>
        </Pressable>
      );
    }
    return (
      <Pressable
        style={styles.listContainer}
        onPress={() => {
          if (isLoginIn) {
            listRef.current.close();
            navigation.navigate(item?.route);
          } else {
            listRef.current.close();
            navigation.navigate('ContinueAsGuest');
          }
        }}>
        <Image
          source={item.icon}
          resizeMode={'contain'}
          style={{
            width: 20,
            height: 20,
          }}
        />
        <Text style={styles.listTitleStyle}>{item.title}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <RBSheet
        ref={listRef}
        height={HP('92')}
        openDuration={250}
        customStyles={{
          container: styles.modalContainer,
        }}>
        <View style={styles.modalMainContainer}>
          <View style={styles.spacer} />
          <TouchableOpacity
            onPress={onPressCancel}
            style={styles.cancelIconContainer}>
            <Image
              source={appIcons.closeSheet}
              resizeMode={'contain'}
              style={styles.closeSheetStyle}
            />
          </TouchableOpacity>
          <View style={styles.modalContentContainer}>
            <Image
              source={appIcons.profile}
              resizeMode={'cover'}
              style={styles.profileImageStyle}
            />
            <Text style={styles.guestTextStyle}>
              Hello,{'\n'}
              {name}
            </Text>
            <Pressable
              style={styles.personIconContainer}
              onPress={onPressEditProfile}>
              <Image
                source={appIcons.editProfile}
                resizeMode={'contain'}
                style={styles.editProfileStyle}
              />
            </Pressable>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <View style={styles.listMainContainer}>
            <FlatList
              data={Home_list}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({item}) => renderItem(item)}
              keyExtractor={(item, index) => item.id + index.toString()}
            />
          </View>

          <View style={styles.listMainContainer}>
            <FlatList
              data={Gorex_List}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={(item: any) => gorexRenderItem(item)}
              keyExtractor={(item, index) => item.id + index.toString()}
            />
          </View>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
};

export {HomeListModal};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalMainContainer: {
    width: WP('100'),
    padding: WP('4'),
    backgroundColor: colors.background.light,
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
  leftContainer: {
    height: 54,
    width: 54,
    borderRadius: 54,
    backgroundColor: colors.background.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestTextStyle: {
    color: colors.text.main,
    fontFamily: fonts.soraBold,
    fontSize: 18,
    marginHorizontal: 14,
  },
  personIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listMainContainer: {
    width: WP('90'),
    padding: WP('4'),
    alignSelf: 'center',
    backgroundColor: colors.background.light,
    marginVertical: WP('4'),
    borderRadius: 16,
  },
  listContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  listTitleStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 15,
    color: colors.text.main,
    marginHorizontal: 15,
    textAlign: 'left',
    fontWeight: '600',
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemSecondContentContainer: {
    width: WP('25'),
    padding: 5,
    backgroundColor: '#E7F0F0',
    borderRadius: 15,
    alignItems: 'center',
  },
  itemTitleStyle: {
    fontFamily: fonts.soraLight,
    fontSize: 12,
    color: '#B0C3C3',
  },
  profileImageStyle: {
    width: WP('16'),
    height: WP('16'),
    alignSelf: 'center',
    top: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeSheetStyle: {
    width: 36,
    height: 36,
  },
  editProfileStyle: {
    width: 19,
    height: 14,
  },
  listIconStyle: {
    width: 20,
    height: 20,
  },
  numberContainer: {
    width: WP('6'),
    height: WP('6'),
    borderRadius: WP('7'),
    backgroundColor: colors.errors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberTextStyle: {
    fontFamily: fonts.soraMedium,
    color: colors.background.light,
    fontSize: 12,
  },
  goCoinTextStyle: {
    fontFamily: fonts.soraMedium,
    color: colors.text.main,
    fontSize: 12,
  },
});
