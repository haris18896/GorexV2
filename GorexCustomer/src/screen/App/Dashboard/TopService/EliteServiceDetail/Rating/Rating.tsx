import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';

/** theme */
import {colors} from '../../../../../../infrustructure/theme/colors';
import {WP} from '../../../../../../infrustructure/theme/responsive';
import {fonts} from '../../../../../../infrustructure/theme/fonts';

/** assets */
import {appIcons} from '../../../../../../assets';

const Rating = () => {
  /** renderItem */
  const renderItem = (item: any) => (
    <View style={styles.listMainContainer}>
      <View style={styles.leftTextContainer}>
        <Text style={styles.titleStyle}>RA</Text>
      </View>
      <View style={styles.listContentContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingTextStyle}>Reem Al-Mutairi</Text>
          <Text style={styles.timeTextStyle}>2 HOURS AGO</Text>
        </View>
        <Image
          source={appIcons.starInActive}
          resizeMode={'contain'}
          style={styles.starImageStyle}
        />
        <Text style={styles.paraTextStyle}>
          Great service, friendly staff, car returned{'\n'}in great condition.
          Highly{'\n'}recommended.
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={[1, 2, 3]}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderItem(item)}
      />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  listMainContainer: {
    width: WP('90'),
    alignSelf: 'center',
    padding: WP('3'),
    paddingVertical: WP('5'),
    backgroundColor: colors.background.light,
    flexDirection: 'row',
    borderRadius: 16,
    marginTop: WP('5'),
  },
  leftTextContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.text.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: WP('2.5'),
  },
  titleStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.background.light,
  },
  listContentContainer: {
    width: WP('70'),
    marginHorizontal: WP('2'),
    marginTop: WP('0.5'),
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 14,
    color: colors.text.main,
  },
  timeTextStyle: {
    textTransform: 'uppercase',
    fontFamily: fonts.soraSemiBold,
    fontSize: 10,
    color: colors.text.main,
  },
  starImageStyle: {
    width: 18,
    height: 18,
    marginTop: WP('1.5'),
    marginBottom: WP('3.5'),
  },
  paraTextStyle: {
    textAlign: 'left',
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
  },
});
