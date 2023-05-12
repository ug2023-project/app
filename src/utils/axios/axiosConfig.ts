import { configure } from 'axios-hooks';
import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      console.log('axios interceptors response 401');
    }
    return Promise.reject(error);
  },
);

configure({ axios });

export default instance;
