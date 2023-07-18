import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = "https://reqres.in/api";

export const getUsers = async (pageParam = 1) => {
  const response = await axiosInstance.get(`/users?page=${pageParam}`);
  return response.data;
};
