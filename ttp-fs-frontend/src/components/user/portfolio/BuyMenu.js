import React from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';

const BuyMenu = () => {
  return (
    <Grid.Column>
      <Form size="large">
        <Form.Field>
          <label>Ticker</label>
          <input placeholder="Ticker" />
        </Form.Field>
        <Form.Field>
          <label>Quantity</label>
          <input placeholder="Qty" />
        </Form.Field>
        <Button type="submit" positive size="large" fluid>Buy</Button>
      </Form>
    </Grid.Column>
  )
};

export default BuyMenu;
