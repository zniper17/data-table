import axios from "axios";

const axiosPrimaryInstance = axios.create();

axiosPrimaryInstance.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export const getPostPage = async (pageParam = 1) => {
  const response = await axiosPrimaryInstance.get(`/posts?_page=${pageParam}`);
  return response.data;
};
