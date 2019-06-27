import React, { useState, useEffect } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import StocksList from './StocksList';
import BuyMenu from './BuyMenu';
import { getUserStocks } from '../../../axios_requests/backendRequests';

const Portfolio = ({ user, setUser }) => {
  const [stocks, setStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState("");

  //Set user's stocks
  useEffect(() => {
    getUserStocks()
      .then(res => setStocks(res.data.sort((a,b) => b.quantity - a.quantity)))
      .catch(err => console.log(err));
  }, []);

  const updateStocks = (stockInfo) => {
    const filteredStocks = stocks.filter(stock => stock.symbol !== stockInfo.symbol);
    setStocks([stockInfo, ...filteredStocks]);
  };

  return (
    <Container style={{ marginTop: "5vh" }}>
      <Header as="h1">{`Portfolio (${portfolioValue})`}</Header>
      <Grid centered columns={2} padded="vertically" divided>
        <StocksList stocks={stocks} setPortfolioValue={setPortfolioValue}/>
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
