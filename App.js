import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import Login from './src/components/Auth/Login/Login';
import Signup from './src/components/Auth/Signup/Signup';
import Category from './src/components/Home/Category/Category';
import Vehicle from './src/components/Home/Vehicle/Vehicle';
import VehicleRegistration from './src/components/Home/VehicleRegistration/VehicleRegistration';
import {store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackScreen from './src/screens/AuthStackScreen/AuthStackScreen';
import {RootSiblingParent} from 'react-native-root-siblings';
import VehicleDetail from './src/components/Home/VehicleDetail/VehicleDetail';
import SearchScreen from './Test';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootSiblingParent>
          <AuthStackScreen />
        </RootSiblingParent>
      </NavigationContainer>
    </Provider>
    // <SearchScreen />
  );
};

export default App;
