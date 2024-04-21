import { API_BASE_URL } from "./constants";

export const listInstancesAPI = async (token, strategy_name) => {
  const response = await fetch(`${API_BASE_URL}/strategy/instanceslist?strategy_name=${strategy_name}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  if (response.status === 401) {
    window.location.href = "/login";
  }
  return await response.json();
};
