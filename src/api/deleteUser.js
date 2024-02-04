import { API_BASE_URL } from "./constants";

export default async function deleteUserAPI(id) {
  const response = await fetch(`${API_BASE_URL}/user/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
    }),
  });
  return await response.json();
}
