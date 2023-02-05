import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ComponentStyles, {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../constants/ComponentStyles';
import {COMPANY_NAME} from '../../constants/Constatns';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ant from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserDetails, setUserId} from '../../store/slices/user';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const HeaderContainer = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {user_id} = useSelector(state => state.user);

  useEffect(() => {
    getToken();
  }, []);

  const route = useRoute();

  const getToken = async () => {
    await AsyncStorage.getItem('AUTH_KEY').then(data => {
      dispatch(setUserId(data));
    });
    await AsyncStorage.getItem('USER_KEY').then(resp => {
      dispatch(setUserDetails(JSON.parse(resp)));
    });
  };

  const navigationHanlder = () => {
    if (user_id === null) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('VehicleRegistration');
    }
  };

  return (
    <View style={styles.mainContainer}>
      {route.name !== 'SearchLocation' && (
        <Ant
          name="left"
          color={ComponentStyles.COLORS.YELLOW_DARAK}
          size={15}
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
      )}
      <Text style={styles.txt}>{COMPANY_NAME}</Text>
      {route.name !== 'VehicleRegistration' && (
        <TouchableOpacity style={styles.btn} onPress={navigationHanlder}>
          <Text style={styles.btnTxt}>Register your vehicle</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderContainer;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    paddingVertical: wp('3%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txt: {
    fontWeight: '600',
    color: ComponentStyles.COLORS.YELLOW_DARAK,
    letterSpacing: 1.5,
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },
  btn: {
    backgroundColor: ComponentStyles.COLORS.YELLOW_DARAK,
    paddingHorizontal: wp('4%'),
    borderRadius: wp('1%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: hp('1%'),
    position: 'absolute',
    right: 10,
  },
  btnTxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: ComponentStyles.FONT_SIZE.EX_SMALL,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
});
