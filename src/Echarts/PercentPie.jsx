import React from "react";
import echarts from "echarts";

const fixed = (num, float) => {
  let digit = Math.pow(10, float)
  num *= digit
  let plus = num % 1 < 0.5 ? 0 : 1
  return (Math.floor(num) + plus) / digit
}

const calPercent = (data, name, total) => {
  let value = 0;
  data.forEach(item => {
    if (item.name === name) {
      value += item.value
    }
  })
  return fixed(value * 100 / total, 2)
};

function paint() {
  const data = [
    { value: 335, name: "直接访问" },
    { value: 310, name: "邮件营销" },
    { value: 234, name: "联盟广告" },
    { value: 135, name: "视频广告" },
    { value: 1548, name: "搜索引擎" },
  ];
  const total = data.reduce((pre, cur) => {
    return pre + cur.value
  }, 0);
  
  console.log(total)
  const option = {
    title: {
      text: "某站点用户访问来源",
      subtext: "纯属虚构",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data,
      formatter (name) {
        return `${name} ${calPercent(data, name, total)}%`
      }
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        label: {
          formatter ({ name, percent }) {
            return `${name} ${percent}%`
          }
        },
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  let chart = echarts.init(document.getElementById("echarts-pie"));
  chart.setOption(option);
  return chart;
}

class AutoHoverBar extends React.Component {
  componentDidMount() {
    this.chart = paint();
  }
  render() {
    return (
      <div id="echarts-pie" style={{ width: "800px", height: "400px" }}></div>
    );
  }
}

export default AutoHoverBar;
