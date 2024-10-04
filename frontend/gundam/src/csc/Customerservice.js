import { Link, useNavigate, useLocation } from 'react-router-dom'; // 라우팅 관련 훅과 컴포넌트를 임포트
import { useState, useEffect } from 'react'; // React의 useState와 useEffect 훅을 임포트
import CscData from "./CscData"; // FAQ 데이터를 임포트
import Csc from './Csc'; // FAQ 항목 컴포넌트를 임포트
import CscMenu from './CscMenu'; // 카테고리 메뉴 컴포넌트를 임포트
import CscLeft from './CscLeft'; // 왼쪽 사이드바 컴포넌트를 임포트
import './Customerservice.css'; // 스타일링을 위한 CSS 파일 임포트
import InquiryWrite from './InquiryWrite'; // 문의 작성 컴포넌트를 임포트 (현재 사용되지 않음)

export default function Customerservice() {
    const [item, setItem] = useState(CscData); // FAQ 데이터를 상태로 관리
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 상태로 관리
    const [paginatedItems, setPaginatedItems] = useState([]); // 현재 페이지에 표시할 항목을 상태로 관리
    const [currentCategory, setCurrentCategory] = useState('ALL'); // 현재 선택된 카테고리를 상태로 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const location = useLocation(); // 현재 URL 정보를 얻기 위한 훅

    const itemsPerPage = 10; // 페이지당 항목 수

    useEffect(() => {
        const query = new URLSearchParams(location.search); // URL의 쿼리 문자열을 파싱
        const page = parseInt(query.get('page')) || 1; // 'page' 파라미터를 가져오고 없으면 1로 설정
        const category = query.get('category') || 'ALL'; // 'category' 파라미터를 가져오고 없으면 'ALL'로 설정
        setCurrentPage(page); // 현재 페이지 설정
        setCurrentCategory(category); // 현재 카테고리 설정

        const filteredData = category === 'ALL' ? CscData : CscData.filter(item => item.classification === category); // 카테고리에 따라 데이터 필터링
        const startIndex = (page - 1) * itemsPerPage; // 시작 인덱스 계산
        const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length); // 종료 인덱스 계산
        setPaginatedItems(filteredData.slice(startIndex, endIndex)); // 현재 페이지의 항목 설정
    }, [location]); // location이 변경될 때마다 실행

    const totalNumberOfPages = Math.ceil(
        (currentCategory === 'ALL' ? CscData : CscData.filter(item => item.classification === currentCategory)).length / itemsPerPage
    ); // 총 페이지 수 계산

    return (
        <section className="cscContainer">
            <CscLeft /> {/* 왼쪽 사이드바 컴포넌트 */}
            <div className="cscMain">
                <h2 className="cscTitle h2Notice">자주묻는질문</h2> {/* 페이지 제목 */}
                <div>
                    <ul className="CscMenu">
                        <CscMenu 
                            menuItem={[...new Set(CscData.map((val) => val.classification))]} // 중복을 제거한 카테고리 리스트
                            setItem={setItem} 
                            currentCategory={currentCategory} 
                            navigate={navigate} 
                        />
                    </ul>
                    <div className="CscListTitle">
                        <div style={{ width: '100px'}}>분류</div>
                        <div style={{ width: '800px'}}>제목</div>
                    </div>
                    <div className="CscList">
                        {paginatedItems.map(item => (
                            <Csc key={item.id} item={item} /> // 각 항목을 Csc 컴포넌트로 렌더링
                        ))}
                    </div>
                    <div className="cscPageNation">
                        {Array.from({ length: totalNumberOfPages }).map((_, index) => (
                            <Link
                                key={index}
                                to={`?page=${index + 1}&category=${currentCategory}`}
                            >
                                {index + 1}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
