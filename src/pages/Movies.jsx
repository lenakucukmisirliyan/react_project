import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

const API_KEY = "23a0dfb4e623e111fa20f927a8922a98" 

function MovieList ({lang}) {
    const [movies, setMovies] = useState([]);

    useEffect (() => {
        const apiLang = lang === "tr" ? "tr-TR" : "en-US";
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${lang}&page=1`)
            .then(res => res.json())
            .then(data => setMovies(data.results))
            .catch(err => console.error("Veri alınamadı" ,err));
    }, [lang]);

    return(
        <div>
            <h2><FormattedMessage id="movies.title" /></h2>
            <ul>
                {movies.slice(0, 10).map(movie => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;