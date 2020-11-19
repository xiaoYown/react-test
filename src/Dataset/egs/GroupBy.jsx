import React from 'react';
import { Table } from 'antd';
import DataSet from '@antv/data-set';

const columns = [
  {
    title: '名字',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender'
  },
  {
    title: '高度',
    key: 'height',
    dataIndex: 'height'
  },
  {
    title: '体重',
    key: 'weight',
    dataIndex: 'weight'
  }
];

class EgFilter extends React.Component {
  // groupBy
  getBy (data) {
    const ds = new DataSet();
    const dv = ds.createView().source(data);

    console.time('groupby');
    dv.transform({
      type: 'fill-rows',
      groupBy: ['gender'],
      orderBy: ['name', 'height', 'weight'],
      fillBy: 'group', // 默认为 group，可选值：order
    });
    console.timeEnd('groupby');
    return dv.rows;
  }
  
  render () {
    const { data } = this.props;
    const _data = this.getBy(data);

    return <div>
      <Table
        size="small"
        bordered
        rowKey={ (_, index) => index }
        columns={ columns }
        dataSource={ _data }
      />
    </div>
  }
}

export default EgFilter;
