import React from 'react';
import {StyleSheet} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const GraphComponent = allData => {
  // const withoutDuplicates = [...new Set(xLabels)];
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: () => 'black',
    decimalPlaces: 0,
  };

  // useEffect(() => {
  //   checkXLabel(allData.dateValue);
  // }, []);

  // const checkXLabel = date => {

  //   console.log(allData.dateValue);
  // };
  // for (let i = 0; i < allData.dateValue.length - 1; i++) {
  //   if (allData.dateValue[i] === allData.dateValue[i + 1]) {
  //     let arr = allData.dateValue;
  //     // arr[i] = 'seo';
  //     // console.log(arr);
  //     setXLabels(arr)
  //   }
  // }

  const data = {
    labels: allData.dateValue,
    datasets: [
      {
        data: allData.value,
        color: () => 'orange',
        strokeWidth: 2,
      },
    ],
  };

  return (
    <BarChart
      data={data}
      width={350}
      height={170}
      chartConfig={chartConfig}
      withInnerLines={false}
      style={styles.graph}
      fromZero
    />
  );
};

export default GraphComponent;

const styles = StyleSheet.create({
  graph: {
    paddingBottom: 10,
  },
});
