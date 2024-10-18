import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCryptoData = async ({
  queryKey,
}: {
  queryKey: [string, { search: string; limit: number; offset: number }];
}) => {
  const [_key, { search, limit, offset }] = queryKey;

  let url = `${API_URL}assets?limit=${limit}&offset=${offset}`;

  if (search) {
    url += `&search=${search}`;
  }

  const response = await axios.get(url);
  return response.data.data;
};

export const fetchExchangeData = async ({
  queryKey,
}: {
  queryKey: [string, { limit: number; offset: number }];
}) => {
  const [_key, { limit, offset }] = queryKey;

  const url = `${API_URL}exchanges?limit=${limit}&offset=${offset}`;
  const response = await axios.get(url);
  return response.data.data;
};

export const fetchCryptoDetails = async ( id : string) => {
  const url = `${API_URL}assets/${id}`;
  const response = await axios.get(url);
  return response.data.data;
};

export const fetchCryptoHistory = async (id: string, interval: string, start: number, end: number) => {

  const url = `${API_URL}assets/${id}/history?interval=${interval}&start=${start}&end=${end}`;
  const response = await axios.get(url);
  return response.data.data;
};

export const fetchCryptoMarkets = async (id: string, limit: number, offset : number) => {

  const url = `${API_URL}assets/${id}/markets?limit=${limit}&offset=${offset}`;
  const response = await axios.get(url);
  return response.data.data;
};

