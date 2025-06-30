import { useDispatch, useSelector } from 'react-redux';
import useService from '../services/useService';
import { apiConfigs } from '../services/api';
import { setMoviesDataAction } from '../features/movies/moviesSlice';

const useMoviesActions = () => {
  const dispatch = useDispatch();
  const { serviceCall } = useService();

  const moviesData = useSelector((state) => state.movies.moviesData);

  const getMovies = async (params) => {
    try {
      const res = await serviceCall({ ...apiConfigs.movies.list, params });

      const movies = res?.results || [];

      dispatch(setMoviesDataAction(movies));
    } catch (error) {
      console.error("Film çekme hatası:", error);
      dispatch(setMoviesDataAction([]));
    }
  };

  return { getMovies, moviesData };
};

export default useMoviesActions;
