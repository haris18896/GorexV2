/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';

//**theme */
import {WP} from '../../infrustructure/theme/responsive';
import {colors} from '../../infrustructure/theme/colors';
import {fonts} from '../../infrustructure/theme/fonts';

//**assets */
import {appIcons} from '../../assets';
import {AppButton} from '../Button/AppButton';

//**Interface Props */
interface Props {
  onPressSelectVehicle?: ({item}: any) => void;
  onPressAddNew?: () => void;
  list: any;
}

const AddVehicleModal: FC<Props> = ({
  onPressSelectVehicle,
  onPressAddNew,
  list,
}) => {
  const [selected, setSelected] = useState<any>(list[0]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        marginBottom: WP('3'),
      }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.listMainContainer}>
        {list.map((item: any, index: any) => (
          <Pressable
            key={index}
            style={[
              styles.listContainer,
              {
                borderWidth: selected === item ? 1.5 : 0,
                borderColor:
                  selected === item
                    ? colors.primary.main
                    : colors.background.light,
              },
            ]}
            onPress={() => {
              setSelected((prevExpanded: any) =>
                prevExpanded === item ? null : item,
              );
            }}>
            <View style={styles.listContentContainer}>
              <Image
                source={appIcons.myVehiclesBlack}
                resizeMode={'contain'}
                style={styles.vehicleImageStyle}
              />
            </View>
            <View style={styles.listSecondContent}>
              <Text style={styles.carModalTextStyle}>
                {item.manufacturer[1]}
              </Text>
              <Text style={styles.plateTextStyle}>{item.name}</Text>
              <View style={styles.carDetailContainer}>
                <View style={styles.carDetailContainer}>
                  <Text style={styles.valueTextStyle}>
                    Model
                    <Text style={styles.nameTextStyle}>
                      {'\n'}
                      {item?.vehicle_model[1]}
                    </Text>
                  </Text>
                  <Text style={styles.valueTextStyle}>
                    Year
                    <Text style={styles.nameTextStyle}>
                      {'\n'}
                      {item?.year_id[1]}
                    </Text>
                  </Text>
                  <Text style={styles.valueTextStyle}>
                    Color
                    <Text style={styles.nameTextStyle}>
                      {'\n'}
                      {item?.vehicle_color[1]}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={selected === item ? appIcons.checked : appIcons.unChecked}
              resizeMode={'contain'}
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                top: WP('5'),
                right: WP('5'),
              }}
            />
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.addVehicleContainer} onPress={onPressAddNew}>
        <View style={styles.listContentContainer}>
          <Image
            source={appIcons.myVehiclesBlack}
            resizeMode={'contain'}
            style={styles.vehicleImageStyle}
          />
        </View>
        <Text style={styles.addVehicleTextStyle}>+Add New Vehicle</Text>
      </Pressable>

      <AppButton
        title={'Select Vehicle'}
        onPress={() => {
          if (selected && selected.manufacturer && selected.name) {
            onPressSelectVehicle([selected?.name, selected?.manufacturer[1]]);
          }
        }}
        style={styles.buttonContainer}
      />
    </ScrollView>
  );
};

export {AddVehicleModal};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalMainContainer: {
    width: WP('100'),
    padding: WP('5'),
    backgroundColor: colors.background.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  closeSheetStyle: {
    width: 36,
    height: 36,
  },
  listMainContainer: {
    maxWidth: '100%',
    position: 'relative',
  },
  listContainer: {
    backgroundColor: colors.background.light,
    padding: WP('3'),
    marginTop: WP('5'),
    marginHorizontal: WP('5'),
    borderRadius: 13,
    flexDirection: 'row',
  },
  buttonContainer: {
    marginBottom: WP('5'),
    marginTop: WP('5'),
    width: WP('90'),
  },
  listContentContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#4AD5940F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleImageStyle: {
    width: 24,
    height: 19,
    tintColor: colors.primary.main,
  },
  listSecondContent: {
    marginLeft: WP('5'),
    maxWidth: '100%',
  },
  carModalTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: '#B0B3BA',
    textAlign: 'left',
  },
  plateTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
  },
  carDetailContainer: {
    width: WP('50'),
    flexDirection: 'row',
    marginTop: WP('2'),
    marginBottom: WP('2'),
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#B0B3BA19',
  },
  carDetailContentContainer: {
    marginRight: WP('10'),
  },
  valueTextStyle: {
    fontFamily: fonts.soraBold,
    fontSize: 12,
    color: colors.text.main,
    textAlign: 'left',
  },
  nameTextStyle: {
    fontFamily: fonts.soraRegular,
    color: '#B0B3BA',
  },
  addVehicleContainer: {
    maxWidth: '100%',
    paddingHorizontal: WP('5'),
    paddingVertical: WP('1'),
    borderRadius: 16,
    borderColor: colors.primary.main,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginHorizontal: WP('5'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('5'),
  },
  addVehicleTextStyle: {
    fontFamily: fonts.soraSemiBold,
    fontSize: 16,
    color: colors.primary.main,
    flex: 1,
    textAlign: 'center',
  },
});
