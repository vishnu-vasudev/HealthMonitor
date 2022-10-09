import React from 'react';
import {StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const GraphComponent = allData => {
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: () => 'black',
    decimalPlaces: 0,
  };

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: allData.value,
        color: () => 'orange',
        strokeWidth: 2,
      },
    ],
  };

  return (
    <LineChart
      data={data}
      width={380}
      height={150}
      chartConfig={chartConfig}
      withInnerLines={false}
      withOuterLines
      withShadow={false}
      bezier
      style={styles.graph}
    />
  );
};

export default GraphComponent;

const styles = StyleSheet.create({
  graph: {
    paddingBottom: 10,
  },
});
