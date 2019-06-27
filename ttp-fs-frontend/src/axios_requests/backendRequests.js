import axios from 'axios';

//Fetch request to API to patch user's balance and find or create stock
export function buyStock(orderData) {
  return axios.patch("http://localhost:3001/api/v1/buy", orderData, { withCredentials: true })
    .then(res => res.data)
    .catch(err => console.log(err));
};
