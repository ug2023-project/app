import { configure } from 'axios-hooks';
import Axios, { AxiosError } from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      console.log('Unauthorized');
    }
    return Promise.reject(error);
  },
);

configure({ axios });

export default axios;
