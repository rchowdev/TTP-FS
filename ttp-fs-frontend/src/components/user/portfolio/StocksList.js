import React from 'react';
import { List, Grid } from 'semantic-ui-react';
import Stock from './Stock';

const StocksList = ({ stocks }) => {
  return (
    <Grid.Column>
      <List>
        {stocks.map(stock => <Stock key={stock.symbol} stock={stock}/>)}
      </List>
    </Grid.Column>
  );
};

export default StocksList
