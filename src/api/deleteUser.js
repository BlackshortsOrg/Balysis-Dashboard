import { API_BASE_URL } from "./constants";

export default async function deleteUserAPI(token, id, otp) {
  const response = await fetch(`${API_BASE_URL}/user/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      admin_pin: otp,
      Authorization: token,
    },
    body: JSON.stringify({
      user_id: id,
    }),
  });
  return response;
}
