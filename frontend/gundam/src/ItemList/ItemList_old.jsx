import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import './ItemList.css';
import ItemDataBase from './ItemDataBase';
import TuneIcon from '@mui/icons-material/Tune';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Paging from '../page/Paging';
import { apiCall, getStorageData } from '../service/apiService';
import { API_BASE_URL } from "../service/app-config";
import axios from 'axios';
import { Pagination } from '@mui/material';


const ItemList = () => {

    // 총 페이지 개수
    const [pageProduct, setPageProduct] = useState();
    // 현재 페이지 값
    const [page, setPage] = useState(1);
    const [productList, setProductList] = useState(null);
    const [brandList, setBrandList] = useState(null);
    const [cateList, setCateList] = useState(null);
    const [pieceList, setPieceList] = useState(null);
    const [stateList, setStateList] = useState(null);
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [filtersVisible, setFiltersVisible] = useState(true);
    const [itemListClass, setItemListClass] = useState('item-list');
    const [searchResult, setSearchResult] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('전체');
    const [selectedFilters, setSelectedFilters] = useState({
        information: {
            visible: true,
            '세일상품만': false,
            '품절상품 제외': false,
            '예약종료상품 제외': false
        },
        price: {
            visible: true,
            '전체': false,
            '10,000원 미만': false,
            '10,000원 이상 ~ 50,000원 미만': false,
            '50,000원 이상 ~ 100,000원 미만': false,
            '100,000원 이상': false
        },
        brand: {
            visible: true,
            '1/100': false,
            'FG': false,
            'FIGURE-RISE MECHANICS': false,
            'FIGURE-RISE STANDARD': false,
            'FIGURE-RISE': false,
        },
        item: {
            visible: true,
            '건담 무사': false,
            '건담 브레이커 배틀로그': false,
            '기동전사 건담 수성의 마녀': false,
            '기동전사 건담 복수의 레퀴엠': false,
            '신기동전사 건담W': false
        }
    });
    //width에 따른 itemsPerPage 수량 변경 코드 
    // const updateItemsPerPage = () => {
    useEffect(() => {
        const width = window.innerWidth;
        if (width < 560) {
            setItemsPerPage(4);
        } else if (width < 880) {
            setItemsPerPage(8);
        } else if (width < 1360) {
            setItemsPerPage(12);
        } else {
            setItemsPerPage(20);
        }
    })
    // };

    // // updateItemsPerPage resize하는 코드
    // useEffect(() => {
    //     updateItemsPerPage();
    //     window.addEventListener('resize', updateItemsPerPage);
    //     return () => {
    //         window.removeEventListener('resize', updateItemsPerPage);
    //     };
    // }, []);

    // 현재 페이지의 URL을 가져옴
    
    localStorage.setItem('currentUrl', location.pathname);  // 현재 페이지의 URL을 로컬스토리지에 저장


    const toggleFiltersVisible = () => {
        setFiltersVisible(!filtersVisible);
        setItemListClass(filtersVisible ? 'item-list-hidden' : 'item-list');
    };

    const removeFilter = (section, filter) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [section]: {
                ...prevFilters[section],
                [filter]: false
            }
        }));
    };


    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const totalNumberOfPages = Math.ceil(searchResult.length / itemsPerPage);

    const toggleSection = (category) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                visible: !prevFilters[category].visible
            }
        }));
    };

    const resetFilters = () => {
        setSelectedFilters({
            information: {
                visible: true,
                '세일상품만': false,
                '품절상품 제외': false,
                '예약종료상품 제외': false
            },
            price: {
                visible: true,
                '전체': false,
                '10,000원 미만': false,
                '10,000원 이상 ~ 50,000원 미만': false,
                '50,000원 이상 ~ 100,000원 미만': false,
                '100,000원 이상': false
            },
            brand: {
                visible: true,
                '1/100': false,
                'FG': false,
                'FIGURE-RISE MECHANICS': false,
                'FIGURE-RISE STANDARD': false,
                'FIGURE-RISE': false,
                '포켓프라': false,
                '포켓몬프라': false,
            },
            item: {
                visible: true,
                '건담 무사': false,
                '건담 브레이커 배틀로그': false,
                '기동전사 건담 수성의 마녀': false,
                '기동전사 건담 복수의 레퀴엠': false,
                '신기동전사 건담W': false
            }
        });

        setInputValue('');
        setSelectedOption('전체');
        setSearchResult(ItemDataBase);
    };



    const handleCheckboxChange = (section, filter) => {
        if (section === 'price') {
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                [section]: {
                    ...Object.keys(prevFilters[section]).reduce((acc, key) => {
                        if (key === 'visible') {
                            acc[key] = prevFilters[section][key];
                        } else {
                            acc[key] = key === filter ? !prevFilters[section][filter] : false;
                        }
                        return acc;
                    }, {})
                }
            }));
        } else {
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                [section]: {
                    ...prevFilters[section],
                    [filter]: !prevFilters[section][filter]
                }
            }));
        }
    };


    // 검색 후 결과를 필터링하여 보여주는 부분
    useEffect(() => {
        const filteredItems = ItemDataBase.filter(item => {
            let show = true;

            // 정보 필터링
            if (selectedFilters.information['세일상품만'] && item.isOnSale) show = false;
            if (selectedFilters.information['품절상품 제외'] && item.isSoldOut) show = false;
            if (selectedFilters.information['예약종료상품 제외'] && item.isReservationEnd) show = false;

            // 가격대별 필터링
            if (selectedFilters.price['10,000원 미만'] && (item.price >= 10000 || item.price < 0)) show = false;
            if (selectedFilters.price['10,000원 이상 ~ 50,000원 미만'] && (item.price < 10000 || item.price >= 50000)) show = false;
            if (selectedFilters.price['50,000원 이상 ~ 100,000원 미만'] && (item.price < 50000 || item.price >= 100000)) show = false;
            if (selectedFilters.price['100,000원 이상'] && (item.price < 100000 || item.price > 0)) show = false;

            // 브랜드별 필터링
            const brandFilters = ['1/100', 'FG', 'FIGURE-RISE MECHANICS', 'FIGURE-RISE STANDARD', 'FIGURE-RISE', '포켓프라', '포켓몬프라'];
            if (!brandFilters.some(brand => selectedFilters.brand[brand] && item.brand === brand)) {
                if (brandFilters.some(brand => selectedFilters.brand[brand])) show = false;
            }

            // 작품별 필터링
            const itemFilters = ['건담 무사', '건담 브레이커 배틀로그', '기동전사 건담 수성의 마녀', '기동전사 건담 복수의 레퀴엠', '신기동전사 건담W'];
            if (!itemFilters.some(comment => selectedFilters.item[comment] && item.comment === comment)) {
                if (itemFilters.some(comment => selectedFilters.item[comment])) show = false;
            }

            // 태그 필터링
            if (selectedFilters.item[inputValue] && item.tag !== inputValue) show = false;

            return show;
        });

        setSearchResult(filteredItems);
    }, [selectedFilters, inputValue]);


    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedItems(searchResult.slice(startIndex, endIndex));
    }, [currentPage, searchResult]);


    // 페이지가 로드될 때 URL 쿼리 파라미터에서 currentPage 설정
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const page = parseInt(query.get('page')) || 1;
        setCurrentPage(page);
    }, [location.search]);

    // h1창 이름 변경
    const handleSearchChange = (event) => {
        setInputValue(event.target.value);
    }

    // 버튼 클릭시
    // const handleSearchClick = () => {
    //     if (!validateSearchInput(inputValue)) {
    //         alert('존재하지 않는 검색어입니다. 다시 한번 검색어를 확인해 주세요.');
    //         return;
    //     }

    //     const searchResults = ItemDataBase.filter(item => item.tag === inputValue);
    //     setSearchResult(searchResults);
    //     setSelectedOption(inputValue);
    //     setCurrentPage(1);

    //     // 기존 item 필터를 초기화하고 새로운 검색어 필터를 추가
    //     setSelectedFilters(prevFilters => ({
    //         ...prevFilters,
    //         item: {
    //             ...Object.keys(prevFilters.item).reduce((acc, key) => {
    //                 acc[key] = false;
    //                 return acc;
    //             }, {}),
    //             [inputValue]: true
    //         }
    //     }));
    // };

    // 검색창에서 enter 시(keyDown 사용 시 한글로 입력하면 alert가 2번 뜸, 그래서 keyup으로 바꿈, 추가: if (event.isComposing || event.keyCode === 229)return; 이거 추가 시 keydown도 가능)
    const handleKeyup = (event) => {
        if (event.isComposing || event.keyCode === 229) return;
        if (event.key === 'Enter') {
            event.preventDefault();

            //handleSearchClick();
        }
    }



    // 선택된 필터와 검색 결과를 기반으로 아이템을 필터링
    useEffect(() => {
        const filteredItems = searchResult.filter(item => {
            let show = true;
            return show;
        });
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
        const paginatedItems = filteredItems.slice(startIndex, endIndex);
        setPaginatedItems(paginatedItems);
    }, [currentPage, searchResult, itemsPerPage, selectedFilters]);

    const maxPagesToShow = 5;

    useEffect(() => {
        // 비동기 함수 정의
        const fetchData = async () => {
            try {
                // 2.1) axios를 통해 API 호출
                const response = await axios.get(`/product/productList?itemsPerPage=${itemsPerPage}&page=${page}`);
                

                // 2.2) 응답 데이터 출력

                // 2.3) 응답 데이터를 상태 변수에 저장
                setProductList(response.data.productList);
                setBrandList(response.data.brandList);
                setCateList(response.data.cateList);
                setPieceList(response.data.pieceList);
                setStateList(response.data.stateList);
                setPageProduct(response.data.maxpage);

            } catch (error) {
                console.error("데이터를 가져오는 중 에러가 발생했습니다: ", error);
                // 오류 처리 로직 (예: alert 또는 콘솔 출력)
            }
        };
        // 2.4) 비동기 함수 호출
        fetchData();
    }, []);  // 빈 배열을 넣어 첫 렌더링 시에만 호출되도록 설정

    

    // inputValue에 따른 검색
    const onSearchItem = (e) => {
        e.preventDefault();
        let url = `/product/productSearch?productname=${inputValue}`;
        console.log(inputValue);
        apiCall(url, 'GET', null, null)
            .then((response) => {
                alert(`** 서버 API 연결 성공 => ${response.checkData}`);
                setProductList(response);
            }).catch((err) => {
                alert(`** 서버 API 연결 실패 => ${err}`);
            });
    } 








