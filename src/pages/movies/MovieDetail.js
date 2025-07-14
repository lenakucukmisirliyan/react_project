import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { FormattedMessage } from "react-intl";
import { API_KEY } from "../../constants";
import backButtonIcon from "../../assets/back_button.png";

const MovieDetail = ({ lang }) => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const previousPage = searchParams.get("page") || 1;

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: API_KEY,
                        language: lang === "tr" ? "tr-TR" : "en-US",
                    },
                });
                setMovie(res.data);
            } catch (error) {
                console.error("Detay alınamadı:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id, lang]);

    if (loading) return <Loader />;
    if (!movie) return <p><FormattedMessage id="search.noresults"/></p>;

    const backToMovies = () => {
        navigate(`/movies?page=${previousPage}`);
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
                <div className="col-md-8">
                    <h2>{movie.title || movie.original_title}</h2>
                    <p>{movie.overview || "Açıklama yok."}</p>
                    <p>
                        <strong><FormattedMessage id="movieDetail.releaseDate" />:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong><FormattedMessage id="movieDetail.voteAverage" />:</strong> {movie.vote_average}
                    </p>
                    <button
                        onClick={backToMovies}
                        className="back-button"
                    >
                        <img
                            src={backButtonIcon}
                            alt="Back"
                            className="back-button-img"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
