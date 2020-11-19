import React from 'react';
import DataSet, { DataView } from '@antv/data-set';

class EgFilter extends React.Component {
  componentDidMount () {
    // this.getGeo();
  }
  getGeo () {
    const ds = new DataSet();
    const dv = ds.createView().source(this.props.data);

    const geoDv = new DataView().source(this.props.data);

    dv.transform({
      type: 'geo.centroid',
      field: 'name', // 标注地名的字段
      geoDataView: geoDv, // 使用的geo数据来源，可以是DataView实例，也可以是DataView实例的name
      as: ['_centroid_x', '_centroid_y'], // _centroid_x是中心点的x坐标
      // _centroid_y是中心点y坐标
    });
    console.log(dv)
  }
  
  render () {
    return <div>
    </div>
  }
}

export default EgFilter;
