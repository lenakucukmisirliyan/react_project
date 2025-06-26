import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { API_KEY } from "../../constants/constant";

const MovieList = ({ lang }) => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const apiLang = lang === "tr" ? "tr-TR" : "en-US";
        axios.get('https://api.themoviedb.org/3/movie/popular',
            {
            params: {
                api_key: API_KEY,
                language: apiLang,
                page: currentPage
            }
        })
        .then(response => setMovies(response.data.results))
        .catch(err => console.error("Veri alınamadı", err));
    }, [lang, currentPage]);

const filteredMovies = movies
    .filter(movie => movie.title.toLowerCase().startsWith(searchTerm.toLowerCase()));

const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
}

const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
}

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
            {filteredMovies.slice(0, 10).map(movie => (
                <li key={movie.id}
                    className="list-group-item list-group-item-info films">
                    {movie.title}
                </li>
            ))}
        </ul>
        <div>
            <button onClick={handlePrevPage} className="btn btn-secondary me-2" disabled={currentPage === 1}><FormattedMessage id="page.previous" /></button>
            <button onClick={handleNextPage} className="btn btn-secondary"><FormattedMessage id="page.next" /></button>
        </div>
    </div>
);
}

export default MovieList;