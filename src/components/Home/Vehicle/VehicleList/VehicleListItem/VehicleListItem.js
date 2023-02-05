import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import ComponentStyles, {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../../../constants/ComponentStyles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setPost} from '../../../../../store/slices/user';

const VehicleListItem = ({data}) => {
  const navigaton = useNavigation();

  const dispatch = useDispatch();

  const onNavigationHandler = () => {
    dispatch(setPost(data));
    navigaton.navigate('VehicleDetail');
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={onNavigationHandler}>
        <View style={styles.mainRow}>
          <View style={styles.subColumn}>
            <Text style={styles.title}>{data.vehicle_name}</Text>
            <View style={styles.subColumn2}>
              <Text style={styles.subTxt}>{data.city}</Text>
              <Text style={styles.price}>Model</Text>
              {/* <Text style={styles.subTxt}>2020-10-12</Text> */}
            </View>
          </View>

          {data.images && (
            <Image
              source={{uri: data?.images[0]}}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default VehicleListItem;

const styles = StyleSheet.create({
  mainContainer: {
    padding: wp('4%'),
    height: hp('20%'),
    backgroundColor: ComponentStyles.COLORS.LIGHT_YELLOW_2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: wp('3%'),
  },
  image: {
    width: '30%',
    height: '100%',
    borderRadius: wp('2%'),
    resizeMode: 'contain',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  subColumn: {
    flexDirection: 'column',
    // gap: 5,
  },
  title: {
    fontWeight: '600',
    color: 'black',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    marginBottom: wp('2%'),
  },
  price: {
    fontWeight: '600',
    color: 'black',
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
  },
  subColumn2: {
    flexDirection: 'column',
    gap: 8,
  },
  subTxt: {
    color: 'gray',
    fontSize: ComponentStyles.FONT_SIZE.EX_SMALL,
  },
});
