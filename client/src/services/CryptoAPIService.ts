import axios from "axios";

const API_URL = "https://api.coincap.io/v2/";

export const fetchCryptoData = async ({
  queryKey,
}: {
  queryKey: [string, { search?: string; limit?: number; offset?: number; ids?: string }];
}) => {
  const [_key, { search = "", limit = 10, offset = 0, ids = "" }] = queryKey;

  let url = `${API_URL}assets?limit=${limit}&offset=${offset}`;

  if (search) {
    url += `&search=${search}`;
  }

  if (ids) {
    url += `&ids=${ids}`;
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

export const fetchCryptoDetails = async ({
  queryKey,
}: {
  queryKey: [string, { id: string }];
}) => {
  const [_key, { id }] = queryKey;

  const url = `${API_URL}assets/${id}`;
  const response = await axios.get(url);
  return response.data.data;
};

export const fetchCryptoMarkets = async ({
  queryKey,
}: {
  queryKey: [string, { id: string; limit: number; offset: number }];
}) => {
  const [_key, { id, limit, offset }] = queryKey;

  const url = `${API_URL}assets/${id}/markets?limit=${limit}&offset=${offset}`;
  const response = await axios.get(url);
  return response.data.data;
};

export const fetchCryptoHistory = async (
  id: string,
  interval: string,
  start: number,
  end: number
) => {
  const url = `${API_URL}assets/${id}/history?interval=${interval}&start=${start}&end=${end}`;
  const response = await axios.get(url);
  return response.data.data;
};
