import React from "react";
import echarts from "echarts";

function paint() {
  const option = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisPointer: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
      },
    ],
  };

  let chart = echarts.init(document.getElementById("echarts-line"));
  chart.setOption(option);
  return chart;
}

class AutoHoverLine extends React.Component {
  componentDidMount() {
    this.chart = paint();
    this.setAction();
  }
  setAction = () => {
    let num = 0;
    let option = this.chart.getOption();
    console.log(option);
    let len = option.xAxis[0].data.length;
    this.timer = setInterval(() => {
      let dataIndex = num % len;
      this.chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex,
      });
      num += 1;
      if (num % len === 1 && (num - 1) / len >= 4) {
        clearInterval(this.timer);
        this.timer = null;
        this.setAction();
        console.log("清理");
      }
    }, 1000);
  };
  render() {
    return (
      <div id="echarts-line" style={{ width: "400px", height: "400px" }}></div>
    );
  }
}

export default AutoHoverLine;
