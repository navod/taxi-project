import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import HeaderContainer from '../../UI/HeaderContainer';
import Input from '../../UI/Input';
import ComponentStyles, {
  widthPercentageToDP as wp,
} from '../../../constants/ComponentStyles';
import {CITES2} from '../../../constants/cities2';
import Ant from 'react-native-vector-icons/AntDesign';
import IO from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  setDestination,
  setLocation,
  setPickupLocation,
} from '../../../store/slices/user';
import {useDispatch, useSelector} from 'react-redux';
import {DISTRICS} from '../../../constants/districts';

const SearchCity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(DISTRICS);

  const handleSearch = text => {
    setSearchTerm(text);

    const filtered = DISTRICS.filter(item => {
      return item?.toLowerCase()?.includes(text.toLowerCase());
    });

    setFilteredData(filtered);
  };

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onSelectHandler = value => {
    dispatch(setPickupLocation(value));
    dispatch(setDestination(''));
    navigation.goBack();
  };

  const renderItem = ({item, index}) => (
    <View style={styles.item}>
      <View key={index}>
        <TouchableOpacity
          style={styles.subBtn}
          onPress={() => onSelectHandler(item)}>
          <IO
            name="location-sharp"
            size={20}
            color={ComponentStyles.COLORS.YELLOW_DARAK}
          />
          <Text style={styles.subTxt}>{item}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View>
      <HeaderContainer />
      <Text style={styles.headerTxt}>Search Pick Up Location</Text>
      <View style={styles.mainContainer}>
        <Input
          placeholder={'Search'}
          onChangeText={handleSearch}
          value={searchTerm}
          icon={<Ant name="search1" style={styles.icon} size={15} />}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default SearchCity;

const styles = StyleSheet.create({
  mainContainer: {
    padding: wp('3%'),
  },
  headerTxt: {
    fontWeight: '600',
    color: 'black',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    textAlign: 'center',
    marginTop: wp('3%'),
    marginBottom: wp('5%'),
  },
  district: {
    color: ComponentStyles.COLORS.BLACK,
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    fontWeight: 'bold',
    marginVertical: wp('2%'),
    letterSpacing: 0.7,
  },
  subBtn: {
    paddingVertical: wp('2%'),
    // backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  subTxt: {
    color: 'black',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: ComponentStyles.COLORS.GREY,
    fontSize: ComponentStyles.FONT_SIZE.EX_SMALL + 1,
    width: '100%',
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
    color: 'white',
    position: 'absolute',
    left: 15,
  },
  item: {
    // backgroundColor: 'white',
  },
});
