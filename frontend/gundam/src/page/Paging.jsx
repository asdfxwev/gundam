import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import './Paging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export default function Paging({ maxpage, currentPage, onPageChange  }) {


    //const [page, setPage] = useState(currentPage);

    const pageNum = [];

    for (let i = 1; i <= maxpage; i++) {
        pageNum.push(i);
    }

    const handlePageClick = (page) => {
        onPageChange(page); // 부모 컴포넌트로 페이지 정보 전달
    };

    return (
        <ul className="paging">
        {currentPage > 1 && (
            <>
                <li><NavLink onClick={() => handlePageClick(1)}><FontAwesomeIcon icon={faAnglesLeft} /></NavLink></li>
                <li><NavLink onClick={() => handlePageClick(currentPage - 1)}><FontAwesomeIcon icon={faAngleLeft} /></NavLink></li>
            </>
        )}
        {pageNum.map((item, i) => (
            <li
                key={i}
                className={currentPage === item ? 'selected' : ''}
            >
                <NavLink onClick={() => handlePageClick(item)}>
                    {item}
                </NavLink>
            </li>
        ))}
        {currentPage < maxpage && (
            <>
                <li><NavLink onClick={() => handlePageClick(currentPage + 1)}><FontAwesomeIcon icon={faAngleRight} /></NavLink></li>
                <li><NavLink onClick={() => handlePageClick(maxpage)}><FontAwesomeIcon icon={faAnglesRight} /></NavLink></li>
            </>
        )}
    </ul>
    )
}