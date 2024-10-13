import axios from "axios";
// const baseUrl = "https://reqres.in/api/";
const baseUrl = "http://localhost:8080/api";
// const baseUrl = "https://tiktok.fullstack.edu.vn/api/";

const config = {
  baseUrl: baseUrl,
};

const api = axios.create(config);

api.defaults.baseURL = baseUrl;

const handleBefore = (config) => {
  const token = sessionStorage.getItem("token")?.replaceAll('"', "");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

api.interceptors.request.use(handleBefore, null);

export default api;
