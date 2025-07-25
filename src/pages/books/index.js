import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../features/books/booksSlice';
import './Books.scss';
import { useIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import Loader from '../../components/Loader';
import usePageLoader from '../../utils/usePageLoader';

const Books = () => {
    const intl = useIntl();
    const currentLang = intl.locale;
    const dispatch = useDispatch();
    const { books, status, error } = useSelector((state) => state.books);
    const { showPageLoader, hidePageLoader } = usePageLoader();

    useEffect(() => {
        const loadData = async () => {
            showPageLoader();
            await dispatch(fetchBooks({ query: "react", lang: currentLang })).unwrap(); // unwrap -> sonucunu gerçek bir Promise gibi yapar
            hidePageLoader();
        };

        loadData();
    }, [dispatch, currentLang]);

    if (status === "loading") return <Loader />;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <div className="container mt-4 books-container">
            <div className="row">
                {Array.isArray(books) && books.map((book) => {
                    const volumeInfo = book.volumeInfo;
                    return (
                        <div className="col-md-3 mb-4" key={book.id}>
                            <div key={book.id} className="card h-100">
                                {volumeInfo.imageLinks?.thumbnail && (
                                    <img
                                        src={volumeInfo.imageLinks.thumbnail}
                                        className="card-img-top"
                                        alt={volumeInfo.title}
                                    />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title" key={book.id}>{volumeInfo.title}</h5>
                                    <p className="card-text">
                                        {volumeInfo.authors?.join(', ') || <FormattedMessage id="books.unknownAuthor" />} {/*array olduğu için join kullandım*/}
                                    </p>
                                    <a  // Bootstrap sayesinde buton gibi görünüyor yeni sekmede link açmak için tercih ettim
                                        href={volumeInfo.infoLink}
                                        target="_blank"     // yeni sekmede açılması için
                                        rel="noreferrer"    // _blank kullanıldığı için güvenlik amaçlı. Tıklanan sayfa, yönlendiren URL bilgisini (referrer) göremez.
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
        </div>
    );
};

export default Books;
