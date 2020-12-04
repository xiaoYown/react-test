import React from "react";
import echarts from "echarts";

function paint() {
  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["蒸发量", "降水量", "平均温度"],
    },
    xAxis: [
      {
        type: "category",
        data: [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月",],
        axisPointer: {
          type: 'shadow'
        }
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "水量",
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: "{value} ml",
        },
      },
      {
        type: "value",
        name: "温度",
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: "{value} °C",
        },
      },
    ],
    series: [
      {
        name: "蒸发量",
        type: "bar",
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      },
      {
        name: "降水量",
        type: "bar",
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
      {
        name: "平均温度",
        type: "line",
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
      },
    ],
  };
  let chart = echarts.init(document.getElementById('echarts-box'))
  chart.setOption(option)
  return chart
}

class AutoHoverBar extends React.Component {
  componentDidMount() {
    this.chart = paint()
    this.setAction()
  }
  setAction = () => {
    let num = 0
    let len = 12
    this.timer = setInterval(() => {
      let dataIndex = num % len
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex
      })
      num += 1
      if (num % 12 === 1 && (num - 1) / len >= 4) {
        clearInterval(this.timer)
        this.timer = null
        this.setAction()
        console.log('清理')
      }
    }, 2000)
  }
  render() {
    return <div id="echarts-box" style={{ width: "400px", height: "400px" }}></div>;
  }
}

export default AutoHoverBar;
