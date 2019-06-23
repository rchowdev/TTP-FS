import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    checkLoginStatus();
  }, [])

  const handleLogin = (userData) => {
    setUser(userData);
  }

  function checkLoginStatus(){
    axios.get("http://localhost:3001/current_user", { withCredentials: true })
      .then(res => console.log("logged in?", res))
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
