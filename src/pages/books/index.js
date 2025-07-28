import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../features/books/booksSlice';
import './Books.scss';
import { useIntl, FormattedMessage } from 'react-intl';
import Loader from '../../components/Loader';
import usePageLoader from '../../utils/usePageLoader';

const Books = () => {
    const intl = useIntl();
    const currentLang = intl.locale;
    const dispatch = useDispatch();
    const { books, status, error, hasMore } = useSelector((state) => state.books);
    const { showPageLoader, hidePageLoader } = usePageLoader();
    const [page, setPage] = useState(1);
    const bottomRef = useRef(null);

    const isInitialLoading = status === 'loading' && page === 1;

    useEffect(() => {
        const loadData = async () => {
            try {
                showPageLoader();
                await dispatch(fetchBooks({ query: 'react', lang: currentLang, page })).unwrap();
            } catch (err) {
                console.error("Kitapları çekerken hata:", err);
            } finally {
                hidePageLoader();
            }
        };

        loadData();
    }, [dispatch, currentLang, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(  //Scroll event'ini algılamak için
            (entries) => {
                if (entries[0].isIntersecting && hasMore && status !== "loading") {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0.25 }
        );

        const bottomEl = bottomRef.current;
        if (bottomEl) observer.observe(bottomEl);

        return () => {
            if (bottomEl) observer.unobserve(bottomEl);
        };
    }, [hasMore, status]);

    if (status === "failed") return <p className="text-danger">Error: {error}</p>;
    if (isInitialLoading) return <Loader />;

    return (
        <div className="container mt-4 books-container" style={{ paddingBottom: '150px' }}>
            <div className="row">
                {Array.isArray(books) && books.map((book) => {
                    const volumeInfo = book.volumeInfo;
                    return (
                        <div className="col-md-3 mb-4" key={book.id}>
                            <div className="card h-100">
                                {volumeInfo.imageLinks?.thumbnail && (
                                    <img
                                        src={volumeInfo.imageLinks.thumbnail}
                                        className="card-img-top"
                                        alt={volumeInfo.title}
                                    />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{volumeInfo.title}</h5>
                                    <p className="card-text">
                                        {volumeInfo.authors?.join(', ') || (
                                            <FormattedMessage id="books.unknownAuthor" />
                                        )}
                                    </p>
                                    <a
                                        href={volumeInfo.infoLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-primary mt-auto"
                                    >
                                        <FormattedMessage id="books.viewDetails" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {status === "loading" && (
                <div className="text-center my-4">
                    <Loader />
                </div>
            )}

            {!hasMore && (
                <div className="text-center my-4 text-muted">
                    <FormattedMessage id="books.noMoreResults" />
                </div>
            )}

            <div
                ref={bottomRef}
                style={{
                    height: '1px',
                    backgroundColor: 'red',
                    marginTop: '10px',
                }}
            ></div>
        </div>
    );
};

export default Books;
