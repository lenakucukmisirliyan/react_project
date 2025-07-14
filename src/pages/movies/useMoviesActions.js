import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../services/api';
import { setMoviesDataAction } from '../../features/movies/moviesSlice';
import { API_KEY } from '../../constants';

const useMoviesActions = () => {
  const dispatch = useDispatch();
  const { moviesData } = useSelector((state) => state.movies);

  const getMovies = async (params, callback) => {
    try {
      let url = '';
      const { query, page, language } = params;

      if (query && query.trim() !== '') {
        url = 'https://api.themoviedb.org/3/search/movie';
      } 
      else {
        url = 'https://api.themoviedb.org/3/movie/popular';
      }

      const response = await axiosInstance.get(url, {
        params: {
          api_key: API_KEY,
          language,
          page,
          query,

        }});

      const res = response.data;

      if (Array.isArray(res.results)) {
        dispatch(setMoviesDataAction(res.results));
        callback?.(res);
      } else {
        callback?.(null);
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      callback?.(null);
    }
  };

  return {
    getMovies,
    moviesData,
  };
};

export default useMoviesActions;
