import React from 'react';
import { observer } from 'mobx-react';

import { appState } from './store/state';

@observer
class TimerView extends React.Component {
  componentDidMount () {
    this.timer = setInterval(() => {
      this.addTime()
    }, 1000)
  }
  componentWillUnmount () {
    clearInterval(this.timer);
    this.timer = null;
  }
  onReset() {
    this.props.appState.resetTimer();
  }
  addTime () {
    this.props.appState.addTime()
  }
  render() {
    return (
      <button onClick={this.onReset.bind(this)}>
        Seconds passed: {this.props.appState.timer}
      </button>
    );
  }
};

export default () => <TimerView appState={appState} />
