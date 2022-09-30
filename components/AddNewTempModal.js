import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import AIcon from 'react-native-vector-icons/dist/AntDesign';
import {AuthContext} from '../ContextProvider/AuthProvider';

const AddNewTempModal = ({visible, updateVisible}) => {
  const [showModal, setShowModal] = useState();
  const {user} = useContext(AuthContext);
  // const scaleValue = useRef(new Animated.Value(0).current);
  const [bodyTemp, setBodyTemp] = useState();
  var [textInput] = useState();

  const closeIcon = <AIcon name="close" size={22} />;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      // Animated.spring(scaleValue, {
      //   toValue: 1,
      //   duration: 300,
      //   useNativeDriver: true,
      // }).start();
    } else {
      setShowModal(false);
    }
  };

  const storeData = () => {
    firestore()
      .collection('newTemp')
      .add({
        temp: bodyTemp,
        user_id: user.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Temperature added!');
      });
    textInput.clear();
  };

  const handleClose = () => {
    setShowModal(false);
    updateVisible(false);
  };

  return (
    <Modal transparent={true} visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalData}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Enter your current body temperature
              </Text>
              <View style={styles.inputGroup}>
                <TextInput
                  ref={input => {
                    textInput = input;
                  }}
                  style={styles.inputBox}
                  onChangeText={input => setBodyTemp(input)}
                />
                <Text style={styles.farenheitText}>°F</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={storeData}>
                  <Text style={styles.button}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text onPress={handleClose} style={styles.closeBtn}>
            {closeIcon}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default AddNewTempModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 20,
    paddingVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalData: {
    width: '90%',
  },
  closeBtn: {
    width: '6%',
    alignSelf: 'flex-start',
    marginTop: 6,
    marginRight: 6,
  },
  inputContainer: {
    backgroundColor: '#A5B2B5',
    paddingBottom: 20,
    borderRadius: 20,
    marginLeft: 1,
  },
  inputLabel: {
    marginTop: 20,
    fontSize: 25,
    alignSelf: 'center',
    color: '#1F3F49',
  },
  inputBox: {
    marginTop: 10,
    backgroundColor: 'white',
    width: 150,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    fontSize: 25,
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  farenheitText: {
    fontSize: 30,
    marginLeft: 2,
    marginTop: 20,
    color: '#1C4E80',
  },
  button: {
    marginTop: 5,
    borderRadius: 20,
    backgroundColor: '#3A4F5A',
    width: 60,
    height: 30,
    textAlign: 'center',
    paddingTop: 5,
    color: 'white',
    marginLeft: 10,
    marginRight: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
