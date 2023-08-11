import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';
import Vehicle from '../../components/Home/Vehicle/Vehicle';
import Category from '../../components/Home/Category/Category';
import VehicleRegistration from '../../components/Home/VehicleRegistration/VehicleRegistration';
import VehicleDetail from '../../components/Home/VehicleDetail/VehicleDetail';
import CityModal from '../../components/UI/CityModal';
import List from '../../../Test';
import SearchLocation from '../../components/Home/SearchLocation/SearchLocation';
import SearchCity1 from '../../components/Home/SearchLocation/SearchCity1';
import SearchCity2 from '../../components/Home/SearchLocation/SearchCity2';
import DistrictModal from '../../components/UI/DistrictModal';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SearchLocation" component={SearchLocation} />
      <AuthStack.Screen name="Vehicle" component={Vehicle} />
      <AuthStack.Screen name="SearchCity1" component={SearchCity1} />
      <AuthStack.Screen name="SearchCity2" component={SearchCity2} />
      <AuthStack.Screen name="Category" component={Category} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="VehicleDetail" component={VehicleDetail} />
      <AuthStack.Screen
        name="VehicleRegistration"
        component={VehicleRegistration}
      />
      <AuthStack.Screen name="CityModal" component={CityModal} />
      <AuthStack.Screen name="DistrictModal" component={DistrictModal} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
