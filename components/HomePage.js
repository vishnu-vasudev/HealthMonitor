/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
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
import IIcon from 'react-native-vector-icons/dist/Ionicons';
import FoIcon from 'react-native-vector-icons/dist/Fontisto';
import AIcon from 'react-native-vector-icons/dist/AntDesign';
import AddNewParamModal from './AddNewParamModal';

const HomePage = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [newParamName, setNewParamName] = useState();
  const [tempCardValue, setTempCardValue] = useState();
  const [heartCardValue, setHeartCardValue] = useState();
  const [spo2CardValue, setSpo2CardValue] = useState();
  const [sugarCardValue, setSugarCardValue] = useState();
  const [tempDate, setTempDate] = useState();
  const [heartDate, setHeartDate] = useState();
  const [spo2Date, setSpo2Date] = useState();
  const [sugarDate, setSugarDate] = useState();
  const [unit, setUnit] = useState({});
  const [newCollections, setNewCollections] = useState([]);
  const [newLastData, setNewLastData] = useState({});
  const [newParamLastDate, setNewParamLastDate] = useState({});

  const thermometerIcon = <FIcon name="thermometer" size={25} />;
  const heartBeatIcon = <FIcon name="heartbeat" size={25} />;
  const line = <IIcon name="ios-remove-outline" size={70} />;
  const spo2Icon = <FoIcon name="blood-drop" size={25} />;
  const bloodSugarIcon = <Icon name="diabetes" size={25} />;
  const plusIcon = <AIcon name="pluscircleo" size={20} />;
  const menuIcon = <IIcon name="menu" size={33} color="#1F3F49" />;

  const [allCollection] = useState({
    temp: 'newTemp',
    heartRate: 'heartRate',
    spo2: 'spo2',
    bloodGlucose: 'bloodGlucose',
  });

  useEffect(() => {
    getData(allCollection.temp);
    getData(allCollection.heartRate);
    getData(allCollection.spo2);
    getData(allCollection.bloodGlucose);
    getParamNames();
  }, [newParamName]);

  useEffect(() => {
    getUnit(allCollection.temp);
    getUnit(allCollection.heartRate);
    getUnit(allCollection.spo2);
    getUnit(allCollection.bloodGlucose);
    newCollections.map(collection => {
      getUnit(collection);
    });
  }, [newCollections]);

  const getParamNames = () => {
    let data = [];
    firestore()
      .collection('NewParameters')
      .where('user_id', '==', user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          data.push(documentSnapshot.data().name);
        });
        setNewCollections(data);
      });
  };

  useEffect(() => {
    newCollectionsGetData();
  }, [newCollections]);

  const getUnit = collectionName => {
    let unitData;
    return firestore()
      .collection(`${collectionName}`)
      .doc('Unit')
      .get()
      .then(documentSnapshot => {
        unitData = documentSnapshot.data().unit;
        setUnit(unit => ({
          ...unit,
          [collectionName]: unitData,
        }));
      });
  };

  const getData = dataB => {
    let data;
    firestore()
      .collection(`${dataB}`)
      .doc('Data')
      .collection('Alldata')
      .where('user_id', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          data = documentSnapshot.data().value;
          const timestamp = documentSnapshot.data().createdAt.toDate();
          const time = new Intl.DateTimeFormat('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }).format(timestamp);
          if (dataB === 'newTemp') {
            setTempDate(time);
          } else if (dataB === 'heartRate') {
            setHeartDate(time);
          } else if (dataB === 'spo2') {
            setSpo2Date(time);
          } else if (dataB === 'bloodGlucose') {
            setSugarDate(time);
          } else {
            setNewParamLastDate(newParamLastDate => ({
              ...newParamLastDate,
              [dataB]: time,
            }));
          }
        });
        if (dataB === 'newTemp') {
          setTempCardValue(data);
        } else if (dataB === 'heartRate') {
          setHeartCardValue(data);
        } else if (dataB === 'spo2') {
          setSpo2CardValue(data);
        } else if (dataB === 'bloodGlucose') {
          setSugarCardValue(data);
        } else {
          setNewLastData(newLastData => ({
            ...newLastData,
            [dataB]: data,
          }));
        }
      });
  };

  const newCollectionsGetData = () => {
    newCollections.map(collection => {
      getData(collection);
    });
  };

  return (
    <>
      <View>
        <Text onPress={() => navigation.openDrawer()} style={style.menuIcon}>
          {menuIcon}
        </Text>
      </View>
      <ScrollView style={style.container}>
        <AddNewParamModal
          visible={visible}
          updateVisible={setVisible}
          updateNewParam={setNewParamName}
        />
        <Text style={style.lineIcon}>{line}</Text>
        <View style={style.dataContainer}>
          <Text style={style.yourDataText}>Your recent Data</Text>
          <View>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('BodyTemp', {name: 'newTemp'})
              }>
              <View style={[style.firstCard, style.card]}>
                <Text style={[style.cardText, style.cardHeader]}>
                  {thermometerIcon} Body Temperature
                </Text>
                <View style={style.cardResultContainer}>
                  <Text style={style.lastTempText}>
                    {tempCardValue} {unit.newTemp}
                  </Text>
                  <Text style={style.lastDataDate}>{tempDate}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('BodyTemp', {name: 'heartRate'})
              }>
              <View style={[style.secondCard, style.card]}>
                <Text style={[style.cardText, style.cardHeader]}>
                  {heartBeatIcon} Heart Rate
                </Text>
                <View style={style.cardResultContainer}>
                  <Text style={style.lastTempText}>
                    {heartCardValue} {unit.heartRate}
                  </Text>
                  <Text style={style.lastDataDate}>{heartDate}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('BodyTemp', {name: 'spo2'})}>
              <View style={[style.secondCard, style.card]}>
                <Text style={[style.cardText, style.cardHeader]}>
                  {spo2Icon} SpO2
                </Text>
                <View style={style.cardResultContainer}>
                  <Text style={style.lastTempText}>
                    {spo2CardValue} {unit.spo2}
                  </Text>
                  <Text style={style.lastDataDate}>{spo2Date}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('BodyTemp', {name: 'bloodGlucose'})
              }>
              <View style={[style.secondCard, style.card]}>
                <Text style={[style.cardText, style.cardHeader]}>
                  {bloodSugarIcon} Blood Glucose
                </Text>
                <View style={style.cardResultContainer}>
                  <Text style={style.lastTempText}>
                    {sugarCardValue} {unit.bloodGlucose}
                  </Text>
                  <Text style={style.lastDataDate}>{sugarDate}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            {newCollections.map(collection => {
              () => getData(collection);
              return (
                <TouchableWithoutFeedback
                  key={collection}
                  onPress={() =>
                    navigation.navigate('BodyTemp', {name: collection})
                  }>
                  <View style={[style.secondCard, style.card]}>
                    <Text style={[style.cardText, style.cardHeader]}>
                      {collection}
                    </Text>
                    <View style={style.cardResultContainer}>
                      <Text style={style.lastTempText}>
                        {newLastData[collection]} {unit[collection]}
                      </Text>
                      <Text style={style.lastDataDate}>
                        {newParamLastDate[collection]}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={style.newParamButton}>{plusIcon} Add new</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default HomePage;

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  lineIcon: {
    alignSelf: 'center',
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
    height: 160,
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
    color: '#1F3F49',
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingBottom: 30,
    fontWeight: 'bold',
  },
  cardResultContainer: {
    alignItems: 'flex-end',
  },
  lastTempText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#83af9b',
  },
  lastDataDate: {
    color: 'grey',
    fontSize: 15,
  },
  newParamButton: {
    fontSize: 20,
  },
  menuIcon: {
    marginTop: 25,
    marginLeft: 20,
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 3,
    width: 45,
    textAlign: 'center',
    position: 'absolute',
    zIndex: 40,
    paddingTop: 5,
    borderColor: '#1F3F49',
  },
});
