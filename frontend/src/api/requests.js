import axios from "axios";

const api = async (method, url, data = {}) => {
  const instance = axios.create();

  instance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('userId'));
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  }, (err) => {
    console.log(err)
  });

  const request = {
    post: async () => await instance.post(url, data),
    get: async () => await instance.get(url),
    delete: async () => await instance.delete(url),
    patch: async () => await instance.patch(url, data),
  }

  const response = await request[method]();
  return response;
}

export default api;

