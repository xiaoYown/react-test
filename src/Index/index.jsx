import './index.less'
import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../routes'

class PageIndex extends React.Component {
  state = {
    loaded: false,
  }
  render() {
    return <div className="page-index">
      {
        routes.map(item => {
          return <Link
            key={item.name}
            className="m-link"
            to={item.path}
          >{item.name}</Link>
        })
      }
    </div>
  }
};

export default PageIndex;
