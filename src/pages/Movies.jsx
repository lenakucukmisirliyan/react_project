import React, { useEffect, useState } from "react";

const API_KEY = "23a0dfb4e623e111fa20f927a8922a98" 

function MovieList ({lang}) {
    const [movies, setMovies] = useState([]);

    useEffect (() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=tr-TR&page=1`)
            .then(res => res.json())
            .then(data => setMovies(data.results))
            .catch(err => console.error("Veri alınamadı" ,err));
    }, []);

    return(
        <div>
            <ul>
                {movies.slice(0, 10).map(movie => (
                    <li key={movie.id}>{lang === 'en' ? movie.original_title : movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;