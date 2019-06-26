import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Header } from 'semantic-ui-react';
import StocksList from './StocksList';
import BuyMenu from './BuyMenu';

const Portfolio = ({ user, setUser }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/stocks", { withCredentials: true })
      .then(res => setStocks(res.data))
      .catch(err => console.log(err));
  }, []);

  const updateStocks = (stockInfo) => {
    console.log("Stock Updated");
  };

  return (
    <Container>
      <Header as="h1">Portfolio</Header>
      <Grid centered columns={2} padded="vertically" divided>
        <StocksList stocks={stocks} />
        <BuyMenu
          user={user}
          setUser={setUser}
          updateStocks={updateStocks}
        />
      </Grid>
    </Container>
  );
};

export default Portfolio;
