import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ user, handleLogout, history }) => {
  const handleLogoutClick = () => {
    axios.delete("http://localhost:3001/api/v1/logout", { withCredentials: true })
      .then(res => {
        handleLogout();
        history.push('/');
      })
      .catch(err => console.log(err))
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user.email ? <h1>Logged in</h1> : <h1>Not Logged In</h1>}
      <button onClick={handleLogoutClick}>Log Out</button>
    </div>
  );
}

export default withRouter(Dashboard);
