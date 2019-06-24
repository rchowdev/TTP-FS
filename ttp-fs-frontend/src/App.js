import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

function App(props) {
  //Hooks
  const [user, setUser] = useState({});
  useEffect(() => {
    checkLoginStatus();
  }, []);

  //Auth handlers
  const handleLogin = (userData) => {
    setUser(userData);
  }

  const handleLogout = () => {
    setUser({});
  }

  function checkLoginStatus(){
    axios.get("http://localhost:3001/api/v1/logged_in", { withCredentials: true })
      .then(res => {
        if (res.data.user) {
          setUser(res.data.user);
          props.history.push("/dashboard");
        } else {
          setUser({});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <Switch>
      <Route
        exact
        path={"/dashboard"}
        render={props => (
          <Dashboard {...props} user={user} />
        )}
      />
      <Route
        exact
        path={"/"}
        render={props => (
          <Home
          {...props}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default withRouter(App);
