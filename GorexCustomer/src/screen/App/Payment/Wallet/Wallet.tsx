import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';

//** redux */
import {useSelector} from 'react-redux';

//** assets */
import {appIcons, appImage} from '../../../../assets';

//** navigation  */
import {useNavigation} from '@react-navigation/native';

//** themes */
import {fonts} from '../../../../infrustructure/theme/fonts';
import {colors} from '../../../../infrustructure/theme/colors';
import {WP} from '../../../../infrustructure/theme/responsive';

const Wallet = () => {
  //** navigation */
  const navigation = useNavigation<any>();

  //** redux state */
  const {profile_data} = useSelector((state: any) => state.settingSlice);

  console.log('profile_data', profile_data?.[0]?.balance);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <Image
          source={appImage.walletLogo}
          style={styles.walletLogoImage}
          resizeMode={'contain'}
        />
        <Text style={styles.availableTextStyle}>Available Balance</Text>
        <Text style={styles.balanceTextStyle}>
          SAR {profile_data?.[0]?.balance?.toFixed(2)}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('WalletWithDraw');
          }}
          style={styles.withDrawContainer}>
          <Image source={appIcons.withdraw} style={styles.withDrawImage} />
          <Text style={styles.withDrawText}>Withdraw</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.addFundContainer}
        onPress={() => {
          navigation.navigate('WalletTopUp');
        }}>
        <Image
          source={appIcons.add}
          resizeMode={'contain'}
          style={styles.addFundImage}
        />
        <Text style={styles.addFundText}>Add Funds to Wallet</Text>
      </Pressable>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  contentContainer: {
    flex: 0.9,
    alignItems: 'center',
    marginTop: WP('18'),
  },
  walletLogoImage: {
    width: 190,
    height: 164,
    marginBottom: WP('8'),
  },
  availableTextStyle: {
    fontSize: 18,
    fontFamily: fonts.soraSemiBold,
    color: '#B0B3BA',
    textAlign: 'center',
  },
  balanceTextStyle: {
    fontSize: 44,
    fontFamily: fonts.soraSemiBold,
    color: colors.text.main,
    textAlign: 'center',
    marginTop: WP('4'),
  },
  withDrawContainer: {
    width: 194,
    backgroundColor: colors.text.main,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: WP('4'),
    paddingHorizontal: WP('3'),
    marginTop: WP('10'),
  },
  withDrawImage: {
    width: 25,
    height: 4,
  },
  withDrawText: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.background.light,
    textAlign: 'center',
    marginLeft: WP('6'),
  },
  addFundContainer: {
    maxWidth: '100%',
    marginHorizontal: WP('20'),
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    paddingHorizontal: WP('4'),
    paddingVertical: WP('3'),
  },
  addFundImage: {
    width: 16,
    height: 16,
  },
  addFundText: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.background.light,
    textAlign: 'center',
    marginLeft: WP('4'),
  },
});
