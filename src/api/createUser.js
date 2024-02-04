import { API_BASE_URL } from "./constants";

export const createUserAPI = async (name, broker, client_id, secret_id) => {
  const user = {
    name,
    broker,
    client_id,
    secret_id,
  };
  const response = await fetch(`${API_BASE_URL}/user/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await response.json();
};
