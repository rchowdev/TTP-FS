import React, { useState, useEffect } from 'react';
import currency from 'currency.js';
import { List } from 'semantic-ui-react';

const Stock = ({ stock: { symbol, latestPrice, quantity, open } }) => {
  const [color, setColor] = useState("grey");
  useEffect(() => {
    if(latestPrice < open){
      setColor("red");
    } else if(latestPrice > open){
      setColor("green");
    } else {
      setColor("grey");
    }
  }, [setColor, open, latestPrice]);

  return (
    <List.Item style={{ color }}>
      <List.Content floated="right">
        {currency(currency(latestPrice) * quantity, { formatWithSymbol: true }).format()}
      </List.Content>
      <List.Content>
        {`${symbol} - ${quantity} Shares`}
      </List.Content>
    </List.Item>
  );
};

export default Stock;
