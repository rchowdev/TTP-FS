import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

function App({ history }) {
  //Hooks
  const [user, setUser] = useState({});
  //App Did Mount: Check if user is logged in
  useEffect(() => {
    function checkLoginStatus(){
      axios.get("http://localhost:3001/api/v1/logged_in", { withCredentials: true })
      .then(res => {
        if (res.data.user) {
          setUser(res.data.user);
          history.push("/dashboard");
        } else {
          setUser({});
        }
      })
      .catch(err => console.log(err));
    };

    checkLoginStatus();
  }, [history]);

  //Auth handlers
  const handleLogin = (userData) => {
    setUser(userData);
  }

  const handleLogout = () => {
    setUser({});
  }


  return (
    <Switch>
      <Route
        exact
        path={"/dashboard"}
        render={props => (
          user.email
            ? <Dashboard
                {...props}
                user={user}
                handleLogout={handleLogout}
              />
            : <Redirect to='/' />
        )}
      />
      <Route
        exact
        path={"/"}
        render={props => (
          <Home
          {...props}
          handleLogin={handleLogin}
          />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default withRouter(App);
