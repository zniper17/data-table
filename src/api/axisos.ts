import axios from "axios";

const axiosPrimaryInstance = axios.create();

axiosPrimaryInstance.defaults.baseURL = "https://reqres.in/api";

export const getUsers = async (pageParam = 1) => {
  const response = await axiosPrimaryInstance.get(`/users?page=${pageParam}`);
  return response.data;
};
