import { API_BASE_URL } from "./constants";

export const getTransactionHistoryAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/metrics/transaction-history`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};
