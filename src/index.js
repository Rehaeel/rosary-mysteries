import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rose from './component/icons/rose.svg';
import Favicon from 'react-favicon';

ReactDOM.render(
  <React.StrictMode>
    <Favicon url={rose} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
