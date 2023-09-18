/* eslint-disable react-native/no-inline-styles */
import React, {FC, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';

//** theme */
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';
import {WP} from '../../infrustructure/theme/responsive';

//** assets */
import {appIcons} from '../../assets';

//** Props */
interface Props {
  icon: any;
  color?: string;
  title?: string;
  detail?: string;
  subTitle?: string;

  onPressEdit?: () => void;
}

const EditButton: FC<Props> = ({
  icon,
  title,
  subTitle,
  onPressEdit,
  detail,
  color,
}) => {
  //** translationX */
  const translationX = useRef(new Animated.Value(0)).current;

  let isSwiped = false;

  //** handle Press */
  const handlePress = () => {
    if (!isSwiped) {
      // Swipe left was not significant, reveal the hidden view partially
      Animated.timing(translationX, {
        toValue: -60, // Adjust this value according to how much you want to reveal the hidden view
        duration: 200, // Adjust animation duration as needed
        useNativeDriver: false,
      }).start(() => {
        isSwiped = true;
      });
    } else {
      resetSwipe();
    }
  };

  //** resetSwipe */
  const resetSwipe = () => {
    Animated.timing(translationX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      isSwiped = false;
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.crossIconContainer}>
        <Pressable
          onPress={() => {
            resetSwipe();
          }}>
          <Image
            source={appIcons.invalid}
            resizeMode={'contain'}
            style={styles.invalidIconStyle}
          />
        </Pressable>
        <TouchableWithoutFeedback
          onPress={() => {
            handlePress();
          }}>
          <Animated.View
            style={[
              styles.contentContainer,
              {transform: [{translateX: translationX}]},
            ]}>
            <Image
              source={icon}
              resizeMode={'contain'}
              style={styles.vehicleImageStyle}
            />
            <View style={styles.secondContentContainer}>
              <Text style={styles.titleTextStyle}>{title}</Text>
              {detail && <Text style={styles.detailsStyle}>{detail}</Text>}
              <Text
                style={[
                  styles.subTitleStyle,
                  {color: color ? color : '#B0B3BA'},
                ]}>
                {subTitle}
              </Text>
            </View>
            <Pressable
              onPress={onPressEdit}
              style={{
                position: 'absolute',
                right: WP('6'),
              }}>
              <Image
                source={appIcons.editIcon}
                resizeMode={'contain'}
                style={styles.editImageStyle}
              />
            </Pressable>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export {EditButton};

const styles = StyleSheet.create({
  mainContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
  },

  contentContainer: {
    maxWidth: '100%',
    backgroundColor: colors.background.light,
    paddingHorizontal: WP('5'),
    paddingVertical: WP('5'),
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleImageStyle: {
    width: 21,
    height: 17,
  },
  secondContentContainer: {
    marginHorizontal: WP('4'),
  },
  titleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
    marginBottom: 2,
  },
  subTitleStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'left',
  },
  editContainer: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: '#E3FFF2',
    position: 'absolute',
    top: WP('6.5'),
    right: WP('5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImageStyle: {
    width: 32,
    height: 32,
  },
  crossIconContainer: {
    maxWidth: '100%',
    borderRadius: 16,
    backgroundColor: colors.errors.main,
    marginTop: WP('3'),
    position: 'relative',
  },
  invalidIconStyle: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: WP('6'),
    right: WP('3'),
  },
  detailsStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'left',
  },
});
