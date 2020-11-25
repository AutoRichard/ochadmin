import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  //Route,
  //Link
} from "react-router-dom";

import Login from './pages/login';
import Dashboard from './pages/dashbaord';
import EditProfile from './pages/editprofile';
import Profile from './pages/profile';
import PrivateRoute from './auth/PrivateRoute';
import AuthRoute from './auth/AuthRoute';



export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <AuthRoute exact path="/" component={Login} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/edit-profile" exact component={EditProfile} />
          {/*<Route path="/dashboard" component={Dashboard} />*/}
        </Switch>
      </div>
    </Router>
  );
}

