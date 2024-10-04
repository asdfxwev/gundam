import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';


export default function PageSearchParams() {
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const page = parseInt(query.get('page')) || 1;
        setCurrentPage(page);
    }, [location]);
}