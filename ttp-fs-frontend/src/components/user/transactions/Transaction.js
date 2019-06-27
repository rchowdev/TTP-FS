import React from 'react';
import { List } from 'semantic-ui-react';
import currency from 'currency.js';

const Transaction = ({ transaction: { transaction_type, stock_symbol, price, quantity } }) => {
  return(
    <List.Item>
      <List.Content>
        {`${transaction_type} (${stock_symbol}) - ${quantity} Shares @ ${currency(price).format({ formatWithSymbol: true })}`}
      </List.Content>
    </List.Item>
  );
};

export default Transaction;
