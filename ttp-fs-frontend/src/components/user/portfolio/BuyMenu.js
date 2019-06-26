import React, { useState } from 'react';
import axios from 'axios';
import { Form, Grid, Button } from 'semantic-ui-react';

const BuyMenu = ({ balance }) => {
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  //Sets loading to true if user has enough money to buy
  const enoughMoney = () => {
    const formattedTicker = encodeURIComponent(ticker);
    axios.get(`https://api.iextrading.com/1.0/tops?symbols=${formattedTicker}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(false); //Set loading to false until api request resolves
    enoughMoney();
  }

  return (
    <Grid.Column>
      <Form size="large" loading={!loading} onSubmit={handleSubmit}>
        <Form.Field>
          <label>Ticker</label>
          <input
            type="text"
            placeholder="Ticker"
            value={ticker}
            onChange={e => setTicker(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Qty"
            min="1"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </Form.Field>
        <Button type="submit" positive size="large" fluid>Buy</Button>
      </Form>
    </Grid.Column>
  )
};

export default BuyMenu;
