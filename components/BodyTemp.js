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
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Col,
} from 'react-native-table-component';
import GraphComponent from './GraphComponent';
import AddNewTempModal from './AddNewTempModal';

import FIcon from 'react-native-vector-icons/dist/FontAwesome5';
import IIcon from 'react-native-vector-icons/dist/Ionicons';
import {comStyle} from '../style/comStyle';

const BodyTemp = ({route}) => {
  const {name} = route.params;

  const {user} = useContext(AuthContext);
  const [allData, setAllData] = useState([0]);
  const [displayName, setDisplayName] = useState();
  const [unit, setUnit] = useState();

  const [tableD, setTableD] = useState([]);
  const [valueColumn, setValueColumn] = useState([]);
  const [visible, setVisible] = useState(false);

  const plusIcon = <FIcon name="plus" size={50} color="white" />;
  const refreshIcon = <IIcon name="refresh" size={22} color="black" />;

  const tableHead = [`${displayName}`, 'Date', 'Time'];

  const getD = () => {
    if (name === 'newTemp') {
      setDisplayName('Body Temperature');
      setUnit('°F');
    } else if (name === 'heartRate') {
      setDisplayName('Heart Rate');
      setUnit('bpm');
    } else if (name === 'spo2') {
      setDisplayName('SpO2');
      setUnit('%');
    } else if (name === 'bloodGlucose') {
      setDisplayName('Blood Glucose');
      setUnit('mmol/L');
    }
  };

  useEffect(() => {
    getData(), getD(), getGraphData();
  }, []);

  const getData = () => {
    firestore()
      .collection(`${name}`)
      .where('user_id', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        const firstCol = [];
        const tableData = [];
        querySnapshot.forEach(documentSnapshot => {
          const rowData = [];
          for (let i = 0; i < 3; i++) {
            if (i === 0) {
              firstCol.push(
                documentSnapshot.data().value +
                  ' ' +
                  documentSnapshot.data().unit,
              );
            } else if (i === 1) {
              const timestamp = documentSnapshot.data().createdAt.toDate();
              const time = new Intl.DateTimeFormat('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
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
        setValueColumn(firstCol);
      })
      .catch('No collection');
  };

  const getGraphData = () => {
    let data = [];
    firestore()
      .collection(`${name}`)
      .where('user_id', '==', user.uid)
      .orderBy('createdAt', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          data.push(parseFloat(documentSnapshot.data().value));
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
        <AddNewTempModal
          collection={name}
          visible={visible}
          updateVisible={setVisible}
          unit={unit}
          displayName={displayName}
        />
        <View style={styles.dataContainer}>
          <View style={styles.dataHeadingContainer}>
            <Text style={styles.heading}>{displayName} history</Text>
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
            <TableWrapper style={comStyle.flexRow}>
              <Col
                data={valueColumn}
                style={styles.tableFirstCol}
                textStyle={styles.tableDataValueText}
              />
              <Rows
                style={styles.tableData}
                textStyle={styles.tableDataText}
                data={tableD}
                flexArr={[1, 1]}
              />
            </TableWrapper>
          </Table>
        </View>
      </ScrollView>
    </>
  );
};

export default BodyTemp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
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
    marginLeft: 10,
    marginBottom: 10,
  },
  tableData: {
    marginLeft: 10,
  },
  tableDataValueText: {
    fontSize: 23,
    color: '#1c4966',
    paddingBottom: 10,
    borderRightWidth: 0.5,
    paddingLeft: 10,
    borderRightColor: '#1F3F49',
  },
  tableFirstCol: {
    marginLeft: 10,
  },
  tableHeadText: {
    color: 'black',
    fontSize: 17,
    paddingLeft: 15,
  },
  tableDataText: {
    color: 'black',
    paddingBottom: 15,
    fontSize: 19,
    borderRightWidth: 0.5,
    paddingLeft: 10,
    borderRightColor: '#1F3F49',
  },
  dataContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
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
    backgroundColor: '#1c4966',
    padding: 6,
    borderRadius: 50,
    width: 60,
    paddingLeft: 10,
  },
  refreshIcon: {
    alignSelf: 'flex-end',
    marginRight: 40,
    marginBottom: 10,
  },
  dataHeadingContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
