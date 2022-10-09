import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import MyDrawer from './MyDrawer';
import HomePage from './HomePage';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 360,
          borderRadius: 30
        },
      }}
      drawerContent={props => <MyDrawer {...props} />}>
      <Drawer.Screen component={HomePage} name={'Home'} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
