import axios from "./axios";

export const getAllUsers = async () => await axios.get("user/all");

export const getUserDetail = async (id) => await axios.get(`user/${id}`);

export const updateUserApi = async (id, form) =>
  await axios.put(`user/${id}`, form);
