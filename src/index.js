import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// https://stackoverflow.com/questions/53183362/what-is-strictmode-in-react

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
