import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/stocks", { withCredentials: true })
      .then(res => setStocks(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <main>
      <h1>Portfolio</h1>
      {stocks.map(stock => <h1 key={stock.symbol}>{stock.symbol}</h1>)}
    </main>
  );
}

export default Portfolio;
