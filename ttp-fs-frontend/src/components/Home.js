import React from 'react';
import axios from 'axios';
import SignUp from './auth/SignUp';
import Login from './auth/Login';

const Home = ({ handleLogin, handleLogout, history }) => {
  const handleSuccessfulAuth = (userData) => {
    handleLogin(userData);
    history.push("/dashboard");
  };

  const handleLogoutClick = () => {
    axios.delete("http://localhost:3001/api/v1/logout", { withCredentials: true })
      .then(res => handleLogout())
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>Home</h1>
      <SignUp handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      <button onClick={handleLogoutClick}>Log Out</button>
    </div>
  );
}

export default Home;
