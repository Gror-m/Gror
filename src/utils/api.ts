import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function safeFetch<T>(url: string) {
  return api.get<T>(url).then((response) => response.data);
}
