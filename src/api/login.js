import { API_BASE_URL } from "./constants";

export const loginAPI = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    const token = data.token;
    localStorage.setItem("token", token);
  }

  return data;
};
