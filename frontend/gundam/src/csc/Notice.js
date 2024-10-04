// 필요한 라이브러리와 컴포넌트를 임포트합니다.
import NoticeData from "./NoticeData";
import { NavLink, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Notice.css';
import NoticeDelivery from "./NoticeDelivery";
import CscLeft from "./CscLeft";
import PagiNation from './PagiNation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// 공지사항 컴포넌트를 정의합니다.
export default function Notice() {
    // 상태 변수를 선언합니다.
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [filteredItems, setFilteredItems] = useState(NoticeData); // 필터링된 항목들
    const [paginatedItems, setPaginatedItems] = useState([]); // 현재 페이지에 표시할 항목들
    const [content, setContent] = useState(''); // 검색어
    const location = useLocation(); // 현재 URL 정보를 가져오기 위한 훅
    const navigate = useNavigate();

    const itemsPerPage = 10; // 페이지 당 항목 수
    const maxPagesToShow = 10; // 한 번에 표시할 페이지 번호 수

    // 검색어 변경 시 호출되는 함수입니다.
    const onNoticeChange = (e) => {
        const searchContent = e.target.value;
        setContent(searchContent);

        const filtered = NoticeData.filter(item =>
            item.title.toLowerCase().includes(searchContent.toLowerCase())
        );
        setFilteredItems(filtered);
        // setCurrentPage(1);
        Navigate('Notice?page=1')
    };

    // Enter 키를 누를 때 검색을 수행합니다.
    const onNoticeKeyDown = (e) => {
        if (e.keyCode === 13) {
            onNoticeSubmit(e);
        }
    };

    // 검색 폼 제출 시 호출되는 함수입니다.
    const onNoticeSubmit = (e) => {
        e.preventDefault();
        onNoticeChange({ target: { value: content } });
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
        setPaginatedItems(filteredItems.slice(startIndex, endIndex));
    }, [currentPage, filteredItems]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const page = parseInt(query.get('page')) || 1;
        setCurrentPage(page);
    }, [location]);


    return (
        <section className="cscNoticeContiner">
            <CscLeft />
            <div className="cscNoticeMain">
                <h2 className="h2Notice">공지사항</h2>
                <form className="noticeForm" onSubmit={onNoticeSubmit}>
                    <input type="text" value={content} onChange={onNoticeChange} onKeyDown={onNoticeKeyDown} />
                    <button type="submit">검색<FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </form>
                <div style={{ height: '50px' }} className="noticeTitleGrid">
                    <div style={{ width: '220px' }}>분류</div>
                    <div style={{ width: '1100px' }}>제목</div>
                    <div style={{ width: '220px' }}>날짜</div>
                </div>
                <NoticeDelivery paginatedItems={paginatedItems} />
                <PagiNation maxPagesToShow={maxPagesToShow} itemsPerPage={itemsPerPage} object={filteredItems} navigation='/Notice?page=' />
            </div>
        </section>
    );
}
