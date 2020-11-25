// import React from 'react';
// import styles from './index.module.less';

// class PageVirtualized extends React.Component {
//   state = {
//     list: []
//   }
//   componentDidMount () {

//     this.setState({

//     })
//   }
//   render() {
//     return <div style={{ padding: '20px' }}>
//       <div className={styles.box}></div>
//     </div>
//   }
// };

// export default PageVirtualized;

import React from "react";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";
import { List as VList } from "react-virtualized/dist/commonjs/List";

function Student({ student, style, ...rest }) {
  return (
    <div style={style}>
      ...
      <div>{student.name} ....</div>
      ...
    </div>
  );
}

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: Array.from(Array(1000)).map((d, index) => ({ name: 'name' + index, key: index })),
    };
  }
  getList = () => {
    // api.getList.then((res) => {
    //   this.setState({
    //     list: res,
    //   });
    // });
  };
  componentDidMount() {
    // this.getList();
  }
  render() {
    const { list } = this.state;
    const renderItem = ({ index, key, style }) => {
      return <Student key={key} student={list[index]} style={style} />;
    };
    return (
      <div style={{ height: 800 }}>
        <AutoSizer>
          {({ width, height }) => (
            <VList
              width={width}
              height={height}
              overscanRowCount={10}
              rowCount={list.length}
              rowHeight={100}
              rowRenderer={renderItem}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default StudentList;
