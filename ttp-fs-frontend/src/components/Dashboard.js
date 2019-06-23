import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      {user.email ? <h1>Logged in</h1> : <h1>Not Logged In</h1>}
    </div>
  );
}

export default Dashboard;
