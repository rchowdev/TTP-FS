import React, { useState, useEffect } from 'react';
import axios from 'axios';
import currency from 'currency.js';
import { List, Grid } from 'semantic-ui-react';
import Stock from './Stock';

const StocksList = ({ stocks, setPortfolioValue }) => {
  const [stocksIEXData, setStocksIEXData] = useState([]);
  useEffect(() => { //When component mounts check current price from IEX API
    function getStockPrices() {
      const stockURIEncodedSymbols = stocks.map(stock => encodeURIComponent(stock.symbol));  //Map stocks to URI encoded symbols
      const stockSymbolsStr = stockURIEncodedSymbols.join(',');
      return axios.get(`https://api.iextrading.com/1.0/tops?symbols=${stockSymbolsStr}`)
        .then(res => res.data)
        .catch(err => console.log(err));
    };

    //Helper function to add curr price field to each stock
    const mapStocksWithCurrPrices = (stocksData) => {
      return stocks.map(stock => {
        let foundStock = stocksData.find(stockData => stockData.symbol === stock.symbol);
        return { ...stock, currPrice: foundStock.lastSalePrice };
      });
    };

    //Helper function to calculate portfolio value
    const calculatePortfolioValue = (stocksData) => {
      return stocksData.reduce((total, stock) => currency(total).add(currency(stock.currPrice) * stock.quantity), 0).value;
    }

    if(stocks.length) {
      getStockPrices()
        .then(res => {
          const mappedStocksData = mapStocksWithCurrPrices(res);
          setStocksIEXData(mappedStocksData);
          setPortfolioValue(currency(calculatePortfolioValue(mappedStocksData)).format({ formatWithSymbol: true }));
        })
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
