export default async function checkLogin() {
  if (sessionStorage.getItem("token") === null) {
    window.location.href = "/login";
  } else {
    return sessionStorage.getItem("token");
  }
}
