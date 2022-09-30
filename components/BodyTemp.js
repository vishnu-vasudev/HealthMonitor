import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../ContextProvider/AuthProvider';
import {Table, Row, Rows} from 'react-native-table-component';
import {comStyle} from '../style/comStyle';
import GraphComponent from './GraphComponent';
import AddNewTempModal from './AddNewTempModal';

import FIcon from 'react-native-vector-icons/dist/FontAwesome5';
import IIcon from 'react-native-vector-icons/dist/Ionicons';

const BodyTemp = ({route}) => {
  const {name} = route.params;

  const {user} = useContext(AuthContext);
  const [allData, setAllData] = useState([0]);
  const [collectionName, setCollectionName] = useState();

  const [tableHead] = useState(['Temperature', 'Date', 'Time']);
  const [tableD, setTableD] = useState([]);
  const [visible, setVisible] = useState(false);

  const plusIcon = <FIcon name="plus" size={50} color="white" />;
  const refreshIcon = <IIcon name="refresh" size={22} color="black" />;

  const getD = () => {
    if (name === 'Body Temperature') {
      setCollectionName('newTemp');
    } else if (name === 'Heart Rate') {
      () => setCollectionName('heartRate');
    } else if (name === 'SpO2') {
      () => setCollectionName('spo2');
    } else if (name === 'Blood Glucose') {
      () => setCollectionName('bloodGlucose');
    }
  };

  console.log(collectionName);

  useEffect(() => {
    getD(), getData();
  }, []);

  const getData = () => {
    firestore()
      .collection(`${collectionName}`)
      .where('user_id', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        const tableData = [];
        querySnapshot.forEach(documentSnapshot => {
          const rowData = [];
          for (let i = 0; i < 3; i++) {
            if (i === 0) {
              rowData.push(documentSnapshot.data().temp + '°F');
            } else if (i === 1) {
              const timestamp = documentSnapshot.data().createdAt.toDate();
              const time = new Intl.DateTimeFormat('en-IN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).format(timestamp);
              rowData.push(time);
            } else {
              const timestamp = documentSnapshot.data().createdAt.toDate();
              const date = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              }).format(timestamp);
              rowData.push(date);
            }
          }
          tableData.push(rowData);
        });
        setTableD(tableData);
      });
  };

  const getGraphData = () => {
    let data = [];
    firestore()
      .collection('newTemp')
      .where('user_id', '==', user.uid)
      .orderBy('createdAt', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          data.push(parseFloat(documentSnapshot.data().temp));
        });
        setAllData(data);
      });
  };

  const handleRefresh = () => {
    getData();
    getGraphData();
  };

  return (
    <>
      <View>
        <Text onPress={() => setVisible(true)} style={styles.addIcon}>
          {plusIcon}
        </Text>
      </View>
      <ScrollView style={styles.container}>
        <AddNewTempModal visible={visible} updateVisible={setVisible} />
        <View style={styles.dataContainer}>
          <View style={comStyle.flexRow}>
            <Text style={styles.heading}>Body temperature history</Text>
            <TouchableOpacity
              onPress={handleRefresh}
              style={styles.refreshIcon}>
              <Text>{refreshIcon}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.graphContainer}>
            <GraphComponent value={allData} />
          </View>
          <Table style={styles.table}>
            <Row
              style={styles.tableHead}
              data={tableHead}
              textStyle={styles.tableHeadText}
            />
            <Rows
              style={styles.tableData}
              textStyle={styles.tableDataText}
              data={tableD}
            />
          </Table>
        </View>
      </ScrollView>
    </>
  );
};

export default BodyTemp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    flex: 1,
  },
  headerText: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  table: {
    backgroundColor: '#f3f6f5',
    margin: 20,
    marginTop: 10,
    borderRadius: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  heading: {
    marginLeft: 40,
    marginTop: 30,
    fontSize: 25,
    color: '#1F3F49',
  },
  tableHead: {
    marginLeft: 20,
    marginBottom: 10,
  },
  tableData: {
    marginLeft: 20,
  },
  tableHeadText: {
    color: 'black',
    fontSize: 17,
    paddingLeft: 10,
  },
  tableDataText: {
    color: 'black',
    paddingBottom: 5,
    fontSize: 19,
    borderRightWidth: 0.5,
    paddingLeft: 10,
    borderRightColor: '#1F3F49',
  },
  dataContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    margin: 8,
    marginTop: 60,
  },
  graphContainer: {
    backgroundColor: '#f3f6f5',
    borderRadius: 20,
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    paddingTop: 20,
  },
  addIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 30,
    right: 180,
    top: 800,
    backgroundColor: 'red',
    padding: 6,
    borderRadius: 50,
    width: 60,
    paddingLeft: 10,
  },
  refreshIcon: {
    alignSelf: 'flex-end',
    paddingLeft: 55,
    paddingBottom: 10,
  },
});
