import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import Navbar from './components/layout/Navbar';

function App({ history }) {
  //Hooks
  const [user, setUser] = useState({});
  const [activeNavItem, setActiveNavItem] = useState("");

  //App Did Mount: Check if user is logged in
  useEffect(() => {
    function checkLoginStatus(){
      axios.get("http://localhost:3001/api/v1/logged_in", { withCredentials: true })
      .then(res => {
        if (res.data.user) {
          setUser(res.data.user);
          setActiveNavItem("portfolio");
          history.push("/user");
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
    setActiveNavItem("portfolio");
  }

  const handleLogout = () => {
    setUser({});
    setActiveNavItem("");
  }


  return (
    <div>
      <Navbar
        user={user}
        activeNavItem={activeNavItem}
        setActiveNavItem={setActiveNavItem}
        handleLogout={handleLogout}
      />
      <Switch>
        <Route
          exact
          path={"/user"}
          render={props => (
            user.email
              ? <Dashboard
                  {...props}
                  user={user}
                  activeNavItem={activeNavItem}
                />
              : <Redirect to="/" />
          )}
        />
        <Route
          exact
          path={"/"}
          render={props => (
            <Home
              {...props}
              handleLogin={handleLogin}
              activeNavItem={activeNavItem}
            />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
