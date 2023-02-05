import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import ComponentStyles, {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../constants/ComponentStyles';
import Oct from 'react-native-vector-icons/Octicons';

const Input = ({
  placeholder,
  icon,
  value,
  onChangeText,
  isSecure,
  toggleSecure,
  secrueInput,
  keyboardType,
}) => {
  return (
    <View style={styles.inputContainer}>
      {icon ? icon : null}
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        placeholderTextColor={ComponentStyles.COLORS.GREY}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
      />
      {secrueInput === true ? (
        isSecure === true ? (
          <Oct name="eye" style={styles.icon} onPress={toggleSecure} />
        ) : (
          <Oct name="eye-closed" style={styles.icon} onPress={toggleSecure} />
        )
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
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
    paddingLeft: wp('12%'),
  },
  icon: {
    position: 'absolute',
    right: 20,
    color: 'grey',
    fontSize: ComponentStyles.FONT_SIZE.MEDIUM,
  },

  textInput: {
    fontWeight: '500',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    color: ComponentStyles.COLORS.BLACK,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: wp('4%'),
    borderTopRightRadius: wp('2%'),
    borderBottomRightRadius: wp('2%'),
  },
});
