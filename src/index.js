import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/login';

import { Provider } from 'react-redux'
import { createStore, compose } from 'redux';
import allReducers from './redux/reducers/index';

import Test from './test';



const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const store = createStore(allReducers, composeEnhancers());

window.axios = axios.create({headers:{Auth:""}});
window.dispatch = store.dispatch

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/app" component={App} />
        <Route exact path="/test" component={Test}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);