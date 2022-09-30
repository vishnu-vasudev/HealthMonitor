import React from 'react';
import {LineChart} from 'react-native-chart-kit';

const GraphComponent = allData => {
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: () => 'black',
  };

  const data = {
    datasets: [
      {
        data: allData.value,
        color: () => 'orange', // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  return (
    <LineChart
      data={data}
      width={380}
      height={300}
      chartConfig={chartConfig}
      withInnerLines={false}
      withOuterLines={false}
      withShadow={false}
      bezier
    />
  );
};

export default GraphComponent;
