import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../UI/Input';
import ComponentStyles, {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../constants/ComponentStyles';
import BackgroundImage from '../../../assets/background.jpg';
import HeaderContainer from '../../UI/HeaderContainer';
import {useNavigation} from '@react-navigation/native';
import En from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from '../../../utility/utility';
import {ALERT_TYPE} from '../../../constants/Constatns';
import {setPosts} from '../../../store/slices/user';
import firestore from '@react-native-firebase/firestore';

const SearchLocation = () => {
  const navigation = useNavigation();

  const {pickupLocation, destination, posts} = useSelector(state => state.user);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const isValid = () => {
    if (pickupLocation === '' && destination === '') {
      toast('Select locations', ALERT_TYPE.WARNING);
      return false;
    } else if (pickupLocation === '') {
      toast('Select District', ALERT_TYPE.WARNING);
      return false;
    } else if (destination === '') {
      toast('Select City', ALERT_TYPE.WARNING);
      return false;
    } else {
      return true;
    }
  };

  const onGetAllPosts = () => {
    setLoading(true);
    firestore()
      .collection('Posts')
      .where('vehicleCity', '==', destination)
      .onSnapshot(documentSnapshot2 => {
        const list = [];
        documentSnapshot2.forEach(doc => {
          if (doc.exists) {
            list.push(doc.data());
          }
        });

        dispatch(setPosts(list));
        navigation.navigate('Vehicle');
        setLoading(false);
      });
    setLoading(true);
    firestore()
      .collection('Posts')
      .where('district', '==', pickupLocation)
      .onSnapshot(documentSnapshot2 => {
        const data = [];
        documentSnapshot2.forEach(doc => {
          if (doc.exists) {
            data.push(doc.data());
          }
        });

        if (data.length > 0) {
          const updatedValues = [...posts, ...data];
          dispatch(setPosts(updatedValues));
        }
        navigation.navigate('Vehicle');
        setLoading(false);
      });
  };
  const onSearchHandler = () => {
    if (isValid()) {
      onGetAllPosts();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <HeaderContainer />
      {/* <Text>SearchLocation</Text> */}
      <View style={styles.imgConatainer}>
        <Image source={BackgroundImage} style={styles.image} />
      </View>
      <View style={styles.searchConatiner}>
        <View style={styles.inputContainer}>
          <En
            name="arrow-left"
            size={15}
            color={ComponentStyles.COLORS.WHITE}
            style={styles.icon}
          />
          <TouchableOpacity
            style={styles.textInput}
            onPress={() => navigation.navigate('SearchCity1')}>
            <Text style={styles.inputTxt}>
              {pickupLocation !== '' ? pickupLocation : 'Select District'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <En
            name="arrow-right"
            size={15}
            color={ComponentStyles.COLORS.WHITE}
            style={styles.icon}
          />
          <TouchableOpacity
            style={styles.textInput}
            onPress={() => {
              if (pickupLocation === '') {
                toast('Select District', ALERT_TYPE.WARNING);
              } else {
                navigation.navigate('SearchCity2');
              }
            }}>
            <Text style={styles.inputTxt}>
              {destination !== '' ? destination : 'Select City'}
            </Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator
            size={30}
            color={ComponentStyles.COLORS.YELLOW_DARAK}
            style={{marginTop: wp('10%')}}
          />
        ) : (
          <TouchableOpacity style={styles.searchBtn} onPress={onSearchHandler}>
            <Text style={styles.searchBtnTxt}>Search</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchLocation;

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
  },
  imgConatainer: {
    flex: 0.5,
  },
  searchConatiner: {
    marginTop: wp('4%'),
    padding: wp('4%'),
    flex: 0.5,
  },
  //   inputContainer: {
  //     marginTop: wp('4%'),
  //   },
  searchBtn: {
    width: '100%',
    paddingVertical: wp('4%'),
    backgroundColor: ComponentStyles.COLORS.YELLOW_DARAK,
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginTop: hp('6%'),

    elevation: 4,
  },
  searchBtnTxt: {
    color: 'white',
    fontWeight: '600',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },
  image: {
    width: '100%',
    height: '100%',
  },
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
    height: hp('8%'),
    marginTop: wp('4%'),
  },
  icon: {
    position: 'absolute',
    left: 15,
    color: 'white',
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
    height: '100%',
    justifyContent: 'center',
  },
  inputTxt: {
    fontWeight: '600',
    color: 'grey',
    fontSize: ComponentStyles.FONT_SIZE.EX_SMALL,
  },
  //   input
});
