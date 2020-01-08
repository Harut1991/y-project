import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import "./index.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import CombineReducers from './reducers'

const store = createStore(combineReducers(
    CombineReducers
));

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
