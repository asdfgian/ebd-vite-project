import axios from "./axios";

export const signUp = async (form) => await axios.post("auth/sign-up", form);

export const signIn = async (form) => await axios.post("auth/sign-in", form);
