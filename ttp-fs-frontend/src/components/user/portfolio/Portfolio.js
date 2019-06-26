import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Header } from 'semantic-ui-react';
import StocksList from './StocksList';
import BuyMenu from './BuyMenu';

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/stocks", { withCredentials: true })
      .then(res => setStocks(res.data))
      .catch(err => console.log(err));
  }, []);


  return (
    <Container>
      <Header as="h1">Portfolio</Header>
      <Grid columns={2} padded="vertically">
        <StocksList stocks={stocks} />
        <BuyMenu />
      </Grid>
    </Container>
  );
};

export default Portfolio;
