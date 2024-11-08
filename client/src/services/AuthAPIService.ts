import axios from "axios";

const API_URL = "http://localhost:5003/api/v1/";

export async function loginUser(data: { email: string; password: string }) {
  const response = await axios.post(API_URL + "login", data);
  return response.data;
}

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await axios.post(API_URL + "register", data);
  return response.data;
}
