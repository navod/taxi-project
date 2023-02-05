import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import ComponentStyles, {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../constants/ComponentStyles';
import Ant from 'react-native-vector-icons/AntDesign';

const DropDown = ({onPress, value, placeholder}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.dropDownContainer}
        onPress={() => onPress()}>
        <Text
          style={
            value
              ? {color: ComponentStyles.COLORS.BLACK, ...styles.dropDownTxt}
              : {color: 'grey', ...styles.dropDownTxt}
          }>
          {value ? value : placeholder}
        </Text>
        <Ant name="down" style={styles.dropDownIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropDownIcon: {
    position: 'absolute',
    right: 18,
    color: ComponentStyles.COLORS.WHITE,
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },
  dropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    backgroundColor: ComponentStyles.COLORS.LIGHT_GREEN,
    elevation: 6,
    paddingRight: wp('12%'),
  },
  dropDownTxt: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: wp('4%'),
    borderTopLeftRadius: wp('2%'),
    borderBottomLeftRadius: wp('2%'),
    paddingVertical: hp('2%'),
    fontWeight: '500',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },
});
