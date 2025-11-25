import axios from "./axios";

export const getMovementsByDeviceId = async (deviceId) =>
  await axios.get(`movement/${deviceId}`);

export const createMovementApi = async (form) =>
  await axios.post("movement", form);
