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

//Fetch request to API to get user's transactions
export function getTransactions() {
  return axios.get(`${RAILS_API_BASE_URL}/transactions`, { withCredentials: true })
    .then(res => res.data)
    .catch(err => console.log(err));
};

//Log In
export function postLogin(logInData) {
  return axios.post("http://localhost:3001/api/v1/login", logInData, { withCredentials: true }) // Tells API it's ok to set cookie in our client
    .then(res => res)
    .catch(err => console.log(err));
};

//Sign Up
export function postUser(signUpData) {
  return axios.post("http://localhost:3001/api/v1/users", signUpData, { withCredentials: true })
    .then(res => res.data)
    .catch(err => err.response.data);
};

//Log Out
export function deleteSession() {
  return axios.delete("http://localhost:3001/api/v1/logout", { withCredentials: true })
    .then(res => res)
    .catch(err => console.log(err));
};
