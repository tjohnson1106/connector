import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import "./App.css";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { clearCurrentProfile } from "./actions/profileActions";

// Check for token

if (localStorage.jwtToken) {
  // Set auth token header auth

  setAuthToken(localStorage.jwtToken);

  // decode and get user info and expiration

  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated

  store.dispatch(setCurrentUser(decoded));

  // Check for expired token

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user

    store.dispatch(logoutUser());

    store.dispatch(clearCurrentProfile());

    window.location.href = "";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
