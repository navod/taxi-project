import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ComponentStyles, {
  widthPercentageToDP as wp,
} from '../../constants/ComponentStyles';
import FA from 'react-native-vector-icons/FontAwesome';
import IO from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {CITES2} from '../../constants/cities2';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoryTypes} from '../../store/slices/user';
import Input from './Input';
import Ant from 'react-native-vector-icons/AntDesign';
import {DISTRICS} from '../../constants/districts';

const DistrictModal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(DISTRICS);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {categoryTypes} = useSelector(state => state.user);

  const onSelectHandler = value => {
    dispatch(setCategoryTypes({...categoryTypes, district: value, city: ''}));
    // onSelect(value);
    navigation.goBack();
  };

  function containsNumber(str) {
    return /[$]/.test(str);
  }

  const handleSearch = text => {
    setSearchTerm(text);

    const filtered = DISTRICS.filter(item => {
      return item?.toLowerCase()?.includes(text.toLowerCase());
    });

    setFilteredData(filtered);
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
    <View style={styles.mainConatiner}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Select city</Text>
        <FA
          name="window-close"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
      </View>

      <Input
        placeholder={'Search'}
        onChangeText={handleSearch}
        value={searchTerm}
        icon={<Ant name="search1" style={styles.icon2} size={15} />}
      />

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default DistrictModal;

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: 'white',
    // borderRadius: wp('4%'),
    padding: wp('4%'),
  },
  headerTxt: {
    color: ComponentStyles.COLORS.BLACK,
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    fontWeight: 'bold',
    marginVertical: wp('2%'),
    letterSpacing: 0.7,
  },
  subBtn: {
    paddingVertical: wp('2%'),
    backgroundColor: 'white',
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
    fontSize: ComponentStyles.ICON_SIZE.MEDIUM,
    color: ComponentStyles.COLORS.YELLOW_DARAK,
  },
  icon2: {
    color: 'white',
    position: 'absolute',
    left: 20,
  },
});
