/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
  Pressable,
  Animated,
  Image,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useRef} from 'react';
import {colors} from '../../../infrustructure/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {AppHeader, HomeListModal} from '../../../components';
import {appIcons} from '../../../assets';
import {styles} from './styles';
import {WP} from '../../../infrustructure/theme/responsive';
import {fonts} from '../../../infrustructure/theme/fonts';

const Inbox = () => {
  //**React UseRef Hook */
  const listRef = useRef<any>(null);

  const translationX = useRef(new Animated.Value(0)).current;

  let isSwiped = false;

  const resetSwipe = () => {
    Animated.timing(translationX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      isSwiped = false;
    });
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        Math.abs(gestureState.dx) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          Animated.timing(translationX, {
            toValue: -50,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40) {
        } else {
          resetSwipe();
        }
      },
    }),
  ).current;

  const navigation = useNavigation();

  const renderItem = () => (
    <View
      style={{
        maxWidth: '100%',
        marginHorizontal: WP('5'),
        marginBottom: WP('3'),
        borderRadius: 10,
        backgroundColor: colors.errors.main,
        position: 'relative',
      }}>
      <Pressable onPress={() => {}}>
        <Image
          source={appIcons.invalid}
          resizeMode={'contain'}
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: WP('6'),
            right: WP('3'),
          }}
        />
      </Pressable>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.listMainContainer,
          {transform: [{translateX: translationX}]},
        ]}>
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 46,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FF4E00',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: fonts.soraBold,
              fontSize: 12,
              textAlign: 'center',
            }}>
            Elite
          </Text>
        </View>
        <Pressable
          style={{
            marginHorizontal: WP('4'),
          }}
          onPress={() => {
            navigation.navigate('HomeStack', {screen: 'InboxDetail'});
          }}>
          <Text
            style={{
              fontFamily: fonts.soraSemiBold,
              fontSize: 14,
              color: colors.text.main,
              textAlign: 'left',
              marginBottom: 5,
            }}>
            Elite Auto Service
          </Text>
          <Text
            style={{
              fontFamily: fonts.soraRegular,
              fontSize: 12,
              color: '#B0B3BA',
            }}>
            I’ll get back to you…
          </Text>
        </Pressable>
        <View
          style={{
            position: 'absolute',
            top: WP('5.2'),
            right: WP('5'),
          }}>
          <Text
            style={{
              fontFamily: fonts.soraSemiBold,
              fontSize: 12,
              color: colors.text.main,
              textAlign: 'right',
            }}>
            12:33 PM
          </Text>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: WP('4.5'),
              right: WP('0'),
              backgroundColor: colors.primary.main,
            }}>
            <Text
              style={{
                fontFamily: fonts.soraMedium,
                fontSize: 12,
                color: colors.background.light,
              }}>
              7
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}>
      <AppHeader
        title={'Inbox'}
        source={appIcons.menuIcon}
        imageStyle={styles.menuIconStyle}
        onPress={() => {
          listRef.current.open();
        }}
      />
      <FlatList
        data={[1, 2, 3]}
        renderItem={() => renderItem()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: WP('5'),
        }}
        keyExtractor={item => item.id}
      />

      <KeyboardAvoidingView>
        <HomeListModal
          listRef={listRef}
          onPressCancel={() => {
            listRef.current.close();
          }}
          onPressTopList={() => {
            listRef.current.close();
            navigation.navigate('BottomTab');
          }}
          onPressFooterList={() => {
            listRef.current.close();
            navigation.navigate('BottomTab');
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Inbox;
