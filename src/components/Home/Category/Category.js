import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import HeaderContainer from '../../UI/HeaderContainer';
import ComponentStyles, {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../constants/ComponentStyles';
import DropDown from '../../UI/DropDown';
import DropDownModal from '../../UI/DropDownModal';
import Modal from 'react-native-modal';
import {MODAL_TYPES} from '../../../constants/Constatns';
import Input from '../../UI/Input';
import Ant from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoryTypes} from '../../../store/slices/user';

const Category = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fuelType, setFuelType] = useState('Any');

  const [modalType, setModalType] = useState('');
  const [headerTitle, setHeaderTitle] = useState('');

  const queryData1 = () => {
    console.log('method start');
    if (
      categoryTypes.fuelType === 'Any' &&
      categoryTypes.city === '' &&
      categoryTypes.gearType === 'Any' &&
      categoryTypes.vehicleType === 'Any' &&
      categoryTypes.yearMax === '' &&
      categoryTypes.yearMin === '' &&
      categoryTypes.vehicleName === ''
    ) {
      console.log('hello 1');
      firestore()
        .collection('Posts')
        .onSnapshot(documentSnapshot2 => {
          // const list = [];
          documentSnapshot2.forEach(doc => {
            if (doc.exists) {
              console.log(doc.data());
            }
          });

          // dispatch(setPosts(list));
          // setLoading(false);
        });
    } else {
      if (
        categoryTypes.yearMax !== '' &&
        categoryTypes.yearMin !== '' &&
        categoryTypes.vehicleName !== '' &&
        categoryTypes.city !== ''
      ) {
        console.log('hello 2');
        firestore()
          .collection('Posts')
          .where('vehicle_name', '==', categoryTypes.vehicleName)
          .where('fuel_type', '==', categoryTypes.fuelType)
          .where('vehicle_register', '==', categoryTypes.city)
          .where('gear_type', '==', categoryTypes.gearType)
          .where('vehicle_type', '==', categoryTypes.vehicleType)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (doc.data().year >= 2000 && doc.data().year <= 2005)
                console.log(doc.id, ' => ', doc.data());
            });
          });
      }
      if (
        categoryTypes.vehicleName !== '' &&
        categoryTypes.yearMax === '' &&
        categoryTypes.yearMin === '' &&
        categoryTypes.city === ''
      ) {
        console.log('hello 3');
        firestore()
          .collection('Posts')
          .where('vehicle_name', '==', categoryTypes.vehicleName)
          .where('fuel_type', '==', categoryTypes.fuelType)
          .where('gear_type', '==', categoryTypes.gearType)
          .where('vehicle_type', '==', categoryTypes.vehicleType)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              console.log(doc.id, ' => ', doc.data());
            });
          });
        if (
          categoryTypes.city !== '' &&
          categoryTypes.vehicleName === '' &&
          categoryTypes.yearMax === '' &&
          categoryTypes.yearMin === ''
        ) {
          firestore()
            .collection('Posts')
            .where('fuel_type', '==', categoryTypes.fuelType)
            .where('gear_type', '==', categoryTypes.gearType)
            .where('vehicle_type', '==', categoryTypes.vehicleType)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                console.log(doc.id, ' => ', doc.data());
              });
            });
        }
      }
      if (
        categoryTypes.yearMax !== '' &&
        categoryTypes.yearMin !== '' &&
        categoryTypes.city === '' &&
        categoryTypes.vehicleName === ''
      ) {
        firestore()
          .collection('Posts')
          .where('fuel_type', '==', categoryTypes.fuelType)
          .where('gear_type', '==', categoryTypes.gearType)
          .where('vehicle_type', '==', categoryTypes.vehicleType)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              console.log(doc.id, ' => ', doc.data());
            });
          });
      } else if (
        categoryTypes.city !== '' &&
        categoryTypes.vehicleName === ''
      ) {
        firestore()
          .collection('Posts')
          .where('fuel_type', '==', categoryTypes.fuelType)
          .where('vehicle_register', '==', categoryTypes.city)
          .where('year', '>=', categoryTypes.yearMin)
          .where('year', '<=', categoryTypes.yearMax)
          .where('gear_type', '==', categoryTypes.gearType)
          .where('vehicle_type', '==', categoryTypes.vehicleType)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              console.log(doc.id, ' => ', doc.data());
            });
          });
      } else if (
        categoryTypes.vehicleName !== '' &&
        categoryTypes.city === ''
      ) {
        firestore()
          .collection('Posts')
          .where('vehicle_name', '==', categoryTypes.vehicleName)
          .where('fuel_type', '==', categoryTypes.fuelType)
          .where('vehicle_register', '==', categoryTypes.city)
          .where('year', '>=', categoryTypes.yearMin)
          .where('year', '<=', categoryTypes.yearMax)
          .where('gear_type', '==', categoryTypes.gearType)
          .where('vehicle_type', '==', categoryTypes.vehicleType)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              console.log(doc.id, ' => ', doc.data());
            });
          });
      } else {
      }
    }
  };

  const onHandleModal = modal => {
    switch (modal) {
      case MODAL_TYPES.FUEL_MODAL:
        setHeaderTitle('Fuel Type');
        setModalType(MODAL_TYPES.FUEL_MODAL);

        break;

      case MODAL_TYPES.GEAR_MODAL:
        setHeaderTitle('Gear Type');
        setModalType(MODAL_TYPES.GEAR_MODAL);
        break;

      case MODAL_TYPES.VEHICAL_TYPE_MODAL:
        setHeaderTitle('Vehicle Type');
        setModalType(MODAL_TYPES.VEHICAL_TYPE_MODAL);
        break;

      case MODAL_TYPES.CITY_MODAL:
        setHeaderTitle('Select City');
        setModalType(MODAL_TYPES.CITY_MODAL);
        break;

      default:
        null;
    }
    setModalVisible(true);
  };
  const dispatch = useDispatch();
  const {categoryTypes} = useSelector(state => state.user);

  const onHanldeSelect = selectTxt => {
    if (modalType === MODAL_TYPES.FUEL_MODAL) {
      dispatch(setCategoryTypes({...categoryTypes, fuelType: selectTxt}));
    }
    if (modalType === MODAL_TYPES.VEHICAL_TYPE_MODAL) {
      dispatch(setCategoryTypes({...categoryTypes, vehicleType: selectTxt}));
    }
    if (modalType === MODAL_TYPES.GEAR_MODAL) {
      dispatch(setCategoryTypes({...categoryTypes, gearType: selectTxt}));
    }
  };

  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <HeaderContainer />
      <Text style={styles.headerTxt}>
        Search Vehicles For Rent in Sri Lanka
      </Text>
      <Modal isVisible={modalVisible}>
        <DropDownModal
          droptDownType={modalType}
          headerTitle={headerTitle}
          onSelect={onHanldeSelect}
          onClose={() => setModalVisible(false)}
          selectFuel={categoryTypes.fuelType}
          selectVehicleType={categoryTypes.vehicleType}
          gearType={categoryTypes.gearType}
        />
      </Modal>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Vehicle Name</Text>

            <Input
              placeholder={'Vehicle name'}
              icon={<Ant name="search1" style={styles.icon} />}
              onChangeText={val =>
                dispatch(setCategoryTypes({...categoryTypes, vehicleName: val}))
              }
              value={categoryTypes.vehicleName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Fuel Type</Text>

            <DropDown
              onPress={() => onHandleModal(MODAL_TYPES.FUEL_MODAL)}
              value={categoryTypes.fuelType}
              placeholder="Any"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>City</Text>

            <DropDown
              onPress={() => navigation.navigate('CityModal')}
              //   value={city}
              placeholder="Any"
              value={categoryTypes.city}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Gear Type</Text>

            <DropDown
              onPress={() => onHandleModal(MODAL_TYPES.GEAR_MODAL)}
              value={categoryTypes.gearType}
              placeholder="Any"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Vehicle Type</Text>

            <DropDown
              onPress={() => onHandleModal(MODAL_TYPES.VEHICAL_TYPE_MODAL)}
              value={categoryTypes.vehicleType}
              placeholder="Any"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Year</Text>
            <View style={styles.inputRow}>
              <View style={{width: '47%'}}>
                <Input
                  placeholder={'Any'}
                  icon={<Ant name="minus" style={styles.icon} />}
                  keyboardType="numeric"
                  onChangeText={val =>
                    dispatch(setCategoryTypes({...categoryTypes, yearMin: val}))
                  }
                  value={categoryTypes.yearMin}
                />
              </View>

              <View style={{width: '47%'}}>
                <Input
                  placeholder={'Any'}
                  icon={<Ant name="plus" style={styles.icon} />}
                  keyboardType="numeric"
                  onChangeText={val =>
                    dispatch(setCategoryTypes({...categoryTypes, yearMax: val}))
                  }
                  value={categoryTypes.yearMax}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBtn} onPress={queryData1}>
          <Text style={styles.btnTxt}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: wp('4%'),
    paddingBottom: wp('4%'),
  },
  icon: {
    position: 'absolute',
    left: 18,
    color: ComponentStyles.COLORS.WHITE,
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },
  labelTxt: {
    fontSize: ComponentStyles.FONT_SIZE.EX_SMALL,
    fontWeight: 'bold',
    marginBottom: wp('3%'),
  },
  inputContainer: {
    paddingVertical: wp('2%'),
  },
  searchContainer: {
    padding: wp('4%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    backgroundColor: ComponentStyles.COLORS.LIGHT_YELLOW_2,
  },
  searchBtn: {
    backgroundColor: ComponentStyles.COLORS.YELLOW_DARAK,
    borderRadius: wp('1%'),
    alignItems: 'center',
    paddingVertical: wp('4%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnTxt: {
    color: 'white',
    fontWeight: '600',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },
  headerTxt: {
    textAlign: 'center',
    paddingVertical: wp('3%'),
    fontWeight: '600',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
