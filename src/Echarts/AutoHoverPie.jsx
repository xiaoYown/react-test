import React from 'react';
import echarts from 'echarts';

function genData(count) {
  let nameList = ['赵','钱','孙','李','周','吴','郑','王','冯','陈','褚'];
  let legendData = [];
  let seriesData = [];
  let selected = {};
  let name = ''
  for (let i = 0; i < count; i++) {
    name = Math.random() > 0.65 ? makeWord(4, 1) + '·' + makeWord(3, 0) : makeWord(2, 1);
    legendData.push(name);
    seriesData.push({
      name: name,
      value: Math.round(Math.random() * 100000),
    });
    selected[name] = true; // i < 6;
  }

  return {
    legendData: legendData,
    seriesData: seriesData,
    selected: selected,
  };

  function makeWord(max, min) {
    let nameLen = Math.ceil(Math.random() * max + min);
    let name = [];
    for (let i = 0; i < nameLen; i++) {
      name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
    }
    return name.join('');
  }
}

function paint() {
  let data = genData(10);
  const option = {
    title: {
      text: '同名数量统计',
      subtext: '纯属虚构',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: data.legendData,

      selected: data.selected,
    },
    series: [
      {
        name: '姓名',
        type: 'pie',
        radius: '55%',
        center: ['40%', '50%'],
        data: data.seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  console.log(option)
  let chart = echarts.init(document.getElementById('echarts-pie'));
  chart.setOption(option);
  return chart;
}

class AutoHoverBar extends React.Component {
  componentDidMount() {
    this.chart = paint();
    this.setAction();
    // this.chart.dispatchAction({
    //   type: 'showTip',
    //   seriesIndex: 0,
    //   // dataIndex: 1,
    //   name: '王冯'
    // });
  }
  setAction = () => {
    let num = 0;
    let len = 12;
    this.timer = setInterval(() => {
      let dataIndex = num % len;
      this.chart.dispatchAction({
        type: 'pieUnSelect',
        seriesIndex: 0,
        dataIndex: dataIndex % len === 0 ? len - 1 : dataIndex - 1,
      });
      this.chart.dispatchAction({
        type: 'pieSelect',
        seriesIndex: 0,
        dataIndex,
      });
      num += 1;
      if (num % 12 === 1 && (num - 1) / len >= 4) {
        clearInterval(this.timer);
        this.timer = null;
        this.setAction();
        console.log('清理');
      }
    }, 1000);
  };
  render() {
    return (
      <div id="echarts-pie" style={{ width: '800px', height: '400px' }}></div>
    );
  }
}

export default AutoHoverBar;
