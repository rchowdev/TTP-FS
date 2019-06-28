import React, { useState, useEffect } from 'react';
import Transaction from './Transaction';
import { Grid, Header, List } from 'semantic-ui-react';
import { getTransactions } from '../../../axios_requests/backendRequests';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions()
      .then(data => setTransactions(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Grid style={{ height: "90vh"}} container columns={1}>
      <Grid.Column style={{ marginTop: "5vh", marginRight: "40%" }}>
        <Header as="h1">Transactions</Header>
        <List size="massive" divided relaxed>
          {transactions.map((transaction, index) => <Transaction key={index} transaction={transaction} />)}
        </List>
      </Grid.Column>
    </Grid>
  );
};

export default TransactionsList;
