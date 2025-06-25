import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

const API_KEY = "23a0dfb4e623e111fa20f927a8922a98"

function MovieList({ lang }) {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const apiLang = lang === "tr" ? "tr-TR" : "en-US";
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${apiLang}&page=${currentPage}`)
            .then(res => res.json())
            .then(data => setMovies(data.results))
            .catch(err => console.error("Veri alınamadı", err));
    }, [lang, currentPage]);

    const filteredMovies = movies
        .filter(movie => movie.title.toLowerCase().startsWith(searchTerm.toLowerCase()));

    function handlePrevPage() {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    function handleNextPage() {
        setCurrentPage(currentPage + 1);
    }

    return (
        <div>
            <span style={{ display: 'inline-block', float: 'right', width: '200px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </span>

            <h2 className="list-group-item list-group-item-danger p-3"
                style={{
                    fontSize: '40px',
                    width: '50%',
                    margin: '0 auto 10px 305px',
                    textAlign: 'center',
                }}>
                <FormattedMessage id="movies.title" />
            </h2>

            <ul>
                {filteredMovies.slice(0, 10).map(movie => (
                    <li key={movie.id}
                        className="list-group-item list-group-item-info "
                        style={{
                            width: '50%',
                            position: 'relative',
                            paddingLeft: '1.2em',
                            margin: '0 auto 1px auto',
                        }}>
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