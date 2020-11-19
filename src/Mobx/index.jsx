import React from 'react';
import Eg from './Eg';
import EgList from './EgList';

const PageMobx = () => {
  return <div>
    <div style={{ padding: '30px' }}>
      <h3>eg:</h3>
      <Eg />
      <br/>
      <br/>
      <h3>eg list:</h3>
      <EgList />
    </div>
  </div>
}

export default PageMobx;
