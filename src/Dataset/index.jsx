import './index.less';
import React from 'react';
import { Table, Tabs, Row, Col } from 'antd';
import EgAggregate from './egs/Aggregate';
import EgHandle from './egs/Handle';
import EgGroupBy from './egs/GroupBy';
import EgGeo from './egs/Geo';

const { TabPane } = Tabs;

const data = [];

function getNum () {
  return Math.floor(40 * Math.random() * 10) / 10
}
console.time('init');

for (let i = 0; i < 100000; i++) {
  data.push({
    name: '人员' + i,
    gender: ['male', 'femal'][i % 2],
    height: 150 + getNum(),
    weight: 40 + getNum()
  })
}

console.timeEnd('init');

const columns = [
  {
    title: '名字',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender',
  },
  {
    title: '高度',
    key: 'height',
    dataIndex: 'height',
  },
  {
    title: '体重',
    key: 'weight',
    dataIndex: 'weight',
  },
]

class PageDataset extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return <div className="page-dataset">
      <Row
        justify="space-between"
        futter={ 2 }
      >
        <Col span={ 8 }>
          <h4 style={{ height: '46px', marginBottom: '16px' }}>原始数据 :</h4>
          <Table
            rowKey={ row => row.name }
            size="small"
            dataSource={ data }
            columns={ columns }
            bordered
          />
        </Col>
        <Col span={ 14 }>
          <Tabs defaultActiveKey="4">
            <TabPane tab="统计" key="1">
              <EgAggregate data={ data } />
            </TabPane>
            <TabPane tab="处理" key="2">
              <EgHandle data={ data } />
            </TabPane>
            <TabPane tab="fill-rows" key="3">
              <EgGroupBy data={ data } />
            </TabPane>
            <TabPane tab="geo" key="4">
              <EgGeo data={ data } />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  }
};

export default PageDataset;
