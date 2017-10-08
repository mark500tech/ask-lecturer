import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/app';
import './styles/root.scss';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import board from "./reducers/board";
import firebaseMiddleware from './middlewares/firebaseMiddleware';
import statusMiddleware from "./middlewares/statusMiddleware";
import user from "./reducers/user";
import status from "./reducers/status";
import notification from "./reducers/notification";
import usersOnline from "./reducers/users-online";
import boards from "./reducers/boards";
//import recentlyVisitedPage from './reducers/recentlyVisitedPage'

const reducers = combineReducers({
  board,
  boards,
  user,
  status,
  notification,
  usersOnline,
  //recentlyVisitedPage
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(firebaseMiddleware, statusMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
