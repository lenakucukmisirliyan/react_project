import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { FormattedMessage } from "react-intl";
import backButtonIcon from "../../assets/back_button.png";
import { fetchMovieDetail, clearMovieDetail } from "../../features/movieDetail/movieDetailSlice";

const MovieDetail = ({ lang }) => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const page = Number(query.get("page")) || 1;
    const movieId = Number(query.get("movie"));

    const { movie, loading, error } = useSelector((state) => state.movieDetail);

    useEffect(() => {
        if (movieId) {
            dispatch(fetchMovieDetail({ id: movieId, lang }));
        }
        return () => {
            dispatch(clearMovieDetail());
        };
    }, [movieId, lang, dispatch]);

    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;
    if (!movie) return <p><FormattedMessage id="search.noresults" /></p>;

    const backToMovies = () => {
        navigate(`/movies?page=${page}`, { replace: true });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    {movie.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="movie-poster"
                        />
                    )}
                </div>
                <div className="col-md-8 movie-detail">
                    <h2>{movie.title || movie.original_title}</h2>
                    <p>{movie.overview || "Açıklama yok."}</p>
                    <p className="color-text-dark">
                        <strong><FormattedMessage id="movieDetail.releaseDate" />:</strong> {movie.release_date}
                    </p>
                    <p className="color-text-dark">
                        <strong><FormattedMessage id="movieDetail.voteAverage" />:</strong> {movie.vote_average}
                    </p>
                    <button onClick={backToMovies} className="back-button">
                        <img src={backButtonIcon} alt="Back" className="back-button-img" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
