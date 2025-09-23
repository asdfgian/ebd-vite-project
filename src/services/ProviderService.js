import axios from "./axios";

export const getProviderByRuc = async (ruc) =>
    await axios.get(`provider/by-ruc?ruc=${ruc}`);

export const getAllProviders = async () => await axios.get("provider/all");

export const getProviderDetailById = async (id) =>
    await axios.get(`provider/${id}`);

export const createProvider = async (form) =>
    await axios.post("provider", form);

export const updateProvider = async (id, form) =>
    await axios.put(`provider/${id}`, form);
