import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  ToastAndroid,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import HeaderContainer from '../../UI/HeaderContainer';
import ComponentStyles, {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../constants/ComponentStyles';
import {
  ALERT_TYPE,
  MODAL_TYPES,
  REGISTER_VEHICLE_ERROR_MSG,
  SIGN_UP_ERROR_MSG,
} from '../../../constants/Constatns';
import Input from '../../UI/Input';
import DropDown from '../../UI/DropDown';
import DropDownModal from '../../UI/DropDownModal';
import Ant from 'react-native-vector-icons/AntDesign';
import FA from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import MA from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker, {openCamera} from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Feather from 'react-native-vector-icons/Feather';
import {toast} from '../../../utility/utility';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {setCategoryTypes} from '../../../store/slices/user';

const VehicleRegistration = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const {userDetails, user_id, categoryTypes} = useSelector(
    state => state.user,
  );

  const [modalType, setModalType] = useState('');
  const [headerTitle, setHeaderTitle] = useState('');
  const [image, setImage] = useState();
  const [images, setImages] = useState([]);
  const [imgArray, setImgArray] = useState([]);
  const [defaultImages, setDefaultImages] = useState([1, 2, 3, 4, 5]);

  const [vehicleName, setVehicleName] = useState('');
  const [fuelType, setFuelType] = useState('Any');
  const [gearType, setGearType] = useState('Any');
  const [vehicleType, setVehicleType] = useState('Any');
  const [year, setYear] = useState('');
  const [expreience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onClear = () => {
    setVehicleName('');
    setFuelType('Any');
    setGearType('Any');
    setVehicleType('Any');
    setYear('');
    setExperience('');
    setDescription('');
    setImages([]);
    setImgArray([]);
    dispatch(setCategoryTypes({...categoryTypes, city: '', district: ''}));
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

      default:
        null;
    }
    setModalVisible(true);
  };
  const onHanldeSelect = selectTxt => {
    if (modalType === MODAL_TYPES.FUEL_MODAL) {
      setFuelType(selectTxt);
    }
    if (modalType === MODAL_TYPES.VEHICAL_TYPE_MODAL) {
      setVehicleType(selectTxt);
    }
    if (modalType === MODAL_TYPES.GEAR_MODAL) {
      setGearType(selectTxt);
    }
  };

  const checkMessage = msg => {
    toast('Vehicle Added', ALERT_TYPE.SUCCESS);
  };

  const saveToDB = () => {
    const obj = {
      vehicle_name: vehicleName,
      // fuel_type: fuelType,
      vehicleCity: categoryTypes.city,
      // gear_type: gearType,
      vehicle_type: vehicleType,
      expreience: expreience,
      description: description,
      images: imgArray,
      district: categoryTypes.district,
    };

    firestore()
      .collection('Posts')
      .add({...obj, ...userDetails})
      .then(() => {
        onClear();
        checkMessage('Post Added');
        setLoading(false);
      })
      .catch(err => {
        toast('Error in vehicle adding', ALERT_TYPE.ERROR);
        setLoading(false);
      });
  };

  const isValid = () => {
    if (
      vehicleName === '' &&
      categoryTypes.district === '' &&
      categoryTypes.city === '' &&
      expreience === '' &&
      description === ''
    ) {
      toast(SIGN_UP_ERROR_MSG.ALL_FIELDS_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (vehicleName === '') {
      toast(REGISTER_VEHICLE_ERROR_MSG.VEHICLE_NAME_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (expreience === '') {
      toast(REGISTER_VEHICLE_ERROR_MSG.EXPERIENCE_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (description === '') {
      toast(REGISTER_VEHICLE_ERROR_MSG.DESCRIPTION_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else if (images.length < 5) {
      toast(REGISTER_VEHICLE_ERROR_MSG.IMAGE_VALIDATION, ALERT_TYPE.WARNING);
      return false;
    } else if (categoryTypes.district === '') {
      toast('District Cannot be empty', ALERT_TYPE.WARNING);
      return false;
    } else if (categoryTypes.city === '') {
      toast(REGISTER_VEHICLE_ERROR_MSG.CITY_EMPTY, ALERT_TYPE.WARNING);
      return false;
    } else {
      return true;
    }
  };

  const savePost = async () => {
    if (isValid()) {
      if (images !== null) {
        setLoading(true);
        const promises = images.map(async (i, index) => {
          const file_name = new Date().getTime() + '.jpg';
          const reference = storage().ref(`${user_id}/vehicles/${file_name}`);
          await reference.putFile(i.uri).then(async () => {
            await storage()
              .ref(`${user_id}/vehicles/${file_name}`)
              .getDownloadURL()
              .then(resp => {
                setImgArray(imgArray.push(resp));
              });
          });
        });

        await Promise.all(promises).then(() => saveToDB());
      }
    }
  };

  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    }).then(results => {
      if (images.length === 5) {
        images.pop();
        setImages([
          ...images,
          ...results.map(i => {
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        ]);
      } else {
        setImages([
          ...images,
          ...results.map(i => {
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        ]);
      }
    });
  };

  const renderImage = image => {
    return (
      <Image
        style={{
          width: '90%',
          height: '90%',
          resizeMode: 'contain',
        }}
        source={image}
      />
    );
  };

  const navigation = useNavigation();

  const renderAsset = image => {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return null;
    }

    return renderImage(image);
  };

  return (
    <View style={{flex: 1}}>
      <HeaderContainer />
      <Text style={styles.headerTxt}>Register your vehicle</Text>
      <Modal isVisible={modalVisible}>
        <DropDownModal
          droptDownType={modalType}
          onClose={() => setModalVisible(false)}
          headerTitle={headerTitle}
          onSelect={onHanldeSelect}
          selectFuel={fuelType}
          selectVehicleType={vehicleType}
          gearType={gearType}
        />
      </Modal>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Vehicle Name</Text>

            <Input
              placeholder={'Eg: vehicle name'}
              icon={<MA name="van-passenger" style={styles.icon} />}
              value={vehicleName}
              onChangeText={setVehicleName}
            />
          </View>
          {/* <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Fuel Type</Text>

            <DropDown
              onPress={() => onHandleModal(MODAL_TYPES.FUEL_MODAL)}
              value={fuelType}
              placeholder="Any"
            />
          </View> */}

          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>District</Text>

            <DropDown
              onPress={() => navigation.navigate('DistrictModal')}
              //   value={city}
              placeholder="Eg: Kaluthara"
              value={categoryTypes.district}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>City</Text>

            <DropDown
              onPress={() => {
                if (categoryTypes.district === '') {
                  toast('Select District', ALERT_TYPE.WARNING);
                } else {
                  navigation.navigate('CityModal');
                }
              }}
              //   value={city}
              placeholder="Eg: Panadura"
              value={categoryTypes.city}
            />
          </View>
          {/* <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Gear Type</Text>

            <DropDown
              onPress={() => onHandleModal(MODAL_TYPES.GEAR_MODAL)}
              value={gearType}
              placeholder="Any"
            />
          </View> */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Vehicle Type</Text>

            <DropDown
              onPress={() => onHandleModal(MODAL_TYPES.VEHICAL_TYPE_MODAL)}
              value={vehicleType}
              placeholder="Any"
            />
          </View>
          {/* <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Year</Text>

            <Input
              placeholder={'Eg: 2001'}
              icon={<FA name="yahoo" style={styles.icon} />}
              value={year}
              onChangeText={setYear}
            />
          </View> */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Driving Experience</Text>

            <TextInput
              placeholder="Eg: your experience"
              multiline
              style={styles.input}
              value={expreience}
              onChangeText={setExperience}
              placeholderTextColor="grey"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelTxt}>Description</Text>

            <TextInput
              placeholder="description"
              multiline
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholderTextColor="grey"
            />
          </View>
          <View style={styles.imageContainer}>
            {image ? renderAsset(image) : null}
            {images
              ? images.map(i => (
                  <TouchableOpacity
                    key={i.uri}
                    style={styles.btn}
                    onPress={pickMultiple}>
                    {renderAsset(i)}
                  </TouchableOpacity>
                ))
              : null}

            {defaultImages.map((item, index) => {
              return (
                <>
                  {images.length <= index ? (
                    <TouchableOpacity
                      key={index}
                      style={styles.btn}
                      onPress={pickMultiple}>
                      <Feather name="image" size={50} color="grey" />
                    </TouchableOpacity>
                  ) : null}
                </>
              );
            })}
          </View>

          {loading ? (
            <ActivityIndicator
              size={30}
              color={ComponentStyles.COLORS.YELLOW_DARAK}
              style={{marginVertical: wp('6%')}}
            />
          ) : (
            <TouchableOpacity style={styles.searchBtn} onPress={savePost}>
              <Text style={styles.btnTxt}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default VehicleRegistration;

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
    color: 'grey',
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
    marginTop: wp('6%'),
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
    color: 'grey',
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  input: {
    fontWeight: '500',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    color: ComponentStyles.COLORS.BLACK,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: wp('20%'),
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: 'white',
    width: wp('43%'),
    height: wp('40%'),
    // height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  imageContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    gap: 20,
    marginTop: wp('4%'),
  },
});
