import axios from "axios";

export const getAuthTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("jwt"));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};
const token = getAuthTokenFromCookie();

export const usersCliant = axios.create({
  baseURL: "http://localhost:3000/api/users",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});
