import React from 'react';
import {View} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryGroup,
} from 'victory-native';

const VictoryComponent = allData => {
  const victoryData = [];
  for (let i = 0; i < allData.value.length; i++) {
    // data.push([
    //   {
    //     month: allData.dateValue[i],
    //     value: allData.value[i],
    //   },
    // ]);
    victoryData.push(
      <VictoryBar
        key={i}
        style={{
          data: {
            fill: '#83af9b',
          },
        }}
        labels={({datum}) => `${datum._y}`}
        // animate={{
        //   duration: 3000,
        //   onLoad: {
        //     duration: 3000,
        //   },
        // }}
        data={[
          {
            month: allData.dateValue[i],
            value: allData.value[i],
          },
        ]}
        x="month"
        y="value"
        width={60}
        barWidth={10}
        height={290}
      />,
    );
  }

  return (
    <View>
      <VictoryChart
        animate={{
          duration: 1000,
          onLoad: {
            duration: 1000,
          },
        }}
        height={200}
        width={380}
        theme={VictoryTheme.material}>
        <VictoryGroup offset={20}>{victoryData}</VictoryGroup>
      </VictoryChart>
    </View>
  );
};

export default VictoryComponent;
