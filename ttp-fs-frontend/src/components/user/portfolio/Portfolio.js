import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Header } from 'semantic-ui-react';
import StocksList from './StocksList';
import BuyMenu from './BuyMenu';

const Portfolio = ({ user, setUser }) => {
  const [stocks, setStocks] = useState([]);

  //Set user's stocks
  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/stocks", { withCredentials: true })
      .then(res => setStocks(res.data.sort((a,b) => b.quantity - a.quantity)))
      .catch(err => console.log(err));
  }, []);

  const updateStocks = (stockInfo) => {
    const filteredStocks = stocks.filter(stock => stock.symbol !== stockInfo.symbol);
    setStocks([stockInfo, ...filteredStocks]);
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
