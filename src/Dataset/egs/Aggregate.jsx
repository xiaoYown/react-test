import React from 'react';
import { Table } from 'antd';
import DataSet from '@antv/data-set';

const columns = [
  {
    title: '',
    key: 'title',
    dataIndex: 'title'
  },
  {
    title: '高度(平均)',
    key: 'height',
    dataIndex: 'height'
  },
  {
    title: '体重(平均)',
    key: 'weight',
    dataIndex: 'weight'
  }
];

class EgEggregate extends React.Component {
  getRow ({ data, operation, title }) {
    const ds = new DataSet();
    const dv = ds.createView().source(data);

    dv.transform({
      type: 'aggregate',
      fields: ['height', 'weight'], // 统计字段集
      operations: [operation, operation], // 统计操作集
      as: ['height', 'weight'],
    });
    return {
      title,
      ...dv.rows[0]
    };
  }
  // 平均值
  getAvg (data) {
    return this.getRow({
      data,
      operation: 'mean',
      title: '平均数'
    });
  }
  getMax (data) {
    return this.getRow({
      data,
      operation: 'max',
      title: '最大值'
    });
  }
  getMin (data) {
    return this.getRow({
      data,
      operation: 'min',
      title: '最小值'
    });
  }
  getMedian (data) {
    return this.getRow({
      data,
      operation: 'median',
      title: '中数'
    });
  }
  getSum (data) {
    return this.getRow({
      data,
      operation: 'sum',
      title: '总和'
    });
  }
  getMode (data) {
    return this.getRow({
      data,
      operation: 'mode',
      title: '出现次数最高'
    });
  }
  getProduct (data) {
    return this.getRow({
      data,
      operation: 'product',
      title: '乘积'
    });
  }
  getVariance (data) {
    return this.getRow({
      data,
      operation: 'variance',
      title: '方差'
    });
  }
  
  render () {
    const { data } = this.props;
    const _data = [];

    console.time('aggregate');
    _data.push(this.getAvg(data));
    _data.push(this.getMax(data));
    _data.push(this.getMin(data));
    _data.push(this.getMedian(data));
    _data.push(this.getSum(data));
    _data.push(this.getMode(data));
    _data.push(this.getProduct(data));
    _data.push(this.getVariance(data));
    console.timeEnd('aggregate');

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

export default EgEggregate;
