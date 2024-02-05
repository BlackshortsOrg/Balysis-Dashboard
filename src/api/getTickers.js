import { API_BASE_URL } from "./constants";

export const getEquityTickersAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/equitytickers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

export const getFuturesTickersAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/futuretickers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();

}

export const getOptionsTickersAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/optiontickers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();

}
