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
import Animated from 'react-native-reanimated';

const AddNewTempModal = ({
  collection,
  visible,
  updateVisible,
  unit,
  displayName,
}) => {
  const [showModal, setShowModal] = useState();
  const {user} = useContext(AuthContext);
  const [scaleValue] = useState(new Animated.Value(0));
  const [bodyTemp, setBodyTemp] = useState();
  var [textInput] = useState();

  const closeIcon = <AIcon name="close" size={22} />;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setShowModal(false);
    }
  };

  const storeData = () => {
    firestore()
      .collection(`${collection}`)
      .add({
        value: bodyTemp,
        user_id: user.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        unit: unit,
      })
      .then(() => {
        console.log('Value added!');
      });
    textInput.clear();
  };

  const handleClose = () => {
    setShowModal(false);
    updateVisible(false);
  };

  const handleSubmit = () => {
    storeData();
    handleClose();
  };

  return (
    <Modal transparent={true} visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          <View style={styles.modalData}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Enter your current {displayName}
              </Text>
              <View style={styles.inputGroup}>
                <TextInput
                  ref={input => {
                    textInput = input;
                  }}
                  style={styles.inputBox}
                  onChangeText={input => setBodyTemp(input)}
                />
                <Text style={styles.farenheitText}>{unit}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.button}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text onPress={handleClose} style={styles.closeBtn}>
            {closeIcon}
          </Text>
        </Animated.View>
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
    backgroundColor: '#f3f6f5',
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
