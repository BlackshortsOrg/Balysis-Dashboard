import { API_BASE_URL } from "./constants";

export const getEquityTickersAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/tickers/equity`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

export const getFuturesTickersAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/tickers/future`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();

}

export const getOptionsTickersAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/tickers/option`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();

}
