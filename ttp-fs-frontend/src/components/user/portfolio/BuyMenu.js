import React, { useState } from 'react';
import axios from 'axios';
import { Form, Grid, Button, Message } from 'semantic-ui-react';

const BuyMenu = ({ formatted_balance }) => {
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //Gets stock data from IEX API
  function getStockData() {
    const formattedTicker = encodeURIComponent(ticker); //API requires symbols to be URI encoded
    return axios.get(`https://api.iextrading.com/1.0/tops?symbols=${formattedTicker}`)
      .then(res => res.data[0])
      .catch(err => console.log(err));
  };

  //If we have enough money return new balance else return negative number
  function newBalance(stockPrice) {
    const total = Number((stockPrice * quantity).toFixed(2)); //Round total to 2nd decimal place
    const userBalance = Number(formatted_balance.replace(/[^0-9.-]+/g,"")); //Remove non-periods/non-digits
    return userBalance > total ? userBalance - total : -1;
  };

  //Fetch request to API to patch user's balance and find or create stock
  function buyStock(orderData) {
    return axios.patch("http://localhost:3001/api/v1/buy", { withCredentials: true })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  /*Check if we have enough money. If we have enough money, then we make a patch request to user.
    Patch request will have stock, quantity bought, new balance
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); //Set loading to true until api request resolves
    getStockData()
    .then(({ symbol, lastSalePrice }) => {
      const balance = newBalance(lastSalePrice);
      if(balance >= 0){ //Had enough money
        const orderData = {
          symbol,
          quantity,
          balance
        };
        buyStock(orderData) //Set user and set success to true
          .then(data => {
            console.log(data);
            setSuccess(true);
            setIsLoading(false);
          })
          .catch(err => console.log(err));
      } else {  //Didn't have enough money
        setError(true);
        setIsLoading(false);
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <Grid.Column>
      <Form success={success} error={error} size="large" loading={isLoading} onSubmit={handleSubmit}>
        <Message success>
          <Message.Header>Transaction was successful</Message.Header>
        </Message>
        <Message error>
          <Message.Header>We're sorry. The transaction was unsuccessful</Message.Header>
          <p>You do not have enough money in your balance!</p>
        </Message>
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
  );
};

export default BuyMenu;
