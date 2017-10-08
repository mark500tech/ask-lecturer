import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//pages
import Login from './pages/login';
import Board from './pages/board';
import BoardsManager from './pages/boards-manager';
import { Redirect, Switch } from "react-router";
import Spinner from "./pages/spinner";
import Notification from "./common/notification";

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/boards/:id" component={Board}/>
        <Route path="/boards-manager" component={BoardsManager}/>
        <Redirect from="*" to="/login"/>
      </Switch>

      <Spinner/>
      <Notification/>
    </div>
  </BrowserRouter>
);

export default App;