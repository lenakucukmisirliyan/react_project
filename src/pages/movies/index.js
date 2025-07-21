import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { setSearchTerm, getMoviesThunk } from "../../features/movies/moviesSlice";
import Pagination from "../../components/Pagination";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Loader from "../../components/Loader";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Movies = ({ lang }) => {
  const dispatch = useDispatch();

  const moviesData = useSelector((state) => state.movies.moviesData);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const error = useSelector((state) => state.movies.error);
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  const totalPages = useSelector((state) => state.movies.totalPages);
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  const [inputValue, setInputValue] = useState(searchTerm);
  const [shouldFocus, setShouldFocus] = useState(false);

  const frontendPageSize = 10;
  const apiPageSize = 20;

  const currentPage = Number(query.get("page")) || 1;
  const movieId = query.get("movie");

  const frontendPageInApiPage = ((currentPage - 1) % (apiPageSize / frontendPageSize)) + 1;
  const startIndexInApiPage = (frontendPageInApiPage - 1) * frontendPageSize;
  const endIndexInApiPage = startIndexInApiPage + frontendPageSize;
  const visibleMovies = moviesData.slice(startIndexInApiPage, endIndexInApiPage);

  const inputRef = useRef(null);

  const debouncedSetSearchTerm = useCallback(
    debounce((val) => {
      const trimmed = val.trim();
      dispatch(setSearchTerm(trimmed));

      const params = new URLSearchParams();
      params.set("page", 1);
      navigate(`/movies?${params.toString()}`, { replace: true });

      setShouldFocus(true);
    }, 1000),
    [dispatch, navigate]
  );

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  useEffect(() => {
    if (inputRef.current && shouldFocus) {
      inputRef.current.focus();
      setShouldFocus(false);
    }
  }, [location.key, shouldFocus]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchTerm(value);
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const apiPage = Math.floor((currentPage - 1) / 2) + 1;

    dispatch(getMoviesThunk({
      page: apiPage,
      language: lang,
      query: searchTerm.trim()
    }));
  }, [dispatch, currentPage, lang, searchTerm]);

  const handlePageChange = (page) => {
    const params = new URLSearchParams();
    params.set("page", page);
    navigate(`/movies?${params.toString()}`, { replace: false });
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <span className="search-box">
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={inputValue}
          onChange={handleSearchChange}
        />
      </span>

      <h2 className="header list-group-item list-group-item-danger p-3">
        <FormattedMessage id="movies.title" defaultMessage="Movies" />
      </h2>

      <ul>
        {visibleMovies.length > 0 ? (
          visibleMovies.map((movie) => (
            <li key={movie.id} className="list-group-item list-group-item-info films">
              <Link to={`/movies/movie?page=${currentPage}&movie=${movie.id}`} className="movie-link">
                {movie.title || movie.original_title}
              </Link>
            </li>
          ))
        ) : (
          <li className="list-group-item">No movies found on this page.</li>
        )}
      </ul>

      <div className="pagination-container">
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="prev-next-buttons">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            className="btn btn-secondary me-2"
            disabled={currentPage === 1}
          >
            <FormattedMessage id="page.previous" defaultMessage="Previous" />
          </button>
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            className="btn btn-secondary"
            disabled={currentPage === totalPages}
          >
            <FormattedMessage id="page.next" defaultMessage="Next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movies;
