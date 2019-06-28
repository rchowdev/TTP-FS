import React, { useState } from 'react';
import currency from 'currency.js';
import { Form, Grid, Button, Message } from 'semantic-ui-react';
import { getStockData } from '../../../axios_requests/iexRequests';
import { buyStock } from '../../../axios_requests/backendRequests';

const BuyMenu = ({ user, setUser, updateStocks }) => {
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Calculate new balance: Will be negative if not enough money
  function newBalance(stockPrice) {
    const total = currency(stockPrice) * quantity;
    const userBalance = currency(user.formatted_balance);
    return userBalance.subtract(total).value;
  };

  //Check if we have enough money to buy stocks
  function verifyBalance(stockPrice) {
    const balance = newBalance(stockPrice);
    if (balance < 0) {
      setErrorMessage("Not Enough Funds")
      return false;
    }
    return true;
  };

  //Verify if we got a response from IEX API (Check if ticker was valid)
  function verifyTicker(stock) {
    if(!stock.symbol){
      setErrorMessage(stock);
      return false;
    }
    return true;
  };

  /*Check if we have enough money. If we have enough money, then we make a patch request to user.
    Patch request will have stock, quantity bought, new balance
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);  //Reset error and success state
    setError(false);
    setIsLoading(true); //Set loading to true until api request resolves
    getStockData(ticker, ["symbol","latestPrice"])
    .then(stock => {
      if(verifyTicker(stock) && verifyBalance(stock.latestPrice)){ //Check if ticker is valid, then if we have enough funds
        const { symbol, latestPrice } = stock;
        const balance = newBalance(latestPrice);
        const orderData = {
          orderData: {
            symbol,
            quantity,
            balance,
            latestPrice
          }
        };
        buyStock(orderData)
          .then(({ user, symbol, quantity }) => { //Set user, set success to true, set stocks list
            setSuccess(true);
            setIsLoading(false);
            setTicker("");
            setQuantity(1);
            setUser(user);
            updateStocks({ symbol, quantity });
          })
          .catch(err => console.log(err));
      } else {
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
          <p>{errorMessage}</p>
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
