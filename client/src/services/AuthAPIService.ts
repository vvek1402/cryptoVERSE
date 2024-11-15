import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginUser(data: { email: string; password: string }) {
  const response = await axios.post(API_URL + "/auth/login", data);
  return response.data;
}

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await axios.post(API_URL + "/auth/register", data);
  return response.data;
}
