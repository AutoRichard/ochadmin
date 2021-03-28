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
import Contact from './pages/contact'
import Newsletter from './pages/newsletter'
import Instructor from './pages/instructor'
import Instruct from './pages/instruct'
import BookedEvent from './pages/bookedevent'
import Session from './pages/session'
import NewSession from './pages/newsession'
import JoinSession from './pages/joinsession'



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
          <PrivateRoute path="/contact" component={Contact} />
          <PrivateRoute path="/newsletter" component={Newsletter} />
          <PrivateRoute path="/instructor" component={Instructor} />
          <PrivateRoute path="/instruct" component={Instruct} />
          <PrivateRoute path="/event" component={BookedEvent} />
          <PrivateRoute path="/session" component={Session} />
          <PrivateRoute path="/newsession" component={NewSession} />
          <PrivateRoute path="/joinsession/:id" component={JoinSession} />
        </Switch>
      </div>
    </Router>
  );
}

