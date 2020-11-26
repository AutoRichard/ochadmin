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
import News from './pages/news';
import UploadNews from './pages/uploadNews'



export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <AuthRoute exact path="/" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/edit-profile" component={EditProfile} />          
          <PrivateRoute path="/news" component={News} />
          <PrivateRoute path="/upload-news" component={UploadNews} />
        </Switch>
      </div>
    </Router>
  );
}

