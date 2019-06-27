import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Transaction from './Transaction';
import { Grid, Header, List } from 'semantic-ui-react';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    function getTransactions() {
      return axios.get("http://localhost:3001/api/v1/transactions", { withCredentials: true })
        .then(res => res.data)
        .catch(err => console.log(err));
    };

    getTransactions()
      .then(data => setTransactions(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Grid style={{ height: "90vh"}} container columns={1}>
      <Grid.Column style={{ marginTop: "5vh", marginRight: "40%" }}>
        <Header as="h1">Transactions</Header>
        <List size="massive" divided>
          {transactions.map((transaction, index) => <Transaction key={index} transaction={transaction} />)}
        </List>
      </Grid.Column>
    </Grid>
  );
};

export default TransactionsList;