console.log("page = "+page);

    return (
        <div className='item-first'>
            <div className='item-size-200'><h1>{selectedOption}</h1></div>
            <div className='search-bar'>
                <label className='search-bar'>찾는 제품이 있나요?</label>
                <form onSubmit={onSearchItem}>
                    <input name='productname' className='search-bar-input' type="text" placeholder='검색어를 입력해주세요.' value={inputValue} onChange={handleSearchChange} onKeyDown={handleKeyup} />
                    <button className='button-class' ><FontAwesomeIcon icon={faSearch} /></button>
                    {/* <button className='button-class' onClick={handleSearchClick}><FontAwesomeIcon icon={faSearch} /></button> */}
                </form>
                {/* <datalist id='figure-option'>
                    <option value="건프라" />
                    <option value="원피스" />
                    <option value="나루토" />
                    <option value="블리치" />
                    <option value="에반게리온" />
                    <option value="포켓몬" />
                </datalist> */}
            </div>
            <div className='item-size-150' onClick={toggleFiltersVisible}>
                <TuneIcon />{filtersVisible ? '필터 숨기기' : '필터 보이기'}
            </div>
            <div className={itemListClass}>
                <div className={`item-choose`}>
                    {filtersVisible && (
                        <div>
                            <div className='filter-section'>
                                <div className='filter-flex'>
                                    선택된 필터: <button onClick={resetFilters}>초기화</button>
                                </div>
                                <div>
                                    {Object.keys(selectedFilters).map(section => (
                                        <div key={section}>
                                            {Object.keys(selectedFilters[section])
                                                .filter(filter => filter !== 'visible' && selectedFilters[section][filter])
                                                .map(filter => (
                                                    <span key={filter}>
                                                        <button onClick={() => removeFilter(section, filter)}>{filter} x</button>
                                                    </span>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='filter-section'>
                                <h3 onClick={() => toggleSection('item')}>
                                    건담/포켓몬
                                    <span className='toggle-section'>
                                        {selectedFilters.item.visible ? '-' : '+'}
                                    </span>
                                </h3>
                                {cateList && cateList.map((item, i) => (
                                    <div className={`filter-section-content ${selectedFilters.item.visible ? 'visible' : ''}`}>
                                        <div><label><input type='checkbox' checked={selectedFilters.item[`${item.code_name}`]} onChange={() => handleCheckboxChange('item', `${item.code_name}`)}></input>{item.code_name}</label></div>
                                    </div>
                                ))}
                            </div>

                            <div className='filter-section'>
                                <h3 onClick={() => toggleSection('information')}>
                                    상품정보
                                    <span className='toggle-section'>
                                        {selectedFilters.information.visible ? '-' : '+'}
                                    </span>
                                </h3>
                                {stateList && stateList.map((item, i) => (
                                    <div className={`filter-section-content ${selectedFilters.information.visible ? 'visible' : ''}`}>
                                        <div><label><input type="checkbox" checked={selectedFilters.information[`${item.code_id}`]} onChange={() => handleCheckboxChange('information', `${item.code_name}`)} />{item.code_name}</label></div>

                                    </div>
                                ))}
                            </div>
                            {/* <div className='filter-section'>
                                <h3 onClick={() => toggleSection('information')}>
                                    상품정보
                                    <span className='toggle-section'>
                                        {selectedFilters.information.visible ? '-' : '+'}
                                    </span>
                                </h3>
                                <div className={`filter-section-content ${selectedFilters.information.visible ? 'visible' : ''}`}>
                                    <div><label><input type="checkbox" checked={selectedFilters.information['세일상품만']} onChange={() => handleCheckboxChange('information', '세일상품만')} />세일상품만</label></div>
                                    <div><label><input type="checkbox" checked={selectedFilters.information['품절상품 제외']} onChange={() => handleCheckboxChange('information', '품절상품 제외')} />품절상품 제외</label></div>
                                    <div><label><input type="checkbox" checked={selectedFilters.information['예약종료상품 제외']} onChange={() => handleCheckboxChange('information', '예약종료상품 제외')} />예약종료상품 제외</label></div></div>
                            </div> */}
                            <div className='filter-section'>
                                <h3 onClick={() => toggleSection('price')}>
                                    가격대별
                                    <span className='toggle-section'>
                                        {selectedFilters.price.visible ? '-' : '+'}
                                    </span>
                                </h3>
                                <div className={`filter-section-content ${selectedFilters.price.visible ? 'visible' : ''}`}>
                                    <div><label><input type='radio' name='price' checked={selectedFilters.price['전체']} onChange={() => handleCheckboxChange('price', '전체')}></input>전체</label></div>
                                    <div><label><input type='radio' name='price' checked={selectedFilters.price['10,000원 미만']} onChange={() => handleCheckboxChange('price', '10,000원 미만')}></input>10,000원 미만</label></div>
                                    <div><label><input type='radio' name='price' checked={selectedFilters.price['10,000원 이상 ~ 50,000원 미만']} onChange={() => handleCheckboxChange('price', '10,000원 이상 ~ 50,000원 미만')}></input>10,000원 이상 ~ 50,000원 미만</label></div>
                                    <div><label><input type='radio' name='price' checked={selectedFilters.price['50,000원 이상 ~ 100,000원 미만']} onChange={() => handleCheckboxChange('price', '50,000원 이상 ~ 100,000원 미만')}></input>50,000원 이상 ~ 100,000원 미만</label></div>
                                    <div><label><input type='radio' name='price' checked={selectedFilters.price['100,000원 이상']} onChange={() => handleCheckboxChange('price', '100,000원 이상')}></input>100,000원 이상</label></div>
                                </div>
                            </div>
                            <div className='filter-section'>
                                <h3 onClick={() => toggleSection('brand')}>
                                    브랜드별
                                    <span className='toggle-section'>
                                        {selectedFilters.brand.visible ? '-' : '+'}
                                    </span>
                                </h3>
                                {brandList && brandList.map((item, i) => (
                                    <div className={`filter-section-content ${selectedFilters.brand.visible ? 'visible' : ''}`}>
                                        <div><label><input type='checkbox' checked={selectedFilters.brand[`${item.code_name}`]} onChange={() => handleCheckboxChange('brand', `${item.code_name}`)}></input>{item.code_name}</label></div>
                                    </div>
                                ))}
                                {/* <div className={`filter-section-content ${selectedFilters.brand.visible ? 'visible' : ''}`}>
                                    <div><label><input type='checkbox' checked={selectedFilters.brand['1/100']} onChange={() => handleCheckboxChange('brand', '1/100')}></input>1/100</label></div>
                                    <div><label><input type='checkbox' checked={selectedFilters.brand['FG']} onChange={() => handleCheckboxChange('brand', 'FG')}></input>FG</label></div>
                                    <div><label><input type='checkbox' checked={selectedFilters.brand['FIGURE-RISE MECHANICS']} onChange={() => handleCheckboxChange('brand', 'FIGURE-RISE MECHANICS')}></input>FIGURE-RISE MECHANICS</label></div>
                                    <div><label><input type='checkbox' checked={selectedFilters.brand['FIGURE-RISE STANDARD']} onChange={() => handleCheckboxChange('brand', 'FIGURE-RISE STANDARD')}></input>FIGURE-RISE STANDARD</label></div>
                                    <div><label><input type='checkbox' checked={selectedFilters.brand['FIGURE-RISE']} onChange={() => handleCheckboxChange('brand', 'FIGURE-RISE')}></input>FIGURE-RISE</label></div>
                                    <div><label><input type='checkbox' checked={selectedFilters.brand['포켓프라']} onChange={() => handleCheckboxChange('brand', '포켓프라')}></input>포켓프라</label></div>
                                    <div><label><input type='checkbox' checked={selectedFilters.brand['포켓몬프라']} onChange={() => handleCheckboxChange('brand', '포켓몬프라')}></input>포켓몬프라</label></div>
                                </div> */}
                            </div>

                            <div className='filter-section'>
                                <h3 onClick={() => toggleSection('item')}>
                                    작품별
                                    <span className='toggle-section'>
                                        {selectedFilters.item.visible ? '-' : '+'}
                                    </span>
                                </h3>
                                {pieceList && pieceList.map((item, i) => (
                                    <div className={`filter-section-content ${selectedFilters.item.visible ? 'visible' : ''}`}>
                                        <div><label><input type='checkbox' checked={selectedFilters.item[`${item.code_name}`]} onChange={() => handleCheckboxChange('item', `${item.code_name}`)}></input>{item.code_name}</label></div>
                                    </div>
                                ))}
                                {/* <div className={`filter-section-content ${selectedFilters.item.visible ? 'visible' : ''}`}>
                                    <div><label><input type='checkbox' checked={selectedFilters.item['건담 무사']} onChange={() => handleCheckboxChange('item', '건담 무사')}></input>건담 무사</label></div>
                                    <div><label><input type='checkbox' checked={selectedFilters.item['건담 브레이커 배틀로그']} onChange={() => handleCheckboxChange('item', '건담 브레이커 배틀로그')}></input>건담 브레이커 배틀로그</label></div>
                                    <div><label><input type='checkbox' checked={selectedFilters.item['기동전사 건담 수성의 마녀']} onChange={() => handleCheckboxChange('item', '기동전사 건담 수성의 마녀')}></input>기동전사 건담 수성의 마녀</label></div>
                                    <div><label><input type='checkbox' checked={selectedFilters.item['기동전사 건담 복수의 레퀴엠']} onChange={() => handleCheckboxChange('item', '기동전사 건담 복수의 레퀴엠')}></input>기동전사 건담 복수의 레퀴엠</label></div>
                                    <div><label><input type='checkbox' checked={selectedFilters.item['신기동전사 건담W']} onChange={() => handleCheckboxChange('item', '신기동전사 건담W')}></input>신기동전사 건담W</label></div>
                                </div> */}
                            </div>
                        </div>
                    )}
                </div>

                {productList && productList.map((item, i) => (
                    <div className={`item-card `}>
                        <a
                            href={`/ItemList/ItemDetail/${item.pro_id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div>
                                <img src={`${API_BASE_URL}/resources/productImg/${item.pro_id}/${item.pro_imgs}`} alt={item.name} />
                            </div>
                            <div className="item-details">
                                <p className='item_p'>{item.cate_piece}</p>
                                <h2 className='item_name'>{item.pro_name}</h2>
                                <p className='item_p'>{item.pro_price} 원</p>
                                <p className='item_p'>{item.cate_brand}</p>
                            </div>
                        </a>
                        {/* 찜 추가시 추가하기 */}
                        {/* <div className='sx'>
                            <button className='button-shopping' onClick={() => addToCart(item)}>
                                <ShoppingCartIcon className="shopping-cart-icon" style={{ color: isAdded ? 'red' : 'inherit' }} />
                            </button>
                        </div> */}
                    </div>

                ))}
                {/* {paginatedItems.map((item, index) => (
                    <ItemCard key={index} item={item} />
                ))} */}
            </div>
            {/* 페이지 네이션 */}
            <div className='pagination-container'>
                <div className='pagination'>
                    {/* {Array.from({ length: totalNumberOfPages }).map((_, index) => (
                        <Link
                            key={index}
                            to={`/ItemList?page=${index + 1}`}
                            className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageClick(index + 1)}
                        >
                            {index + 1}
                        </Link>
                    ))} */}
                    {/* <PagiNation maxPagesToShow={maxPagesToShow} itemsPerPage={itemsPerPage} object={searchResult} navigation='/ItemList?page=' /> */}
                    {<Paging maxpage = {pageProduct} currentPage={page} />}
                </div>
            </div>
        </div>
    );
};

export default ItemList;