import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSortedBooks } from '../../features/books/booksSlice';
import '../../styles/pages/_books.scss';
import { useIntl, FormattedMessage } from 'react-intl';
import Loader from '../../components/Loader';
import usePageLoader from '../../utils/usePageLoader';
import BooksFilters from "../../components/BooksFilters";


const Books = () => {
    const intl = useIntl();
    const currentLang = intl.locale;
    const dispatch = useDispatch();
    const sort = useSelector((state) => state.filters.sort);
    const { rawBooks, books, status, error, hasMore } = useSelector((state) => state.books);
    const { showPageLoader, hidePageLoader } = usePageLoader();
    const [page, setPage] = useState(1);
    const bottomRef = useRef(null);

    const isInitialLoading = status === 'loading' && page === 1;

    useEffect(() => {
        const loadData = async () => {
            try {
                showPageLoader();
                await dispatch(fetchBooks({ query: 'react', page })).unwrap();   // .unwrap() → Hata varsa try/catch’e düşmesini sağlar.
            } catch (err) {
                console.error("Kitapları çekerken hata:", err);
            } finally {
                hidePageLoader();
            }
        };

        loadData();
    }, [dispatch, page]);

    useEffect(() => {
        if (!rawBooks) return;
        dispatch(setSortedBooks(sort));
    }, [rawBooks, sort, dispatch]);

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
        <div className="container mt-4 books-container">
            <div className="row">
                <h2 className="p-3 page-title mb-0">
                    <FormattedMessage id="books.title" defaultMessage="Books" />
                </h2>
                <BooksFilters />
                {Array.isArray(books) && books.map((book) => {
                    const volumeInfo = book.volumeInfo;
                    return (
                        <div className="col-md-3 mb-4" key={book.id}>
                            <div className="book-card h-100">
                                {volumeInfo.imageLinks?.thumbnail && (
                                    <img
                                        src={volumeInfo.imageLinks.thumbnail}
                                        className="book-img"
                                        alt={volumeInfo.title}
                                    />
                                )}
                                <div className="book-card-body d-flex flex-column">
                                    <h5 className="book-title">{volumeInfo.title}</h5>
                                    <p className="book-author">
                                        {volumeInfo.authors?.join(', ') || (
                                            <FormattedMessage id="books.unknownAuthor" />
                                        )}
                                    </p>
                                    <a
                                        href={volumeInfo.infoLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-primary book-btn"
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
            />
        </div>
    );
};

export default Books;
