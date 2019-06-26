import React from 'react';
import { List } from 'semantic-ui-react';

const Stock = ({ stock }) => {
  return (
    <List.Item>
      <List.Content floated="right">
        Total Price
      </List.Content>
      <List.Content>
        {`${stock.symbol} - ${stock.quantity} Shares`}
      </List.Content>
    </List.Item>
  );
};

export default Stock;
