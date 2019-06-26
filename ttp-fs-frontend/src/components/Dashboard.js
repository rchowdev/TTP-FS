import React from 'react';
import { withRouter } from 'react-router-dom';
import TransactionsList from './user/transactions/TransactionsList';
import Portfolio from './user/portfolio/Portfolio';

const Dashboard = ({ handleLogout, history, activeNavItem }) => {
  return (
    <div>
      {
        activeNavItem === 'portfolio'
        ? <Portfolio />
        : <TransactionsList />
      }
    </div>
  );
};

export default withRouter(Dashboard);
