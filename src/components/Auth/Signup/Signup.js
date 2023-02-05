import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import HeaderContainer from '../../UI/HeaderContainer';
import {
  ALERT_TYPE,
  COMPANY_NAME,
  SIGN_UP_ERROR_MSG,
  SIGN_UP_SUCCESS_MSG,
} from '../../../constants/Constatns';
import ComponentStyles, {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../constants/ComponentStyles';
import Input from '../../UI/Input';
import Ant from 'react-native-vector-icons/AntDesign';
import FE from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import CityModal from '../../UI/CityModal';
import DropDown from '../../UI/DropDown';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {toast} from '../../../utility/utility';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDetails} from '../../../store/slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
  const [cityVisible, setCityVisible] = useState(false);

  const [city, setCity] = useState('');

  const {categoryTypes} = useSelector(state => state.user);
  const navigation = useNavigation();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [resTypePassword, setReTypePassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [securePw, setSecurePw] = useState(true);
  const [sercureRPw, setSecureRPw] = useState(true);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const saveToDB = uid => {
    const obj = {
      username: username,
      email: email,
      phone_number: phoneNumber,
      name: name,
      city: city,
      uid: uid,
    };
    firestore()
      .collection('Users')
      .doc(uid)
      .set(obj)
      .then(() => {
        setLoading(false);
        toast(SIGN_UP_SUCCESS_MSG.SIGN_UP_SUCCESS, ALERT_TYPE.SUCCESS);
        AsyncStorage.setItem('AUTH_KEY', uid);
        dispatch(setUserDetails(obj));
        AsyncStorage.setItem('USER_KEY', JSON.stringify(obj));

        navigation.navigate('Vehicle');
      });
  };

  const isValid = () => {
    if (
      username === '' &&
      password === '' &&
      resTypePassword === '' &&
      name === '' &&
      email === '' &&
      phoneNumber === '' &&
      city === ''
    ) {
      toast(SIGN_UP_ERROR_MSG.ALL_FIELDS_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (username === '') {
      toast(SIGN_UP_ERROR_MSG.USER_NAME_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (password === '') {
      toast(SIGN_UP_ERROR_MSG.PASSWORD_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (password.length < 8) {
      toast(SIGN_UP_ERROR_MSG.PASSWORD_VALIDATION, ALERT_TYPE.WARNING);
      return false;
    } else if (resTypePassword === '') {
      toast(SIGN_UP_ERROR_MSG.RE_PASSWORD_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (resTypePassword !== password) {
      toast(SIGN_UP_ERROR_MSG.PASSWORD_UNMATCHED, ALERT_TYPE.WARNING);
      return false;
    } else if (email === '') {
      toast(SIGN_UP_ERROR_MSG.EMAIL_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (phoneNumber === '') {
      toast(SIGN_UP_ERROR_MSG.PHONE_NUMBER_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (city === '') {
      toast(SIGN_UP_ERROR_MSG.CITY_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else {
      return true;
    }
  };

  const signInWithEmail = () => {
    if (isValid()) {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createUser => {
          createUser.user.updateProfile({displayName: name});
          saveToDB(createUser.user.uid);
        })
        .catch(error => {
          setLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            toast(SIGN_UP_ERROR_MSG.EMAIL_ALREADY_USER, ALERT_TYPE.ERROR);
          } else if (error.code === 'auth/invalid-email') {
            toast(SIGN_UP_ERROR_MSG.INVALID_EMAIL, ALERT_TYPE.ERROR);
          } else {
            toast(SIGN_UP_ERROR_MSG.PASSWORD_VALIDATION, ALERT_TYPE.ERROR);
          }
        });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <HeaderContainer />

      <View style={styles.subContainer}>
        <Text style={styles.subContainerTxt}>
          Advertise your vehicle for free with{' '}
          <Text style={styles.companyName}>{COMPANY_NAME}</Text>
        </Text>
        <Text style={styles.subTxt}>
          Already a member of {COMPANY_NAME}?{' '}
          <Text
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}>
            Login in here
          </Text>
        </Text>
      </View>
      <ScrollView>
        {/* <Modal isVisible={cityVisible}>
          <CityModal
            onClose={() => setCityVisible(false)}
            onSelect={val => setCity(val)}
          />
        </Modal> */}
        <View style={styles.inputMainContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>User name</Text>
            <Input
              placeholder="jhon"
              icon={<Ant name="user" style={styles.icon} />}
              value={username}
              onChangeText={setUserName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Password</Text>
            <Input
              placeholder="**************"
              icon={<Ant name="lock" style={styles.icon} />}
              value={password}
              onChangeText={setPassword}
              isSecure={securePw}
              toggleSecure={() => setSecurePw(!securePw)}
              secrueInput={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Re-enter password</Text>
            <Input
              placeholder="**************"
              icon={<Ant name="lock" style={styles.icon} />}
              onChangeText={setReTypePassword}
              isSecure={sercureRPw}
              toggleSecure={() => setSecureRPw(!sercureRPw)}
              secrueInput={true}
              value={resTypePassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Name</Text>
            <Input
              placeholder="jhon"
              icon={<Ant name="user" style={styles.icon} />}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Email</Text>
            <Input
              placeholder="jhon@gmail.com"
              icon={<FE name="at-sign" style={styles.icon} />}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Phone number</Text>
            <Input
              placeholder="0123456789"
              icon={<FE name="phone" style={styles.icon} />}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>City</Text>

            <DropDown
              onPress={() => navigation.navigate('CityModal')}
              value={categoryTypes.city}
              placeholder="Eg: Panadura"
            />
          </View>
          {loading ? (
            <ActivityIndicator
              color={ComponentStyles.COLORS.YELLOW_DARAK}
              size={30}
              style={{marginTop: wp('4%')}}
            />
          ) : (
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={signInWithEmail}>
              <Text style={styles.signUpBtnTxt}>Sign up</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    alignItems: 'center',
    paddingVertical: wp('2%'),
    paddingBottom: wp('4%'),
  },
  subContainerTxt: {
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    color: 'black',
    fontWeight: '600',
  },
  subTxt: {
    fontSize: ComponentStyles.FONT_SIZE.SMALL - 2,
    color: 'black',
    fontWeight: '600',
    marginTop: hp('1.5%'),
  },
  loginBtn: {
    textDecorationLine: 'underline',
    color: ComponentStyles.COLORS.YELLOW_DARAK,
  },
  inputMainContainer: {
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('4%'),
    // marginTop: hp('2%'),
  },
  inputContainer: {
    paddingVertical: wp('2%'),
  },
  labelTxt: {
    fontSize: ComponentStyles.FONT_SIZE.EX_SMALL,
    fontWeight: 'bold',
    marginBottom: wp('3%'),
    color: 'grey',
  },
  icon: {
    position: 'absolute',
    left: 18,
    color: ComponentStyles.COLORS.WHITE,
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },

  signUpBtn: {
    backgroundColor: ComponentStyles.COLORS.YELLOW_DARAK,
    paddingVertical: hp('2.5%'),
    marginBottom: 30,
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginTop: wp('8%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  signUpBtnTxt: {
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
});
