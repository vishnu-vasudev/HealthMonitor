import React, {useContext} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../ContextProvider/AuthProvider';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/dist/FontAwesome';

const MyDrawer = props => {
  const {navigation} = props;
  const handWave = <Icon name="hand-wave" size={25} color="#fbc494" />;
  const profileIcon = <FIcon name="user-circle" size={60} />;

  const {user, logout} = useContext(AuthContext);

  return (
    <DrawerContentScrollView style={styles.dataCon} {...props}>
      <View style={styles.drawerContainer}>
        <View>
          <View style={styles.headContainer}>
            <View style={styles.greetingContainer}>
              <Text style={styles.helloText}>Hello{handWave}</Text>
              <Text style={styles.displayName}>{user.displayName}</Text>
            </View>
            <Text style={styles.profileIcon}>{profileIcon}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => logout()}
          style={styles.logoutBtnContainer}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({
  dataCon: {
    backgroundColor: '#303030',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    borderRadius: 20,
    margin: 8,
    paddingBottom: 50,
  },
  profileIcon: {
    marginRight: 10,
    marginTop: 10,
    color: 'white',
  },
  greetingContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  helloText: {
    fontSize: 17,
    color: 'white',
  },
  displayName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutBtn: {
    width: 150,
    backgroundColor: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    height: 40,
    textAlignVertical: 'center',
    fontSize: 20,
    borderRadius: 10,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  drawerContainer: {
    justifyContent: 'space-between',
    height: 870,
  },
});
