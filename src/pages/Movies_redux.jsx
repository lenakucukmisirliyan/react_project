import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/moviesSlice";
import { FormattedMessage } from "react-intl";

function Movies_redux({lang}) {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        const moviesLang = lang === "tr" ? "tr-TR" : "en-US";
        dispatch(fetchMovies(moviesLang));
    }, [dispatch, lang]);

    if (loading) return <p>{"Loading..."}</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2><FormattedMessage id="moviesRedux.title" /></h2>
            <ul>
                {items.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Movies_redux;
