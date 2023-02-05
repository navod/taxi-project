import {View, Text, FlatList} from 'react-native';
import React from 'react';
import VehicleListItem from './VehicleListItem/VehicleListItem';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from '../../../../constants/ComponentStyles';

const VehicleList = ({data}) => {
  // const data = [{}, {}, {}, {}, {}, {}, {}, {}];
  const renderItems = ({item}) => {
    return (
      <View style={{paddingHorizontal: wp('4%')}}>
        <VehicleListItem data={item} />
      </View>
    );
  };

  const seperator = () => {
    return <View style={{height: 15}}></View>;
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItems}
      ItemSeparatorComponent={seperator}
      ListFooterComponent={seperator}
    />
  );
};

export default VehicleList;
