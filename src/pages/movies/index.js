import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import useMoviesActions from "./useMoviesActions";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux"; // Redux'tan loader kontrolü

const Movies = ({ lang }) => {
  const { getMovies } = useMoviesActions();
  const isLoading = useSelector((state) => state.loader.isLoading); // loader state

  const frontendPageSize = 10;
  const apiPageSize = 20;
  const maxApiPageLimit = 500;

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [totalPages, setTotalPages] = useState(1);
  const [lastApiPage, setLastApiPage] = useState(0);
  const [lastApiResults, setLastApiResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiTotalPages, setApiTotalPages] = useState(1);

  const changePage = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
  };

  const getMoviesReq = () => {
    const apiPage = Math.floor(((currentPage - 1) * frontendPageSize) / apiPageSize) + 1;

    if (apiPage > maxApiPageLimit) {
      console.warn("API sayfa limiti aşıldı:", apiPage);
      return;
    }

    const params = {
      page: apiPage,
      language: lang === "tr" ? "tr-TR" : "en-US",
    };

    getMovies(params, (result) => {
      if (result && Array.isArray(result.results)) {
        const apiTotalPagesResult = Math.min(result.total_pages, maxApiPageLimit);
        const frontendTotalPages = Math.ceil((apiTotalPagesResult * apiPageSize) / frontendPageSize);

        setTotalPages(frontendTotalPages);
        setLastApiPage(apiPage);
        setLastApiResults(result.results);
        setApiTotalPages(apiTotalPagesResult);
      } else {
        console.error("API'den sonuç yok veya beklenmeyen format:", result);
        setLastApiResults([]);
        setTotalPages(1);
      }
    });
  };

  useEffect(() => {
    getMoviesReq();
  }, [lang, currentPage]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      changePage(1);
    }
  }, [searchTerm]);

  const filteredMovies = lastApiResults.filter((movie) =>
    movie.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setTotalPages(apiTotalPages * (apiPageSize / frontendPageSize));
    } else {
      const totalFilteredPages = Math.ceil(filteredMovies.length / frontendPageSize);
      setTotalPages(totalFilteredPages);
    }
  }, [searchTerm, apiTotalPages, filteredMovies]);

  const frontendPageInApiPage = ((currentPage - 1) % (apiPageSize / frontendPageSize)) + 1;
  const startIndexInApiPage = (frontendPageInApiPage - 1) * frontendPageSize;
  const endIndexInApiPage = startIndexInApiPage + frontendPageSize;

  const visibleMovies = filteredMovies.slice(startIndexInApiPage, endIndexInApiPage);

  const handlePrevPage = () => {
    changePage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    changePage(Math.min(currentPage + 1, totalPages));
  };

  // API çağrısı yapılırken sadece loader göster
  if (isLoading) return <Loader />;

  return (
    <div>
      <span className="search-box">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </span>

      <h2 className="header list-group-item list-group-item-danger p-3">
        <FormattedMessage id="movies.title" />
      </h2>

      <ul>
        {visibleMovies.length > 0 ? (
          visibleMovies.map((movie) => (
            <li key={movie.id} className="list-group-item list-group-item-info films">
              {movie.title}
            </li>
          ))
        ) : (
          <li className="list-group-item">No movies found.</li>
        )}
      </ul>

      <div className="pagination-container">
        <div className="pagination">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
        </div>
        <div className="prev-next-buttons">
          <button onClick={handlePrevPage} className="btn btn-secondary me-2" disabled={currentPage === 1}>
            <FormattedMessage id="page.previous" />
          </button>
          <button onClick={handleNextPage} className="btn btn-secondary" disabled={currentPage === totalPages}>
            <FormattedMessage id="page.next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movies;
