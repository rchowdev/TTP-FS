import axios from 'axios';
const RAILS_API_BASE_URL = "http://localhost:3001/api/v1";

//Fetch request to API to patch user's balance and find or create stock
export function buyStock(orderData) {
  return axios.patch(`${RAILS_API_BASE_URL}/buy`, orderData, { withCredentials: true })
    .then(res => res.data)
    .catch(err => console.log(err));
};

//Fetch request to API to get user's stocks
export function getUserStocks() {
  return axios.get(`${RAILS_API_BASE_URL}/stocks`, { withCredentials: true })
    .then(res => res)
    .catch(err => console.log(err));
};
