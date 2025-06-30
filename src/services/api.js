import { API_KEY } from '../constants';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['api_key'] = API_KEY;
  return config;
});

export const apiConfigs = {
  movies: {
    list: {
      method: 'GET',
      url: '/movie/popular',
    },
  },
};

export default axiosInstance;