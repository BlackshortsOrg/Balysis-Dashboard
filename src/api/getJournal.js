import { API_BASE_URL } from "./constants";

export const getJournal = async (token) => {
  const response = await fetch(
    `${API_BASE_URL}/trade/journal`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  return response;
};
