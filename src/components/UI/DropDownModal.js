import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ComponentStyles, {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../constants/ComponentStyles';
import {
  FUELS_TYPES,
  GEAR_TYPES,
  MODAL_TYPES,
  VEHICAL_TYPES,
} from '../../constants/Constatns';
import FA from 'react-native-vector-icons/FontAwesome';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';

const RenderModal = ({
  droptDownType,
  selectItem,
  onSelect,
  selectFuel,
  selectVehicleType,
  gearType,
}) => {
  switch (droptDownType) {
    case MODAL_TYPES.FUEL_MODAL:
      return (
        <View style={styles.fuelColumn}>
          {FUELS_TYPES.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => onSelect(item)}>
              <View style={styles.fuelRow}>
                {selectFuel === item ? (
                  <MI
                    name="circle-slice-8"
                    color={ComponentStyles.COLORS.YELLOW_DARAK}
                    size={20}
                  />
                ) : (
                  <MI
                    name="circle-outline"
                    color={ComponentStyles.COLORS.YELLOW_DARAK}
                    size={20}
                  />
                )}

                <Text style={styles.item}>{item}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      );

    case MODAL_TYPES.GEAR_MODAL:
      return (
        <View style={styles.fuelColumn}>
          {GEAR_TYPES.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => onSelect(item)}>
              <View style={styles.fuelRow}>
                {gearType === item ? (
                  <MI
                    name="circle-slice-8"
                    color={ComponentStyles.COLORS.YELLOW_DARAK}
                    size={20}
                  />
                ) : (
                  <MI
                    name="circle-outline"
                    color={ComponentStyles.COLORS.YELLOW_DARAK}
                    size={20}
                  />
                )}

                <Text style={styles.item}>{item}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      );
    case MODAL_TYPES.VEHICAL_TYPE_MODAL:
      return (
        <View style={styles.fuelColumn}>
          {VEHICAL_TYPES.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => onSelect(item)}>
              <View style={styles.fuelRow}>
                {selectVehicleType === item ? (
                  <MI
                    name="circle-slice-8"
                    color={ComponentStyles.COLORS.YELLOW_DARAK}
                    size={20}
                  />
                ) : (
                  <MI
                    name="circle-outline"
                    color={ComponentStyles.COLORS.YELLOW_DARAK}
                    size={20}
                  />
                )}

                <Text style={styles.item}>{item}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      );
    default:
      return null;
  }
};
const DropDownModal = ({
  droptDownType,
  onClose,
  headerTitle,
  onSelect,
  selectFuel,
  selectVehicleType,
  gearType,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>{headerTitle}</Text>
        <FA name="window-close" style={styles.icon} onPress={onClose} />
      </View>
      <RenderModal
        droptDownType={droptDownType}
        onSelect={onSelect}
        onClose={onClose}
        selectFuel={selectFuel}
        selectVehicleType={selectVehicleType}
        gearType={gearType}
      />
    </View>
  );
};

export default DropDownModal;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: ComponentStyles.COLORS.WHITE,
    padding: wp('4%'),
    borderRadius: wp('%'),
  },
  header: {
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    color: ComponentStyles.COLORS.YELLOW_DARAK,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  icon: {
    fontSize: ComponentStyles.ICON_SIZE.MEDIUM,
    color: ComponentStyles.COLORS.YELLOW_DARAK,
  },
  fuelRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    display: 'flex',
  },
  fuelColumn: {
    flexDirection: 'column',
    gap: 10,
  },
  item: {
    fontWeight: '600',
    color: 'black',
    fontSize: ComponentStyles.FONT_SIZE.EX_SMALL,
  },
});
