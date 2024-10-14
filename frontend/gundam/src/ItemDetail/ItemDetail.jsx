import React, { useState, useEffect } from 'react';
import './ItemDetail.css';
import SectionImg from './SectionImg';
import ItemReview from './ItemReview';
import ItemQna from './ItemQna';
import ItemService from './ItemService';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import TopBtn from '../header/topBtn.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useLogin } from '../Login/LoginStatus';
import { apiCall } from '../service/apiService';
import { API_BASE_URL } from "../service/app-config";

export default function ItemDetail() {
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);
    const [productList, setProductList] = useState(null);
    const [imgList, setImgList] = useState([]);
    const { loginInfo, isLoggedIn, onLogout } = useLogin();
    const [totalprice, setTotalPrice] = useState(0);
    const [mainImage, setMainImage] = useState(null);
    const [count, setCount] = useState(1);
    const location = useLocation();
    const { id } = useParams();
    const [reviewList, setReviewList] = useState([]);
    const [user_id, setUser_id] = useState(''); // token 값으로 select한 user_id정보
    const [userInfo, setUserInfo] = useState(''); // user_id값으로 user 정보 get
    const proId = location.pathname.split('/').pop();

    // const existingInquiries = JSON.parse(sessionStorage.getItem('loginInfo'));
    // const userId = existingInquiries ? existingInquiries.user_id : null;

    const handleImageClick = (src) => {
        setMainImage(src);
    };

    useEffect(() => {
        if (productList) {
            setTotalPrice(count * productList.pro_price);
        }
    }, [count, productList]);

    const formatNumber = (number) => {
        return number.toLocaleString('ko-KR');
    };

    const minus = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        } else {
            alert(`수량은 1개 이상 선택 가능합니다.`);
        }
    };

    const plus = () => {
        setCount(prevCount => prevCount + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = { proId };
                const response = await axios.get(`${API_BASE_URL}/product/productDetail`, { params });
                const { productList, imgList, reviewList } = response.data;
                setProductList(productList);
                setImgList(imgList);
                setReviewList(reviewList);
                const defaultImage = imgList.find(item => item.pro_num === 0);
                if (defaultImage) {
                    setMainImage(`${API_BASE_URL}/resources/productImg/${proId}/${defaultImage.pro_imgs}`);
                }
                setTotalPrice(productList.pro_price);
            } catch (error) {
                console.error("데이터를 가져오는 중 에러가 발생했습니다: ", error);
            }
        };
        fetchData();
    }, [proId]);

    // const user_id = JSON.parse(sessionStorage.getItem('userId')).user_id;
    // 최초 로드 시 로그인true면 토큰값으로 user정보 가져와야하는 부분
    useEffect(() => {
        if (isLoggedIn) {
            let url = `/user/token_info`;

            const response = apiCall(url, 'POST', null, loginInfo)
                .then((response) => {
                    // sessionStorage.setItem("userId", JSON.stringify(response));  // 세션에 로그인 정보 저장
                    setUser_id(response);

                }).catch((err) => {
                    onLogout(); // 로그아웃 상태로 처리
                    alert("사용자 정보를 찾을수 없습니다. 다시 로그인 하세요.");
                });
        }

    }, [isLoggedIn, loginInfo, onLogout]);

    useEffect(() => {
        if (user_id && user_id.length > 0) {
            let url = `/user/user_info`;

            const data = { user_id: user_id };
            
            const response = apiCall(url, 'POST', data, null)
                .then((response) => {
                    // sessionStorage.setItem("userInfo", JSON.stringify(response));  // 세션에 로그인 정보 저장
                    setUserInfo(response);
                });
        }
    }, [user_id]); // user_id 값이 변경될 때 실행되도록 설정

    const handleBuyClick = (e) => {
        if (isLoggedIn) {
            e.preventDefault();
            console.log('productList:', productList, 'imgList:', imgList, 'count:', count);
            navigate('/ItemBuy', { state: { item: productList, imgList, count } });
        } else {
            navigate('/Login');
        }
    };
    
    const toCart = async (e) => {
        if (isLoggedIn) {
            e.preventDefault();

            const quantity = Number(count);
            if (isNaN(quantity) || quantity <= 0) {
                alert('수량을 올바르게 입력해 주세요.');
                return;
            }

            if (!user_id) {
                alert('로그인 정보가 없습니다.');
                navigate('/Login');
                return;
            }

            const cartData = {
                user_id,
                pro_id: proId,
                cart_quantity: quantity,
            };

            try {
                const response = await axios.post(`${API_BASE_URL}/cart`, cartData);
                if (response.status >= 200 && response.status < 300) {
                    alert('장바구니에 추가되었습니다.');
                    setIsAdded(true);
                    navigate('/cart');
                } else {
                    console.error('장바구니 추가 실패: ', response.data);
                    alert('장바구니 추가 실패, 다시 시도해주세요');
                }
            } catch (error) {
                console.error('장바구니 추가 실패: ', error.response ? error.response.data : error.message);
                alert('오류가 발생, 다시 시도해주세요.');
            }
        }
    };
    console.log("imgList = " +imgList);
    console.log("productList = " +productList);
    console.log("reviewList = " +reviewList);


    return (
        <div className="item_detail_main">
            <div className='detail_left_box'>
                <div className='detail_img'>
                    {mainImage && (
                        <img
                            className="item_detail_img"
                            src={mainImage}
                            alt="main_img"
                        />
                    )}
                </div>
                <div className='detail_img_list'>
                    {imgList && imgList.map((item, i) => (
                        <div className='detail_img' key={i}>
                            <img
                                className="detail_slide_img"
                                src={`${API_BASE_URL}/resources/productImg/${item.pro_id.pro_id}/${item.pro_imgs}`}
                                alt="sub_img"
                                onClick={() => handleImageClick(`${API_BASE_URL}/resources/productImg/${item.pro_id.pro_id}/${item.pro_imgs}`)}
                            />
                        </div>
                    ))}
                </div>

                <h2 id="DETAIL">상품 상세</h2>
                <div className="tab">
                    <div className="tab_inner">
                        <a href="#DETAIL">상세보기</a>
                        <a href="#REVIEW_TAB">상품리뷰</a>
                        <a href="#QNA">Q&amp;A</a>
                        <a href="#SERVICE">배송/교환/반품</a>
                    </div>
                </div>
                <div className='media_show_hide'>
                    {productList && (
                        <div className='detail_item_subname'>{productList.pro_name}</div>
                    )}
                    <div className='count_right_box'>
                        <button onClick={minus}>-</button>
                        <div className='count_num'>{count}</div>
                        <button onClick={plus}>+</button>
                    </div>
                    {productList && (
                        <div className='total_price'>총금액 : {formatNumber(totalprice)} 원</div>
                    )}
                </div>

                <div className="section_img">
                    {productList && (
                        <div className='detail_item_name'>{productList.pro_name}</div>
                    )}
                    {productList && (
                        <SectionImg imgList={imgList} productList={productList} />
                    )}
                    {productList && (
                        <ItemReview key={productList.pro_id} item={productList} pro_id={proId} reviewList = {reviewList} />
                    )}
                    {productList && (
                        <ItemQna key={productList.pro_id} item={productList} />
                    )}
                    <ItemService />
                </div>
            </div>
            <div className='detail_right_box'>
                <div className='right_inner'>
                    <div className='detail_top'>
                        <FontAwesomeIcon icon={faCartShopping} onClick={toCart} className='detail_cart' style={{ color: isAdded ? 'red' : 'inherit' }} />
                    </div>
                    {productList && (
                        <div className='item_name'><h2>{productList.pro_name}</h2></div>
                    )}
                    {productList && (
                        <div className='underline'><span className='item_price'>{formatNumber(productList.pro_price)}</span>원</div>
                    )}
                    <div className='item_info underline'>
                        <div className='info_left_box font_medium'>상품정보</div>
                        <div className='info_right_box'>
                            {productList && (
                                <p className='info_comment'>- {productList.cate_piece}</p>
                            )}
                            {productList && (
                                <p>{productList.pro_des}</p>
                            )}
                        </div>
                    </div>
                    <div className='item_count underline'>
                        <div className='count_left_box font_medium'>구매수량</div>
                        <div className='count_right_box'>
                            <button onClick={minus}>-</button>
                            <div className='count_num'>{count}</div>
                            <button onClick={plus}>+</button>
                        </div>
                    </div>
                    <div className='item_total_price font_medium'>
                        <p className='total_price_title'>총금액</p>
                        <p className='total_price'><span className='t_price'>{formatNumber(totalprice)}</span>원</p>
                    </div>
                    <div className='item_btn'>
                        <button type='button' style={{ cursor: 'pointer' }} className='submit_btn' onClick={handleBuyClick}>구매하기</button>
                    </div>
                    <TopBtn />
                </div>
            </div>
        </div>
    );
}
