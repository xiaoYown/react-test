import React from 'react';
import { Table } from 'antd';
import DataSet from '@antv/data-set';

const columns = [
  {
    title: '静态处理',
    key: 'title',
    dataIndex: 'title'
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
  getRow ({ data, type, title, callback }) {
    const ds = new DataSet();
    const dv = ds.createView().source(data);

    dv.transform({
      type,
      callback
    });
    return {
      title,
      rows: dv.rows
    };
  }
  // 过滤
  getFilter (data) {
    return this.getRow({
      data,
      type: 'filter',
      title: '高度 >= 180',
      callback: (row) => {
        return row.height >= 180
      }
    });
  }
  
  render () {
    const { data } = this.props;
    const _data = [];

    console.time('handle');
    const dataFilter = this.getFilter(data);
    dataFilter.rows.forEach(row => {
      _data.push({
        title: dataFilter.title,
        ...row
      });
    });
    console.timeEnd('handle');

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
