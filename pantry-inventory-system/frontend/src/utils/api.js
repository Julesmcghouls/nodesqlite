import axios from "axios";

const API_BASE = "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Basic ${btoa("admin:admin")}`, // Hardcoded for demo
  },
});

export const fetchItems = (params) => axiosInstance.get("/items", { params });

export const addItem = (data) => axiosInstance.post("/items", data);

export const updateItem = (id, data) => axiosInstance.put(`/items/${id}`, data);

export const deleteItem = (id) => axiosInstance.delete(`/items/${id}`);

export const fetchUser = () => axiosInstance.get("/users/me");