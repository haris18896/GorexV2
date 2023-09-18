/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

//** assets */
import {appIcons} from '../../../../../../assets';

//** themes */
import {fonts} from '../../../../../../infrustructure/theme/fonts';
import {colors} from '../../../../../../infrustructure/theme/colors';
import {WP} from '../../../../../../infrustructure/theme/responsive';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

interface Props {
  customItem: any;
}

const Details: FC<Props> = ({customItem}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.aboutContainer}>
          <Image
            source={appIcons.aboutIcon}
            resizeMode={'contain'}
            style={styles.aboutIconStyle}
          />
          <Text style={styles.aboutTextStyle}>About</Text>
        </View>
        <Text style={styles.detailTextStyle}>
          Elite Auto Service is providing exceptional automotive services for
          over a decade. Our expert technicians use the best equipment to
          deliver reliable and efficient solutions.
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <Image
          source={appIcons.locationPin}
          resizeMode={'contain'}
          style={styles.locationIconStyle}
        />
        <Text style={styles.addressTextStyle}>Address</Text>
        <Text style={styles.addressDetailStyle}>Jeddah, Saudi Arabia</Text>
      </View>
      <View style={styles.hourContainerStyle}>
        <Image
          source={appIcons.orderHistory}
          resizeMode={'contain'}
          style={styles.hourIconStyle}
        />
        <Text style={styles.hourTextStyle}>Opening hours</Text>
        <Text style={styles.timeSlotStyle}>09:00 AM - 11:00 PM</Text>
      </View>
      <View
        style={{
          maxWidth: '100%',
          flex: 0.5,
          borderRadius: 10,
          overflow: 'hidden',
          marginHorizontal: WP('5'),
          marginTop: WP('4'),
        }}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          mapPadding={{
            top: 0,
            right: 0,
            bottom: -25,
            left: 0,
          }}
          region={{
            latitude: customItem?.lat ? customItem?.lat : 37.78825,
            longitude: customItem?.long ? customItem?.long : -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            key={'1'}
            coordinate={{
              latitude: customItem?.lat ? customItem?.lat : 37.78825,
              longitude: customItem?.long ? customItem?.long : -122.4324,
            }}>
            <Image
              source={appIcons.mapPin}
              style={{
                width: WP('8'),
                height: WP('8'),
                resizeMode: 'contain',
              }}
            />
          </Marker>
        </MapView>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  contentContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    padding: WP('4'),
    backgroundColor: colors.background.light,
    borderRadius: 16,
    marginTop: 15,
  },
  aboutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutIconStyle: {
    width: 16,
    height: 16,
    tintColor: colors.text.main,
  },
  aboutTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP('2.5'),
  },
  detailTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    marginTop: WP('3'),
  },
  locationContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    padding: WP('4'),
    backgroundColor: colors.background.light,
    borderRadius: 16,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconStyle: {
    width: 20,
    height: 22,
    marginHorizontal: WP('1'),
  },
  addressTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP('1.4'),
  },
  addressDetailStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: colors.text.main,
    flex: 1,
    textAlign: 'right',
  },
  hourContainerStyle: {
    maxWidth: '100%',
    marginHorizontal: WP('5'),
    padding: WP('4'),
    backgroundColor: colors.background.light,
    borderRadius: 16,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourIconStyle: {
    width: 20,
    height: 22,
    marginHorizontal: WP('1'),
  },
  hourTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.text.main,
    textAlign: 'left',
    marginHorizontal: WP('1.4'),
  },
  timeSlotStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: colors.text.main,
    flex: 1,
    textAlign: 'right',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
