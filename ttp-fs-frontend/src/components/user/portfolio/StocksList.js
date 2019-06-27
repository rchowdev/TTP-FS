import React, { useState, useEffect } from 'react';
import axios from 'axios';
import currency from 'currency.js';
import { List, Grid } from 'semantic-ui-react';
import Stock from './Stock';

const StocksList = ({ stocks, setPortfolioValue }) => {
  const [stocksIEXData, setStocksIEXData] = useState([]);

  useEffect(() => {
    //Get data of a stock (symbol, open price, latest price)
    function getStockData(stockSymbol) {
      return axios.get(`https://cloud.iexapis.com/stable/stock/${stockSymbol}/quote?filter=symbol,open,latestPrice&token=pk_8c68c7a54f834eafb45ce0135219f103`)
      .then(res => res.data)
      .catch(err => console.log(err));
    };

    /*
      Helper function to add field from IEX API to each stock
      First arg is array of stocks you want to add field to
      Second arg is array of objects with key of symbol and field you want to add
      */
    const addFieldToStocks = (stocks, stocksData, field) => {
      return stocks.map(stock => {
        let foundStock = stocksData.find(stockData => stockData.symbol === stock.symbol);
        return { ...stock, [field]: foundStock[field] };
      });
    };

    //Helper function to convert stock symbols into URI encoded string for IEX API query
    const stringifyStockSymbols = () => {
      const stockURIEncodedSymbols = stocks.map(stock => encodeURIComponent(stock.symbol));  //Map stocks to URI encoded symbols
      return stockURIEncodedSymbols.join(',');
    };

    //When component mounts get open price/latest price for each stock from IEX API
    const getStockPrices = () => {
      const pArr = stringifyStockSymbols().split(",").map( async symbol => {
        return getStockData(symbol)
          .then(res => res)
          .catch(err => console.log(err));
      });
      return Promise.all(pArr);
    };

    //Helper function to calculate portfolio value
    const calculatePortfolioValue = (stocksData) => {
      return stocksData.reduce((total, stock) => currency(total).add(currency(stock.latestPrice) * stock.quantity), 0).value;
    };

    if(stocks.length) {
      getStockPrices()
        .then(res => {
          const updatedStocks = addFieldToStocks(res, stocks, "quantity");
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
