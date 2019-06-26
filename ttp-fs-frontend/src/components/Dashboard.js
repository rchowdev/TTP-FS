import React from 'react';
import { withRouter } from 'react-router-dom';
import TransactionsList from './user/transactions/TransactionsList';
import Portfolio from './user/portfolio/Portfolio';

const Dashboard = ({ activeNavItem, user }) => {
  return (
    <div>
      {
        activeNavItem === 'portfolio'
        ? <Portfolio user={user} />
        : <TransactionsList />
      }
    </div>
  );
};

export default withRouter(Dashboard);
