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
  updateIsParam,
}) => {
  const [showModal, setShowModal] = useState();
  const {user} = useContext(AuthContext);
  const [newParam, setNewParam] = useState();
  // const scaleValue = useRef(new Animated.Value(0).current);

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

  const handleClose = () => {
    setShowModal(false);
    updateVisible(false);
  };

  const handleSubmit = () => {
    updateNewParam(newParam);
    setShowModal(false);
    updateVisible(false);
    updateIsParam(true);
  };

  return (
    <Modal transparent={true} visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalData}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Enter what data need to be added
              </Text>
              <TextInput
                onChangeText={input => setNewParam(input)}
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
    backgroundColor: '#A5B2B5',
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
