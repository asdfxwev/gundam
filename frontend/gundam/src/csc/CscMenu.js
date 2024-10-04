import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 임포트
import CscData from "./CscData"; // FAQ 데이터를 임포트
import { useNavigate, useLocation } from 'react-router-dom';


export default function CscMenu({ setItem, menuItem, currentCategory, navigate }) {


    const location = useLocation();  // 현재 페이지의 URL을 가져옴
    const handleCategoryClick = (category) => {
        setItem(category === 'ALL' ? CscData : CscData.filter(item => item.classification === category)); // 카테고리에 따라 데이터 필터링
        navigate(`?page=1&category=${category}`); // 선택된 카테고리에 따라 페이지를 1로 설정하고 URL을 업데이트
    };
    console.log('location.pathname=' + location.pathname);  // 현재 페이지의 URL을 출력 location.pathname=/ItemList/ItemDetail/1
    localStorage.setItem('currentUrl', location.pathname);  // 현재 페이지의 URL을 로컬스토리지에 저장


    return (
        <>
            <li className={currentCategory === 'ALL' ? 'cscSelect' : ''} onClick={() => handleCategoryClick('ALL')}>
                <Link to={`?page=1&category=ALL`}>ALL</Link> {/* 'ALL' 카테고리로 이동하는 링크 */}
            </li>
            {menuItem.map((item, i) => (
                <li key={i} className={currentCategory === item ? 'cscSelect' : ''} onClick={() => handleCategoryClick(item)}>
                    <Link to={`?page=1&category=${item}`}>
                        {item}
                    </Link> {/* 각 카테고리로 이동하는 링크 */}
                </li>
            ))}
        </>
    )
}
