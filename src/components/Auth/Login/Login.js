import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import ComponentStyles, {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../constants/ComponentStyles';
import FA from 'react-native-vector-icons/FontAwesome5';
import HeaderContainer from '../../UI/HeaderContainer';
import Input from '../../UI/Input';
import {useNavigation} from '@react-navigation/native';
import {toast} from '../../../utility/utility';
import {
  ALERT_COLOR,
  ALERT_TYPE,
  LOGIN_SUCCESS_MSG,
  SIGN_UP_ERROR_MSG,
} from '../../../constants/Constatns';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDetails} from '../../../store/slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('navod1@gmail.com');
  const [password, setPassword] = useState('12345678');

  const [loading, setLoading] = useState('');

  const [securePw, setSecurePw] = useState(true);

  const isValid = () => {
    if (email === '' && password === '') {
      toast(SIGN_UP_ERROR_MSG.ALL_FIELDS_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (email === '') {
      toast(SIGN_UP_ERROR_MSG.EMAIL_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (password === '') {
      toast(SIGN_UP_ERROR_MSG.PASSWORD_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else {
      return true;
    }
  };

  const getUserDetails = uid => {
    firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          AsyncStorage.setItem('AUTH_KEY', uid);
          AsyncStorage.setItem(
            'USER_KEY',
            JSON.stringify(documentSnapshot.data()),
          );
          dispatch(setUserDetails(documentSnapshot.data()));
          toast(LOGIN_SUCCESS_MSG.LOGIN_SUCCESS, ALERT_TYPE.SUCCESS);
          navigation.navigate('VehicleRegistration');
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };

  const onLoginHandler = () => {
    if (isValid()) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          getUserDetails(res.user.uid);
        })
        .catch(error => {
          setLoading(false);
          if (error.code === 'auth/user-not-found') {
            console.log(error);

            toast('Account does not exist', ALERT_TYPE.ERROR);
          } else if (error.code === 'auth/invalid-email') {
            console.log(error);

            toast('Account does not exist', ALERT_TYPE.ERROR);
          } else {
            toast(
              'The password is invalid or the user does not have a password',
              ALERT_TYPE.ERROR,
            );
          }
        });
    }
  };
  return (
    <View>
      <HeaderContainer />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerTxt}>Sign In</Text>
          <Text style={styles.subTxt}>Please fill the credentials</Text>

          <View style={styles.inputContainer}>
            <Input
              placeholder={'Email'}
              icon={<FA name="user" style={styles.icon} />}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder={'password'}
              icon={<FA name="lock" style={styles.icon} />}
              value={password}
              onChangeText={setPassword}
              isSecure={securePw}
              toggleSecure={() => setSecurePw(!securePw)}
              secrueInput={true}
            />
          </View>
          {loading ? (
            <ActivityIndicator
              color={ComponentStyles.COLORS.YELLOW_DARAK}
              size={30}
              style={{marginTop: wp('25%')}}
            />
          ) : (
            <>
              <TouchableOpacity
                style={styles.yellowBtn}
                onPress={onLoginHandler}>
                <Text style={styles.yellowBtnTxt}>Sign in</Text>
              </TouchableOpacity>
              <View style={styles.signUpSection}>
                <Text style={styles.signUpHeaderTxt}>
                  Don't have a account?
                </Text>
                <TouchableOpacity
                  style={styles.signUpBtn}
                  onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.signUpBtnTxt}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: wp('6%'),
    marginTop: hp('4%'),
    // backgroundColor: ComponentStyles.COLORS.WHITE,
    flex: 1,
    justifyContent: 'center',
  },
  subTxt: {
    fontSize: ComponentStyles.FONT_SIZE.EX_SMALL,
    color: ComponentStyles.COLORS.DARK_GREY,
    marginTop: 10,
  },
  headerTxt: {
    fontSize: ComponentStyles.FONT_SIZE.LARGE,
    color: ComponentStyles.COLORS.BLACK,
    fontWeight: '700',
  },
  inputContainer: {
    marginTop: hp('5%'),
  },
  icon: {
    position: 'absolute',
    left: 18,
    color: ComponentStyles.COLORS.WHITE,
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },

  yellowBtn: {
    borderRadius: wp('20%'),
    backgroundColor: ComponentStyles.COLORS.YELLOW_DARAK,
    height: wp('13%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('10%'),
    width: wp('60%'),
    alignSelf: 'center',
  },
  yellowBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  signUpSection: {
    alignItems: 'center',
    marginTop: wp('10%'),
  },
  signUpBtn: {
    color: ComponentStyles.COLORS.YELLOW_DARAK,
    marginTop: wp('2%'),
  },
  signUpHeaderTxt: {
    color: ComponentStyles.COLORS.DARK_GREY,
    fontSize: ComponentStyles.FONT_SIZE.EX_SMALL,
    letterSpacing: 1,
  },
  signUpBtnTxt: {
    color: ComponentStyles.COLORS.YELLOW_DARAK,
    letterSpacing: 1,
    fontWeight: 'bold',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },
});
