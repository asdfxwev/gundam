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
import { Pagination, checkboxClasses } from '@mui/material';
import qs from 'qs';
import { debounce } from 'lodash';


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
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [filtersVisible, setFiltersVisible] = useState(true);
    const [itemListClass, setItemListClass] = useState('item-list');
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('전체');
    const [width, setWidth] = useState(window.innerWidth);
    const [proCate, setProCate] = useState([]);
    const [cateBrand, setcateBrand] = useState([]);
    const [catePiece, setcatePiece] = useState([]);
    const [proStateCd, setProStateCd] = useState([]);
    const [price, setPrice] = useState(0);
    const maxPagesToShow = 10;

    useEffect(() => {
        const updateItemsPerPage = () => {
            const newWidth = window.innerWidth;
    
            let newItemsPerPage;
            if (newWidth < 560) {
                newItemsPerPage = 4;
            } else if (newWidth < 880) {
                newItemsPerPage = 8;
            } else if (newWidth < 1360) {
                newItemsPerPage = 12;
            } else {
                newItemsPerPage = 20;
            }
    
            // itemsPerPage가 변경된 경우에만 업데이트
            if (newItemsPerPage !== itemsPerPage) {
                setItemsPerPage(newItemsPerPage);
            }
        };
    
        // 디바운스를 통해 300ms 단위로 업데이트
        const debouncedUpdateItemsPerPage = debounce(updateItemsPerPage, 300);
    
        window.addEventListener('resize', debouncedUpdateItemsPerPage);
    
        // 초기 호출
        updateItemsPerPage();
    
        // cleanup: 컴포넌트가 언마운트될 때 이벤트 리스너와 디바운스 클리어
        return () => {
            window.removeEventListener('resize', debouncedUpdateItemsPerPage);
            debouncedUpdateItemsPerPage.cancel();  // 디바운스 클리어
        };
    }, [itemsPerPage]);

    // 필터 숨기기
    const toggleFiltersVisible = () => {
        setFiltersVisible(!filtersVisible);
        setItemListClass(filtersVisible ? 'item-list-hidden' : 'item-list');
    };

    const handleProCateChange = (name) => {
        setProCate(prevCheckbox => {
            // 이미 체크된 항목이라면 배열에서 제거하고, 체크되지 않은 항목이라면 배열에 추가
            if (prevCheckbox.includes(name)) {
                return prevCheckbox.filter(item => item !== name);
            } else {
                return [...prevCheckbox, name];
            }
        });
    }

    const handleCateBrandChange = (name) => {
        setcateBrand(prevCheckbox => {
            // 이미 체크된 항목이라면 배열에서 제거하고, 체크되지 않은 항목이라면 배열에 추가
            if (prevCheckbox.includes(name)) {
                return prevCheckbox.filter(item => item !== name);
            } else {
                return [...prevCheckbox, name];
            }
        });
    }

    const handleCatePieceChange = (name) => {
        setcatePiece(prevCheckbox => {
            // 이미 체크된 항목이라면 배열에서 제거하고, 체크되지 않은 항목이라면 배열에 추가
            if (prevCheckbox.includes(name)) {
                return prevCheckbox.filter(item => item !== name);
            } else {
                return [...prevCheckbox, name];
            }
        });
    }

    const handleProStateCdChange  = (name) => {
        setProStateCd(prevCheckbox => {
            // 이미 체크된 항목이라면 배열에서 제거하고, 체크되지 않은 항목이라면 배열에 추가
            if (prevCheckbox.includes(name)) {
                return prevCheckbox.filter(item => item !== name);
            } else {
                return [...prevCheckbox, name];
            }
        });
    }

    const handlePriceChange = (name) => {
        setPrice(name);
    }


    // h1창 이름 변경
    const handleSearchChange = (event) => {
        setInputValue(event.target.value);
    }

    // 검색창에서 enter 시(keyDown 사용 시 한글로 입력하면 alert가 2번 뜸, 그래서 keyup으로 바꿈, 추가: if (event.isComposing || event.keyCode === 229)return; 이거 추가 시 keydown도 가능)
    const handleKeyup = (event) => {
        if (event.isComposing || event.keyCode === 229) return;
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    console.log(itemsPerPage);
    useEffect(() => {
        // 비동기 함수 정의
        const fetchData = async () => {
            try {
                // 2.1) axios를 통해 API 호출
                const params = {
                    itemsPerPage,
                    currentPage,
                    inputValue,
                    proCate: proCate.length > 0 ? proCate : undefined,
                    cateBrand: cateBrand.length > 0 ? cateBrand : undefined,
                    catePiece: catePiece.length > 0 ? catePiece : undefined,
                    proStateCd: proStateCd.length > 0 ? proStateCd : undefined,
                    price
                };

                // Axios 인스턴스를 생성하여 paramsSerializer 설정
                const axiosInstance = axios.create({
                    paramsSerializer: (params) => {
                        return qs.stringify(params, { arrayFormat: 'brackets' });
                    },
                });
                console.log(params);
                const response = await axiosInstance.get(`/product/productList`, { params });
                //const response = await axios.post(`/product/productList`, params );
                //const response = await apiCall(`/product/productList`,'POST', params ,null);


                // 2.2) 응답 데이터를 상태 변수에 저장
                console.log("response.data = "+response.data);
                setProductList(response.data.productList);
                setBrandList(response.data.brandList);
                setCateList(response.data.cateList);
                setPieceList(response.data.pieceList);
                setStateList(response.data.stateList);
                setPageProduct(response.data.maxpage);

            } catch (error) {
                console.error("데이터를 가져오는 중 에러가 발생했습니다: ", error);
            }
        };
        // 2.4) 비동기 함수 호출
        fetchData();
    }, [currentPage, itemsPerPage, proCate, inputValue, cateBrand, catePiece, proStateCd, price, width]);  


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };





    return (
        <div className='item-first'>
            <div className='item-size-200'><h1>{selectedOption}</h1></div>
            <div className='search-bar'>
                <label className='search-bar'>찾는 제품이 있나요?</label>
                <input name='productname' className='search-bar-input' type="text" placeholder='검색어를 입력해주세요.' value={inputValue} onChange={handleSearchChange} onKeyDown={handleKeyup} />

            </div>
            <div className='item-size-150' onClick={toggleFiltersVisible}>
                <TuneIcon />{filtersVisible ? '필터 숨기기' : '필터 보이기'}
            </div>
            <div className={itemListClass}>
                <div className={`item-choose`}>
                    {filtersVisible && (
                        <div>


                            <div className='filter-section'>
                                <h3 >
                                    건담/포켓몬
                                </h3>
                                {cateList && cateList.map((item, i) => (
                                    <div key={item.code_id}>
                                        <label>
                                            <input type='checkbox' onChange={() => handleProCateChange(item.code_id)} />
                                            {item.code_name}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className='filter-section'>
                                <h3 >
                                    상품정보
                                </h3>
                                {stateList && stateList
                                    .filter(item => item.code_name === "품절")
                                    .map((item, i) => (
                                        <div key={item.code_id}>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    onChange={() => handleProStateCdChange(item.code_id)}
                                                />
                                                {item.code_name} 제외
                                            </label>
                                        </div>
                                    ))
                                }

                            </div>
                            <div className='filter-section'>
                                <h3 >
                                    가격대별
                                </h3>
                                <div>
                                    <label>
                                        <input type='radio' name='price' onChange={() => handlePriceChange(1)} /> 전체
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type='radio' name='price' onChange={() => handlePriceChange(2)}/> 10,000원 미만
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type='radio' name='price' onChange={() => handlePriceChange(3)}/> 10,000원 이상 ~ 50,000원 미만
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type='radio' name='price' onChange={() => handlePriceChange(4)}/> 50,000원 이상 ~ 100,000원 미만
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type='radio' name='price' onChange={() => handlePriceChange(5)}/> 100,000원 이상
                                    </label>
                                </div>

                            </div>
                            <div className='filter-section'>
                                <h3 >
                                    브랜드별
                                </h3>
                                {brandList && brandList.map((item, i) => (
                                    <div key={item.code_id}>
                                        <label>
                                            <input type='checkbox' onChange={() => handleCateBrandChange(item.code_id)} />
                                            {item.code_name}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className='filter-section'>
                                <h3 >
                                    작품별
                                </h3>
                                {pieceList && pieceList.map((item, i) => (
                                    <div key={item.code_id}>
                                        <label>
                                            <input type='checkbox' onChange={() => handleCatePieceChange(item.code_id)} />
                                            {item.code_name}
                                        </label>
                                    </div>
                                ))}
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
                    </div>
                ))}
            </div>
            <div className='pagination-container'>
                <div className='pagination'>
                    {<Paging maxpage={pageProduct} currentPage={currentPage} onPageChange={handlePageChange} maxPagesToShow={maxPagesToShow} />}
                </div>
            </div>
        </div>
    );
};

export default ItemList;