/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

//** Assets */
import {appIcons, appImage} from '../../assets';

//** theme */
import {WP} from '../../infrustructure/theme/responsive';
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';

interface Props {}

const HomeGorexOnDemand: FC<Props> = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <Image
          source={appIcons.gorexDemandBox}
          resizeMode={'contain'}
          style={[
            styles.imageStyle,
            {
              marginTop: Platform.OS === 'android' ? 4 : 0,
            },
          ]}
        />
        <Text style={styles.onDemandTextStyle}>
          Gorex on Demand{'\n'}
          <Text style={styles.serviceTextStyle}>
            Services delivered to your location.
          </Text>
        </Text>
      </View>
      <ImageBackground
        source={appImage.offerFestival}
        resizeMode={'cover'}
        style={styles.imageBackGroundStyle}
        imageStyle={styles.backgroundStyle}>
        <Text style={styles.autoServiceTextStyle}>
          AUTO SERVICES{'\n'}ON THE GO.{'\n'}
          <Text style={styles.helpTextStyle}>
            Gorex on Demand{'\n'}Helps Fast.
          </Text>
        </Text>
        <TouchableOpacity style={styles.bookContainer} onPress={()=>{}} >
          <Text style={styles.bookTextStyle}>Book now</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export {HomeGorexOnDemand};

const styles = StyleSheet.create({
  mainContainer: {
    padding: WP('5'),
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: WP('5'),
    alignItems: 'center',
  },
  imageStyle: {
    width: 36,
    height: 36,
  },
  onDemandTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 18,
    color: colors.text.main,
    marginLeft: WP('3'),
    textAlign: 'left',
  },
  serviceTextStyle: {
    color: '#B0B3BA',
    fontFamily: fonts.soraMedium,
    fontSize: 12,
    marginLeft: WP('3'),
    textAlign: 'left',
  },
  imageBackGroundStyle: {
    width: WP('90'),
    height: 150,
    alignSelf: 'center',
  },
  backgroundStyle: {
    borderRadius: 20,
  },
  autoServiceTextStyle: {
    marginTop: WP('5'),
    marginHorizontal: WP('4'),
    color: colors.background.light,
    fontFamily: fonts.soraBold,
    fontSize: 16,
  },
  helpTextStyle: {
    marginTop: 10,
    fontSize: 12,
  },
  bookContainer: {
    width: WP('27'),
    padding: WP('2'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.text.main,
    marginHorizontal: WP('5'),
    marginTop: WP('1.5'),
  },
  bookTextStyle: {
    color: colors.background.light,
    fontFamily: fonts.soraSemiBold,
    fontSize: 14,
  },
});
