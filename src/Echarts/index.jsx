import React from "react";
import AutoHoverBar from './AutoHoverBar';
import AutoHoverPie from './AutoHoverPie';
import AutoHoverLine from './AutoHoverLine';

class PageEcahrts extends React.Component {
  render() {
    return <div>
      <AutoHoverLine />
      <br/>
      <AutoHoverBar />
      <br/>
      <AutoHoverPie />
    </div>;
  }
}

export default PageEcahrts;
