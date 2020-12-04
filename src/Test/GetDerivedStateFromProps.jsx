import React from "react";

class GetDerivedStateFromProps extends React.Component {
  state = {}
  static getDerivedStateFromProps (props) {
    return { derivedValue: props.value + 2 }
  }
  render () {
    console.log(this.state)
    return <div>
      <p>data: { this.props.value }</p>
      <p>cal data: { this.state.derivedValue }</p>
    </div>
  }
}

export default GetDerivedStateFromProps;