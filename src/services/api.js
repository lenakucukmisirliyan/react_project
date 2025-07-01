import axios from 'axios';
import { API_KEY } from '../constants';

const axiosInstance = axios.create({
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
      url: 'https://api.themoviedb.org/3/movie/popular',
    },
  },
  contact: {
    send: {
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts', // Sahte API
    },
  },
};

export default axiosInstance;
