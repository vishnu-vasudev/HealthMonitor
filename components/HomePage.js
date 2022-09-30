import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../ContextProvider/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/dist/FontAwesome';
import MIcon from 'react-native-vector-icons/dist/MaterialIcons';
import IIcon from 'react-native-vector-icons/dist/Ionicons';
import FoIcon from 'react-native-vector-icons/dist/Fontisto';
import AIcon from 'react-native-vector-icons/dist/AntDesign';
import AddNewParamModal from './AddNewParamModal';

const HomePage = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [date, setDate] = useState();
  const [lastData, setLastData] = useState();
  const [newParamList, setNewParamList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newParamName, setNewParamName] = useState();
  const [isParam, setIsParam] = useState(false);

  const handWave = <Icon name="hand-wave" size={25} color="#fbc494" />;
  const thermometerIcon = <FIcon name="thermometer" size={25} />;
  const heartBeatIcon = <FIcon name="heartbeat" size={25} />;
  const logoutIcon = <MIcon name="logout" size={25} />;
  const line = <IIcon name="ios-remove-outline" size={70} />;
  const spo2Icon = <FoIcon name="blood-drop" size={25} />;
  const bloodSugarIcon = <Icon name="diabetes" size={25} />;
  const plusIcon = <AIcon name="pluscircleo" size={20} />;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let data = [];
    firestore()
      .collection('newTemp')
      .where('user_id', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          data.push(documentSnapshot.data().temp);
          const timestamp = documentSnapshot.data().createdAt.toDate();
          const time = new Intl.DateTimeFormat('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }).format(timestamp);
          setDate(time);
        });
        setLastData(data);
      });
  };

  if (isParam) {
    setNewParamList(
      <View style={[style.secondCard, style.card]}>
        <Text style={[style.cardText, style.cardHeader]}>{newParamName}</Text>
      </View>,
    ),
      setIsParam(false);
  }

  return (
    <ScrollView style={style.container}>
      <AddNewParamModal
        visible={visible}
        updateVisible={setVisible}
        updateNewParam={setNewParamName}
        updateIsParam={setIsParam}
      />
      <Text style={style.lineIcon}>{line}</Text>
      <View style={style.headContainer}>
        <View>
          <Text style={style.helloText}>
            Hello{handWave} {newParamName}
          </Text>
          <Text style={style.nameText}>{user.email}</Text>
        </View>
        <TouchableOpacity onPress={() => logout()}>
          <Text style={style.logoutBtn}>{logoutIcon}</Text>
        </TouchableOpacity>
      </View>
      <View style={style.dataContainer}>
        <Text style={style.yourDataText}>Your recent Data</Text>
        <View>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('BodyTemp', {name: 'Body Temperature'})
            }>
            <View style={[style.firstCard, style.card]}>
              <Text style={[style.cardText, style.cardHeader]}>
                {thermometerIcon} Body Temperature
              </Text>
              <Text style={style.cardText}>
                Your latest recorded body temperature
              </Text>
              <Text style={style.lastTempText}>{lastData}°F</Text>
              <Text style={style.lastDataDate}>on {date}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('BodyTemp', {name: 'Heart Rate'})
            }>
            <View style={[style.secondCard, style.card]}>
              <Text style={[style.cardText, style.cardHeader]}>
                {heartBeatIcon} Heart Rate
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={[style.secondCard, style.card]}>
            <Text style={[style.cardText, style.cardHeader]}>
              {spo2Icon} SpO2
            </Text>
          </View>
          <View style={[style.secondCard, style.card]}>
            <Text style={[style.cardText, style.cardHeader]}>
              {bloodSugarIcon} Blood Glucose
            </Text>
          </View>
          {newParamList}
        </View>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={style.newParamButton}>{plusIcon} Add new</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomePage;

const style = StyleSheet.create({
  container: {
    marginTop: 80,
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  lineIcon: {
    alignSelf: 'center',
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 50,
    backgroundColor: 'white',
    borderRadius: 60,
    margin: 5,
    paddingBottom: 50,
  },
  helloText: {
    marginTop: 30,
    fontSize: 20,
    color: 'black',
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 30,
    color: '#b5b5b5',
    fontWeight: 'bold',
  },
  logoutBtn: {
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#8b4517',
    width: 40,
    height: 30,
    textAlign: 'center',
    paddingTop: 5,
    color: 'white',
  },
  yourDataText: {
    color: 'black',
    fontSize: 23,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  dataContainer: {
    alignItems: 'center',
  },
  card: {
    padding: 20,
    backgroundColor: '#f3f6f5',
    height: 230,
    marginBottom: 20,
    borderRadius: 30,
    width: 370,
  },
  cardText: {
    color: 'black',
    fontSize: 20,
    paddingBottom: 0,
  },
  cardHeader: {
    fontSize: 20,
    alignSelf: 'flex-end',
    paddingBottom: 30,
  },
  lastTempText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
  },
  lastDataDate: {
    color: 'red',
    fontSize: 15,
  },
  newParamButton: {
    fontSize: 20,
  },
});
