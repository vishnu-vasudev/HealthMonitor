import React, {useContext, useEffect, useState} from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './ContextProvider/AuthProvider';
import SignUpScreen from './components/SignUpScreen';
import BodyTemp from './components/BodyTemp';

const Stack = createNativeStackNavigator();

const App = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="Home" component={HomePage} />
        ) : (
          <Stack.Screen name="Login" component={LoginPage} />
        )}
        <Stack.Screen name="BodyTemp" component={BodyTemp} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
