import { API_BASE_URL } from "./constants";

export const loginIIFLAPI = async (user_id) => {
  const response = await fetch(
    `${API_BASE_URL}/tokens/iifl?user_id=${user_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  return await response.json();
};
