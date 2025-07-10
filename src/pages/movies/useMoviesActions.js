import { useDispatch, useSelector } from 'react-redux';
import useService from '../../services/useService';
import { apiConfigs } from '../../services/api';
import { setMoviesDataAction } from '../../features/movies/moviesSlice';

const useMoviesActions = () => {
  const dispatch = useDispatch();
  const { serviceCall } = useService();
  const { moviesData } = useSelector((state) => state.movies);

  const getMovies = async (params, callback) => {
    try {
      const res = await serviceCall({ ...apiConfigs.movies.list, params });
      if (Array.isArray(res.results)) {
        dispatch(setMoviesDataAction(res.results));
        if (callback) callback(res);
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      if (callback) callback(null);
    }
  };

  return {
    getMovies,
    moviesData
  };
};

export default useMoviesActions;
