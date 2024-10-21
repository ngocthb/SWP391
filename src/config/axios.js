import axios from "axios";
// const baseUrl = "http://ec2-13-239-24-244.ap-southeast-2.compute.amazonaws.com:8080/api/";
// const baseUrl = "http://localhost:8080/api/";
const baseUrl = "/api/";

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
