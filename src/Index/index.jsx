import './index.less'
import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../routers'

class PageFlv extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
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

export default PageFlv;
