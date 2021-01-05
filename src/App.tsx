import React from 'react';
import './App.css';

import syntheticEvent from './libs/synthetic-event';

import ViewsContainer from './structure/ViewsContainer';

console.log(syntheticEvent);

function App() {
  return (
    <div className="App">
      <ViewsContainer />
    </div>
  );
}

export default App;
