import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/moviesSlice";

function Movies_redux({ lang }) {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    if (loading) return <p>{lang === 'en' ? "Loading..." : "Yükleniyor..."}</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>{lang === 'en' ? "Movies with Redux" : "Redux ile Filmler"}</h2>
            <ul>
                {items.map((movie) => (
                    <li key={movie.id}>{lang === 'en' ? movie.original_title : movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Movies_redux;
