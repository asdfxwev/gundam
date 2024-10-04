import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
// import PageSearchParams from './PagiSearchParams'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function PagiNation({itemsPerPage, maxPagesToShow, object, navigation}) {
    const [currentPage, setCurrentPage] = useState(1);
    // const [paginatedItems, setPaginatedItems] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const totalNumberOfPages = Math.ceil(object.length / itemsPerPage);
    
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const page = parseInt(query.get('page')) || 1;
        setCurrentPage(page);
    }, [location]);


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
    // startPage - 1 // Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow
    // startPage + maxPagesToShow // Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1 + maxPagesToShow

    // console.log(object);

    return (
        <>
            <ul className="noticeNumber">
                {currentPage > 1 && (
                    <>
                        <li><NavLink to={`${navigation}1`}><FontAwesomeIcon icon={faAnglesLeft} /></NavLink></li>
                        <li><NavLink to={`${navigation}${currentPage - 1}`}><FontAwesomeIcon icon={faAngleLeft} /></NavLink></li>
                    </>
                )}
                {getPageNumbers().map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={currentPage === pageNumber ? 'selected' : ''}
                    >
                        <NavLink to={`${navigation}${pageNumber}`}>
                            {pageNumber}
                        </NavLink>
                    </li>
                ))}
                {currentPage < totalNumberOfPages && (
                    <>
                        <li><NavLink to={`${navigation}${currentPage + 1}`}><FontAwesomeIcon icon={faAngleRight} /></NavLink></li>
                        <li><NavLink to={`${navigation}${totalNumberOfPages}`}><FontAwesomeIcon icon={faAnglesRight} /></NavLink></li>
                    </>
                )}
            </ul>
        </>
    )
}