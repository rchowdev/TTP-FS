import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
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

  console.log(user);
  
  function checkLoginStatus(){
    axios.get("http://localhost:3001/api/v1/logged_in", { withCredentials: true })
      .then(res => {
        if (res.data.user) {
          setUser(res.data.user)
        } else {
          setUser({})
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={"/"}
          render={props => (
            <Home
              {...props}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
          )} />
        <Route
          exact
          path={"/dashboard"}
          render={props => (
            <Dashboard {...props} user={user} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
