import axios from 'axios';
import { API_KEY } from '../constants';
import { METHOD } from '../constants';

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
      method: METHOD.GET,
      url: 'https://api.themoviedb.org/3/movie/popular',
    },
  },
  search: {
    method: METHOD.GET,
    url: 'https://api.themoviedb.org/3/search/movie',
  },
  contact: {
    send: {
      method: METHOD.POST,
      url: 'https://jsonplaceholder.typicode.com/posts', // Sahte API
    },
  },
  books: {
    method: METHOD.GET,
    url: 'https://www.googleapis.com/books/v1/volumes',
  }
};

export default axiosInstance;
