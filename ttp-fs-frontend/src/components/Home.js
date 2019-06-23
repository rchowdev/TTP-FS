import React from 'react';
import SignUp from './auth/SignUp';
import Login from './auth/Login';

const Home = ({ handleLogin, history }) => {
  const handleSuccessfulAuth = (userData) => {
    handleLogin(userData);
    history.push("/dashboard");
  };

  return (
    <div>
      <h1>Home</h1>
      <SignUp handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  );
}

export default Home;
