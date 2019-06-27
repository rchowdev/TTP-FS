import React from 'react';
import currency from 'currency.js';
import { List } from 'semantic-ui-react';

const Stock = ({ stock: { symbol, lastSalePrice, quantity } }) => {
  return (
    <List.Item>
      <List.Content floated="right">
        {currency(currency(lastSalePrice) * quantity, { formatWithSymbol: true }).format()}
      </List.Content>
      <List.Content>
        {`${symbol} - ${quantity} Shares`}
      </List.Content>
    </List.Item>
  );
};

export default Stock;
