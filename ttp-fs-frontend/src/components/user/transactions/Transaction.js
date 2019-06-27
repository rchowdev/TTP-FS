import React from 'react';

const Transaction = ({ transaction: { price } }) => {
  return(
    <h1>{price}</h1>
  );
};

export default Transaction;
