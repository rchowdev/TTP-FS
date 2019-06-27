import React from 'react';
import SignUp from './auth/SignUp';
import Login from './auth/Login';

const Home = ({ handleLogin, history, activeNavItem }) => {
  const handleSuccessfulAuth = (userData) => {
    handleLogin(userData);
    history.push("/user");
  };

  return (
    <React.Fragment>
      {
        activeNavItem === "sign-up"
          ? <SignUp handleSuccessfulAuth={handleSuccessfulAuth} />
          : <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      }
    </React.Fragment>
  );
};

export default Home;
