import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import routers from './routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
        {
          routers.map((item, index) => {
            return <Route key={index} {...item} />
          })
        }
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
