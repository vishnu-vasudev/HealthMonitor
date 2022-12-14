import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../ContextProvider/AuthProvider';
import {comStyle} from '../style/comStyle';

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={comStyle.inputLabel}>Enter your e-mail</Text>
      <TextInput
        onChangeText={userEmail => setEmail(userEmail)}
        placeholder="e-mail"
        style={comStyle.inputBox}
      />
      <Text style={comStyle.inputLabel}>Enter the password</Text>
      <TextInput
        onChangeText={userPassword => setPassword(userPassword)}
        placeholder="password"
        style={comStyle.inputBox}
      />
      <TouchableOpacity onPress={() => login(email, password)}>
        <Text style={styles.loginBtn}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 60,
  },
  loginBtn: {
    marginLeft: 130,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#82B1FF',
    width: 60,
    height: 30,
    textAlign: 'center',
    paddingTop: 5,
    color: 'white',
  },
});
