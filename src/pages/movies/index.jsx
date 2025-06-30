import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import useMoviesActions from "../../hooks/useMoviesActions";

const Movies = ({ lang }) => {
  const { getMovies, moviesData } = useMoviesActions();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMovies({ language: lang === "tr" ? "tr-TR" : "en-US", page: currentPage });
  }, [lang, currentPage]);

  // Filtreleme arama terimine göre
  const filteredMovies = moviesData?.filter(movie =>
    movie.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

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
        {filteredMovies?.slice(0, 10).map((movie) => (
          <li
            key={movie.id}
            className="list-group-item list-group-item-info films"
          >
            {movie.title}
          </li>
        ))}
      </ul>

      <div>
        <button
          onClick={handlePrevPage}
          className="btn btn-secondary me-2"
          disabled={currentPage === 1}
        >
          <FormattedMessage id="page.previous" />
        </button>
        <button onClick={handleNextPage} className="btn btn-secondary">
          <FormattedMessage id="page.next" />
        </button>
      </div>
    </div>
  );
};

export default Movies;
