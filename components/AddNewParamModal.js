import React, {useContext, useEffect, useState} from 'react';
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

const AddNewParamModal = ({
  visible,
  updateVisible,
  updateNewParam,
}) => {
  const [showModal, setShowModal] = useState();
  const {user} = useContext(AuthContext);
  const [newParam, setNewParam] = useState();
  const [newUnit, setNewUnit] = useState();
  // const scaleValue = useRef(new Animated.Value(0).current);

  const closeIcon = <AIcon name="close" size={22} />;

  useEffect(() => {
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
    toggleModal()
  }, [visible]);
 
  const handleClose = () => {
    setShowModal(false);
    updateVisible(false);
  };

  const storeData = () => {
    firestore()
      .collection(`${newParam}`)
      .doc('Unit')
      .set({
        unit: newUnit,
        user_id: user.uid,
      })
      .then(() => {
        console.log('New parameter created with unit');
      });
  };

  const storeParamName = () => {
    firestore().collection('NewParameters').add({
      name: newParam,
      user_id: user.uid,
    });
  };

  const handleSubmit = () => {
    storeData();
    storeParamName();
    updateNewParam(newParam);
    setShowModal(false);
    updateVisible(false);
  };

  return (
    <Modal transparent={true} visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalData}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Enter the name</Text>
              <TextInput
                onChangeText={input => setNewParam(input)}
                style={styles.inputBox}
              />
              <Text style={styles.inputLabel}>Enter the unit</Text>
              <TextInput
                onChangeText={input => setNewUnit(input)}
                style={styles.inputBox}
              />
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.button}>Submit</Text>
              </TouchableOpacity>
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

export default AddNewParamModal;

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
    fontSize: 20,
    alignSelf: 'center',
    color: '#1F3F49',
  },
  inputBox: {
    backgroundColor: 'white',
    width: 200,
    marginLeft: 20,
    borderRadius: 15,
    marginTop: 10,
    fontSize: 20,
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#3A4F5A',
    width: 60,
    height: 30,
    textAlign: 'center',
    paddingTop: 5,
    color: 'white',
    alignSelf: 'center',
  },
});
