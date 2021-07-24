import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

import { BrowserRouter } from 'react-router-dom';

// import { Provider } from 'react-redux'
// import store from './store/store'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);