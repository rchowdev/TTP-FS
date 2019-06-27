import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Transaction from './Transaction';
import { Grid } from 'semantic-ui-react';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    function getTransactions() {
      return axios.get("http://localhost:3001/api/v1/transactions", { withCredentials: true })
        .then(res => res.data)
        .catch(err => err.response)
    };

    getTransactions()
      .then(data => setTransactions(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <main>
      <h1>Transactions</h1>
      {transactions.map((transaction, index) => <Transaction key={index} transaction={transaction} />)}
    </main>
  );
};

export default TransactionsList;
