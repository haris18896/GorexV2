/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Alert,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../../infrustructure/theme/colors';
import {AppHeader, ImagePickerModal} from '../../../../components';
import {appIcons} from '../../../../assets';
import {TextInput} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {image_options} from '../../../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {WP} from '../../../../infrustructure/theme/responsive';

const InboxDetail = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:').then();
    } else {
      Linking.openSettings();
    }
  };

  const showGallery = () => {
    setShow(false);
    setTimeout(() => {
      try {
        ImagePicker.launchImageLibrary(image_options, response => {
          if (response.didCancel) {
          } else if (response.error) {
          } else if (response.customButton) {
          } else {
          }
        });
      } catch (error) {}
    }, 400);
  };
  //Open Camera
  const showCamera = () => {
    setShow(false);
    setTimeout(() => {
      try {
        ImagePicker.launchCamera(image_options, response => {
          if (response.didCancel) {
          } else if (response.error) {
          } else if (response.customButton) {
          } else {
            Alert.alert('Unable to open Camera');
          }
        });
      } catch (error) {}
    }, 400);
  };

  const renderItem = () => (
    <View style={styles.listContainer}>
      <View style={styles.listContentContainer}>
        <Text style={styles.messageTextStyle}>I’ll get back to you…</Text>
      </View>
      <View>
        <Text style={styles.timeTextStyle}>12:33 PM</Text>
        <Text style={styles.deliveredTextStyle}>Delivered</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        profileImage={true}
        title={'Elite Auto Service'}
        callImage={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={[1, 2, 3, 4]}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          flex: 1,
        }}
        renderItem={() => renderItem()}
        keyExtractor={item => item.toString()}
      />
      <KeyboardAvoidingView behavior={'position'}>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.inputContainer}
            placeholder={'Type your message..'}
            placeholderTextColor={colors.text.main}
            mode={'flat'}
            theme={{roundness: 10, colors: '#B0B3BA33'}}
            value={message}
            onChangeText={text => {
              setMessage(text);
            }}
            right={
              message.length > 0 && (
                <TextInput.Icon
                  icon={appIcons.sendIcon}
                  size={20}
                  style={styles.iconStyle}
                  color={colors.primary.main}
                />
              )
            }
          />
          <Pressable
            onPress={() => {
              setShow(true);
            }}
            style={{
              marginHorizontal: WP('2'),
            }}>
            <Image
              source={appIcons.attachIcon}
              resizeMode={'contain'}
              style={styles.attachImageStyle}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView>
        <ImagePickerModal
          isVisible={show}
          onPressHide={() => {
            setShow(false);
          }}
          onPressCancel={() => {
            setShow(false);
          }}
          onPressCamera={() => {
            showCamera();
          }}
          onPressPhoto={() => {
            showGallery();
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default InboxDetail;
