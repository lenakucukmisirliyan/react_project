import { useState, useEffect } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { getPaginationItems } from "../utils/paginationUtils";

const MyPagination = ({ currentPage, totalPages, onPageChange }) => {
    const [inputPage, setInputPage] = useState(currentPage.toString());
    const maxPage = Math.min(totalPages, 1000);
    const pages = getPaginationItems(currentPage, totalPages);

    useEffect(() => {
        setInputPage(currentPage.toString());
    }, [currentPage]);

    const handlePageClick = (page) => {
        if (page === "...") return;

        if (page < 1) {
            onPageChange(1);
        } else if (page > maxPage) {
            onPageChange(maxPage);
        } else {
            onPageChange(page);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === "" || /^\d+$/.test(value)) {
            setInputPage(value);
        }
    };

    const handleJump = (e) => {
        if (e.key === "Enter") {
            let page = parseInt(inputPage, 10);
            if (!page || page < 1) {
                onPageChange(1);
                setInputPage("1");
            } else if (page > maxPage) {
                onPageChange(maxPage);
                setInputPage(maxPage.toString());
            } else {
                onPageChange(page);
            }
        }
    };

    return (
        <div className="d-flex align-items-center gap-2 flex-wrap">
            <Pagination className="mb-0">
                {pages.map((page, index) => (
                    <Pagination.Item
                        key={index}
                        active={page === currentPage}
                        onClick={() => handlePageClick(page)}
                        disabled={page === "..."}
                    >
                        {page}
                    </Pagination.Item>
                ))}

                <input
                    type="number"
                    min={1}
                    max={maxPage}
                    value={inputPage}
                    onChange={handleInputChange}
                    onKeyDown={handleJump}
                    style={{ width: "60px", height: "30px", textAlign: "center", marginLeft: "10px" }}
                />
            </Pagination>
        </div>
    );
};

export default MyPagination;
