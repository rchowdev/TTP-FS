import React, { useState, useEffect } from 'react';
import axios from 'axios';
import currency from 'currency.js';
import { List, Grid } from 'semantic-ui-react';
import Stock from './Stock';

const StocksList = ({ stocks, setPortfolioValue }) => {
  const [stocksIEXData, setStocksIEXData] = useState([]);
  useEffect(() => {
    function getStockPrices() { //When component mounts check current price from IEX API
      return axios.get(`https://api.iextrading.com/1.0/tops?symbols=${stringifyStockSymbols()}`)
        .then(res => res.data)
        .catch(err => console.log(err));
    };

    //When component mounts get open price for each stock from IEX API
    function getStockOpenPrices() {
      return axios.get(`https://api.iextrading.com/1.0/deep/official-price?symbols=${stringifyStockSymbols()}`)
        .then(res => res.data)
        .catch(err => console.log(err));
    };

    //Helper function to add field from IEX API to each stock
    const addFieldToStocks = (stocksData, field) => {
      return stocks.map(stock => {
        let foundStock = stocksData.find(stockData => stockData.symbol === stock.symbol);
        return { ...stock, [field]: foundStock[field] };
      });
    };

    //Helper function to calculate portfolio value
    const calculatePortfolioValue = (stocksData) => {
      return stocksData.reduce((total, stock) => currency(total).add(currency(stock.lastSalePrice) * stock.quantity), 0).value;
    };

    //Helper function to convert stock symbols into URI encoded string for IEX API query
    const stringifyStockSymbols = () => {
      const stockURIEncodedSymbols = stocks.map(stock => encodeURIComponent(stock.symbol));  //Map stocks to URI encoded symbols
      return stockURIEncodedSymbols.join(',');
    }

    if(stocks.length) {
      getStockPrices()
        .then(res => {
          let updatedStocks = addFieldToStocks(res, "lastSalePrice");
          // TODO
          // getStockOpenPrices()
          //   .then(prices => console.log(prices));
          //
          setStocksIEXData(updatedStocks);
          setPortfolioValue(currency(calculatePortfolioValue(updatedStocks)).format({ formatWithSymbol: true }));
        })
        .catch(err => console.log(err));
    }
  }, [stocks, setPortfolioValue]);


  return (
    <Grid.Column>
      <List divided verticalAlign="middle" size="massive" relaxed>
        {
          stocksIEXData.length
            ? stocksIEXData.map(stock => <Stock key={stock.symbol} stock={stock}/>)
            : []
        }
      </List>
    </Grid.Column>
  );
};

export default StocksList
