import axios from "./axios";

export const getAllDevices = async () => await axios.get("device/all");

export const getDeviceDetail = async (id) => await axios.get(`device/${id}`);

export const createDeviceApi = async (form) => await axios.post("device", form);

export const updateDeviceApi = async (id, form) =>
  await axios.put(`device/${id}`, form);
