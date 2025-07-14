import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import useMoviesActions from "./useMoviesActions";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Movies = ({ lang }) => {
  const { getMovies } = useMoviesActions();
  const isLoading = useSelector((state) => state.loader.isLoading);

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
      language: lang === "tr" ? "tr" : "en",
      query: searchTerm.trim() === "" ? undefined : searchTerm.trim() // Eğer arama varsa, query parametresini ekle
    };  // trim : bir string’in başındaki ve sonundaki boşlukları temizler.

    getMovies(params, (result) => {
      if (result && Array.isArray(result.results)) {
        const apiTotalPagesResult = Math.min(result.total_pages, maxApiPageLimit);
        const frontendTotalPages = Math.ceil((apiTotalPagesResult * apiPageSize) / frontendPageSize);

        setTotalPages(frontendTotalPages);
        setLastApiPage(apiPage);
        setLastApiResults(result.results);
        setApiTotalPages(apiTotalPagesResult);
      } else {
        setLastApiResults([]);
        setTotalPages(1);
      }
    });
  };

  useEffect(() => {
    getMoviesReq();
  }, [lang, currentPage, searchTerm]); // Arama veya dil veya sayfa değişince çağır

  // Search filtering artık API üzerinden yapıldığı için frontend filtreleme kaldırıldı
  // Çünkü query parametresi API'ye gidiyor, sonuçlar ona göre geliyor

  const frontendPageInApiPage = ((currentPage - 1) % (apiPageSize / frontendPageSize)) + 1;
  const startIndexInApiPage = (frontendPageInApiPage - 1) * frontendPageSize;
  const endIndexInApiPage = startIndexInApiPage + frontendPageSize;

  const visibleMovies = lastApiResults.slice(startIndexInApiPage, endIndexInApiPage);

  const handlePrevPage = () => {
    changePage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    changePage(Math.min(currentPage + 1, totalPages));
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <span className="search-box">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            changePage(1); // Arama yapınca sayfa 1'e dönsün, kullanıcı deneyimi için
          }}
        />
      </span>

      <h2 className="header list-group-item list-group-item-danger p-3">
        <FormattedMessage id="movies.title" />
      </h2>

      <ul>
        {visibleMovies.length > 0 ? (
          visibleMovies.map((movie) => (
            <li key={movie.id} className="list-group-item list-group-item-info films">
              <Link to={`/movies/${movie.id}?page=${currentPage}`} className="movie-link">
                {movie.title || movie.original_title}
              </Link>
            </li>
          ))
        ) : (
          <li className="list-group-item">
            <FormattedMessage id="search.noresults" defaultMessage="No movies found on this page." />
          </li>
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
