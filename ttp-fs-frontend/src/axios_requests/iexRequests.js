import axios from 'axios';

const IEX_API_BASE_URL = "https://cloud.iexapis.com/stable/stock";

//Gets stock data from IEX API based on filters array
export function getStockData(ticker, filters) {
  const formattedTicker = encodeURIComponent(ticker); //API requires symbols to be URI encoded
  return axios.get(`${IEX_API_BASE_URL}/${formattedTicker}/quote?filter=${filters.join(",")}&token=${IEX_API_PUBLIC_KEY}`)
    .then(res => res.data)
    .catch(err => console.log(err));
};
