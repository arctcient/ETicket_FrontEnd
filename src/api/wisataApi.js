// src/api/wisataApi.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/tempat-wisata";

export const getWisata = () => axios.get(API_URL);
export const addWisata = (data) => axios.post(API_URL, data);
export const updateWisata = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteWisata = (id) => axios.delete(`${API_URL}/${id}`);
