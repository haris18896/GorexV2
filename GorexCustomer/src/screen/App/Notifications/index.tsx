import React, {useRef} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  Platform,
  Pressable,
  Image,
  FlatList,
} from 'react-native';

//** assets */
import {appIcons} from '../../../assets';

//** third party component */
import {HomeListModal} from '../../../components';

//** theme */
import {fonts} from '../../../infrustructure/theme/fonts';
import {colors} from '../../../infrustructure/theme/colors';
import {HP, WP} from '../../../infrustructure/theme/responsive';

const Notification = () => {
  const listRef = useRef<any>(null);
  const statusBarHeight = StatusBar.currentHeight ?? 0;

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.headerMainContainer,
          {
            height:
              Platform.OS === 'android' ? HP(13) - statusBarHeight : WP('30'),
          },
        ]}>
        <Pressable
          onPress={() => {
            listRef.current.open();
          }}>
          <Image
            source={appIcons.menuIcon}
            resizeMode={'contain'}
            style={styles.imageStyle}
          />
        </Pressable>
        <Text style={styles.titleStyle}>Notifications</Text>
        <View style={styles.markAsContainer}>
          <Image
            source={appIcons.asRead}
            resizeMode={'contain'}
            style={styles.asReadImage}
          />
          <Text style={styles.asReadTextStyle}>Mark as read</Text>
        </View>
      </View>
      <FlatList
        data={[1, 2, 3, 4]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.listMainContainer}>
            <Image
              source={appIcons.unReadNotifi}
              resizeMode={'contain'}
              style={styles.unReadNotifStyle}
            />
            <View style={styles.listTextContainer}>
              <Text style={styles.titleTextStyle}>Dummy text</Text>
              <Text style={styles.subTitleTextStyle}>Dummy headline</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeTextStyle}>12:33 PM</Text>
              <View style={styles.timeSpacer} />
            </View>
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

export default Notification;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
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
  markAsContainer: {
    position: 'absolute',
    right: WP('5'),
    paddingTop: WP('13'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  asReadImage: {
    width: 21,
    height: 10,
    marginRight: WP('1'),
  },
  asReadTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.primary.main,
  },

  imageStyle: {
    width: 24,
    height: 24,
    tintColor: colors.primary.main,
    marginLeft: Platform.OS === 'ios' ? WP('5') : 0,
  },
  titleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    marginLeft: 16,
  },
  listMainContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    backgroundColor: colors.background.light,
    borderRadius: 13,
    padding: WP('4.5'),
    flexDirection: 'row',
    marginBottom: WP('3'),
  },
  unReadNotifStyle: {
    width: 50,
    height: 50,
  },
  listTextContainer: {
    marginHorizontal: WP('3.5'),
  },
  titleTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    marginBottom: 2,
  },
  subTitleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
  },
  timeContainer: {
    position: 'absolute',
    right: WP('4.5'),
    top: WP('4'),
  },
  timeTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 12,
    color: colors.text.main,
  },
  timeSpacer: {
    width: 12,
    height: 12,
    backgroundColor: colors.primary.main,
    borderRadius: 12,
    alignSelf: 'flex-end',
    marginTop: WP('2.5'),
  },
});
