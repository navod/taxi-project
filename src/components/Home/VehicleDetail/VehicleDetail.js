import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import HeaderContainer from '../../UI/HeaderContainer';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import ComponentStyles, {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../../constants/ComponentStyles';

const VehicleDetail = () => {
  const {post} = useSelector(state => state.user);

  return (
    <View style={styles.mainContainer}>
      <HeaderContainer />

      <View style={styles.subConainer}>
        <Swiper
          showsButtons={false}
          style={styles.swiper}
          dotColor={ComponentStyles.COLORS.YELLOW_DARAK}
          activeDotColor={ComponentStyles.COLORS.WHITE}>
          {post.images.map((images, index) => {
            return (
              <FastImage
                key={index}
                style={styles.imgContainer}
                source={{
                  uri: images,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            );
          })}
        </Swiper>
      </View>
      <ScrollView>
        <View style={styles.subView}>
          <Text style={{...styles.title, marginLeft: 0}}>Vehicle Details</Text>
          <Text style={styles.mainLabel}>Vehicle Name</Text>
          <Text style={styles.mainSubTxt}>{post.vehicle_name}</Text>

          <Text style={styles.mainLabel}>Description</Text>
          <Text style={styles.mainSubTxt}>{post.description}</Text>

          <Text style={styles.mainLabel}>Experience</Text>
          <Text style={styles.mainSubTxt}>{post.expreience}</Text>

          <Text style={styles.mainLabel}>Fuel Type</Text>
          <Text style={styles.mainSubTxt}>{post.fuel_type}</Text>

          <Text style={styles.mainLabel}>Gear Type</Text>
          <Text style={styles.mainSubTxt}>{post.gear_type}</Text>

          <Text style={styles.mainLabel}>City</Text>
          <Text style={styles.mainSubTxt}>{post.city ? post.city : 'N/A'}</Text>
        </View>

        <View style={styles.driverSection}>
          <Text style={styles.title}>Driver Details</Text>

          <View style={{paddingBottom: widthPercentageToDP('4%')}}>
            <View style={styles.subView}>
              <Text style={styles.mainLabel}>Driver Name</Text>
              <Text style={styles.mainSubTxt}>{post.name}</Text>
              <Text style={styles.mainLabel}>Phone Number</Text>
              <Text style={styles.mainSubTxt}>{post.phone_number}</Text>

              <Text style={styles.mainLabel}>Email</Text>
              <Text style={styles.mainSubTxt}>{post.email}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VehicleDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  swiper: {
    height: 200,
    // width: '100%',
  },
  subConainer: {
    height: 200,
    width: '100%',
  },
  imgContainer: {
    width: '100%',
    height: '90%',
  },
  title: {
    fontSize: ComponentStyles.FONT_SIZE.LARGE,
    color: ComponentStyles.COLORS.BLACK,
    marginVertical: heightPercentageToDP('4%'),
    marginLeft: widthPercentageToDP('4%'),
    fontWeight: '600',
  },
  mainLabel: {
    fontSize: ComponentStyles.FONT_SIZE.SMALL,
    color: ComponentStyles.COLORS.BLACK,
    fontWeight: '600',
    marginVertical: widthPercentageToDP('2%'),
  },
  subView: {
    paddingHorizontal: widthPercentageToDP('4%'),
  },

  mainSubTxt: {
    fontSize: ComponentStyles.FONT_SIZE.EX_SMALL,
    color: 'grey',
    fontWeight: '400',
    fontStyle: 'italic',
  },
});
