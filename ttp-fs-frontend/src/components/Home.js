import React from 'react';
import SignUp from './auth/SignUp';
import Login from './auth/Login';

const Home = ({ handleLogin, history, activeNavItem }) => {
  const handleSuccessfulAuth = (userData) => {
    handleLogin(userData);
    history.push("/user");
  };

  return (
    <div>
      <h1>{activeNavItem === "sign-up" ? "Sign Up" : "Log In"}</h1>
      {
        activeNavItem === "sign-up"
          ? <SignUp handleSuccessfulAuth={handleSuccessfulAuth} />
          : <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      }
    </div>
  );
}

export default Home;
