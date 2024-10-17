import { useState } from "react";
import './PagiNationNum.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

export default function PagiNationNum({ itemsPerPage, maxPagesToShow, totalItems, currentPage, setCurrentPage }) {
    const totalNumberOfPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const currentGroup = Math.floor((currentPage - 1) / maxPagesToShow);
        const startPage = currentGroup * maxPagesToShow + 1;
        const endPage = Math.min(totalNumberOfPages, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <ul className="pagiNumber">
                {currentPage > 1 && (
                    <>
                        <li>
                            <button onClick={() => handlePageChange(1)}>
                                <FontAwesomeIcon icon={faAnglesLeft} />
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handlePageChange(currentPage - 1)}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                        </li>
                    </>
                )}
                {getPageNumbers().map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={currentPage === pageNumber ? 'selected' : ''}
                    >
                        <button onClick={() => handlePageChange(pageNumber)}>
                            {pageNumber}
                        </button>
                    </li>
                ))}
                {currentPage < totalNumberOfPages && (
                    <>
                        <li>
                            <button onClick={() => handlePageChange(currentPage + 1)}>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handlePageChange(totalNumberOfPages)}>
                                <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </>
    );
}