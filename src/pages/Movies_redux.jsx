import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/moviesSlice";
import { FormattedMessage } from "react-intl";

function Movies_redux({ lang }) {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { items, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        const moviesLang = lang === "tr" ? "tr-TR" : "en-US";
        dispatch(fetchMovies(moviesLang));
    }, [dispatch, lang]);

    if (loading) return <p>{"Loading..."}</p>;
    if (error) return <p>{error}</p>;

    const filteredMovies = items.filter(movie =>
        movie.title.toLowerCase().startsWith(searchTerm.toLowerCase()));

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
                <FormattedMessage id="moviesRedux.title" />
            </h2>

            <ul>
                {filteredMovies.map((movie) => (
                    <li key={movie.id}
                        className="list-group-item list-group-item-primary"
                        style={{
                            width: '50%',
                            position: 'relative',
                            paddingLeft: '1.2em',
                            margin: '0 auto 1px auto',
                        }}
                    >{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Movies_redux;
