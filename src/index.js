import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
        <Route path="/test" component={Test}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);