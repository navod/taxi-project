import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import HeaderContainer from '../../UI/HeaderContainer';
import ComponentStyles, {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../constants/ComponentStyles';
import VehicleList from './VehicleList/VehicleList';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDetails, setUserId} from '../../../store/slices/user';
import Ant from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../UI/Input';

const Vehicle = () => {
  const {posts, user_id} = useSelector(state => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(posts);

  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    AsyncStorage.removeItem('AUTH_KEY');
    AsyncStorage.removeItem('USER_KEY');
    dispatch(setUserDetails(null));
    dispatch(setUserId(null));
    // queryData();
  };

  const handleSearch = text => {
    setSearchTerm(text);

    if (text.length === 0) {
      setFilteredData(posts);
    } else {
      const filtered = posts?.filter(item => {
        return (
          // item?.vehicle_register?.toLowerCase()?.includes(text) ||
          item?.vehicle_type?.toLowerCase()?.includes(text) ||
          item?.vehicle_name?.toLowerCase()?.includes(text) ||
          item?.year?.toLowerCase()?.includes(text) ||
          item?.fuel_type?.toLowerCase()?.includes(text) ||
          item?.gear_type?.toLowerCase()?.includes(text)
        );
      });
      setFilteredData(filtered);
    }
  };

  return (
    <View style={{flex: 1}}>
      <HeaderContainer />
      {user_id !== null && (
        <TouchableOpacity style={styles.logoutBtn}>
          <Ant
            name="logout"
            color={ComponentStyles.COLORS.WHITE}
            size={15}
            onPress={() => onLogoutHandler()}
          />
        </TouchableOpacity>
      )}

      <View style={styles.mainContainer}>
        <Input
          placeholder={'search'}
          value={searchTerm}
          onChangeText={handleSearch}
          icon={
            <Ant
              name="search1"
              color={ComponentStyles.COLORS.WHITE}
              size={20}
              style={{position: 'absolute', left: 15}}
            />
          }
        />
        <Text style={styles.resultTxt}>{posts.length} Results</Text>
      </View>

      {filteredData?.length === 0 ? (
        <View style={styles.noData}>
          <Text>no data ...</Text>
        </View>
      ) : (
        <VehicleList data={filteredData} />
      )}
    </View>
  );
};

export default Vehicle;

const styles = StyleSheet.create({
  mainContainer: {
    padding: wp('4%'),
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    // padding: wp('3%'),
    borderRadius: wp('2%'),
    backgroundColor: ComponentStyles.COLORS.LIGHT_GREEN,
    width: 30,
    height: 30,
    // marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  loadingScreesn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('60%'),
  },
  headerTxt: {
    color: 'black',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp('2%'),
  },

  resultTxt: {
    fontSize: ComponentStyles.FONT_SIZE.SMALL - 1,
    color: 'gray',
    marginTop: 10,
  },
  searchBtn: {
    backgroundColor: ComponentStyles.COLORS.LIGHT_GREEN,
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('2%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: wp('5%'),
  },
  searchBtnTxt: {
    color: 'white',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    fontWeight: '600',
  },
});
