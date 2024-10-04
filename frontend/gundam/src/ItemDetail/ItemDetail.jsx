import React, { useState, useEffect } from 'react';
import './ItemDetail.css';
import ItemDataBase from '../ItemList/ItemDataBase';
import SectionImg from './SectionImg';
import ItemReview from './ItemReview';
import ItemQna from './ItemQna';
import ItemService from './ItemService';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import TopBtn from '../header/topBtn.js';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { apiCall } from '../service/apiService';
import { API_BASE_URL } from "../service/app-config";

export default function ItemDetail() {
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);
    const [productList, setProductList] = useState(null);
    const [imgList, setImgList] = useState(null);
    const [totalprice, setTotalPrice] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [count, setCount] = useState(1);

    const location = useLocation();  // 현재 페이지의 URL을 가져옴

    const { id } = useParams();
    const proId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    //console.log(proId);


    // useEffect(() => {
    //     let url = `/product/productDetail?proId=${proId}`;
    //     console.log(proId);
    //     apiCall(url, 'GET', null, null)
    //         .then((response) => {
    //             alert(`** 서버 API 연결 성공 => ${response.checkData}`);
    //             console.log("response = " + response);
    //             setProductList(response.data.productList);
    //             setImgList(response.data.imgList);
    //         }).catch((err) => {
    //             alert(`** 서버 API 연결 실패 => ${err}`);
    //         });
    // }, [])











    //const [mainImage, setMainImage] = useState(`${API_BASE_URL}/resources/productImg ${imgList.pro_id.pro_id}/${imgList.pro_imgs}`);
    const handleImageClick = (src) => {
        setMainImage(src);
    }


    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };





    // const [reviewCount, setReviewCount] = useState(0);  // 리뷰 개수를 저장하는 상태 변수

    useEffect(() => {
        {
            productList &&
                setTotalPrice(count * productList.pro_price);
        }
    }, [count]);
    console.log("count = " + count);
    console.log("totalPrice = " + totalprice);

    const minus = () => {
        if (count > 1) {
            setCount(e => e - 1);
        } else {
            alert(`수량은 1개 이상 선택 가능합니다.`);
        }
    };

    const plus = () => {
        setCount(e => e + 1);
    };

    const formatNumber = (number) => {
        return number.toLocaleString('ko-KR');
    };

    const existingInquiries = JSON.parse(sessionStorage.getItem('loginInfo'));

    // const toCart = async (e) => {
    //     e.preventDefault();

    //     if (existingInquiries) {
    //         const userId = existingInquiries.id; // Assuming the user ID is stored here
    //         try {
    //             const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    //             const userData = userResponse.data;


    //             if (userData.cart.some(e => e.id === selectedItem.id)) {
    //                 // alert('이미장바구니에 담겨있지요')
    //                 setIsAdded(false)

    //                 try {
    //                     const updatedCart = userData.cart.filter(e => e.id !== selectedItem.id)
    //                     await axios.put(`http://localhost:3001/users/${userId}`, { ...userData, cart: updatedCart })
    //                 } catch (error) {
    //                     console.error('Error deleting inquiry:', error.response ? error.response.data : error.message);
    //                 }

    //             } else {

    //                 const cart = { ...selectedItem, quantity: count, isChecked: true };

    //                 console.log(isAdded);

    //                 userData.cart = userData.cart ? [...userData.cart, cart] : [cart];

    //                 await axios.put(`http://localhost:3001/users/${userId}`, userData);
    //                 setIsAdded(true);

    //                 if (window.confirm('장바구니로 갈래?')) {
    //                     navigate('/Cart');
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error:', error.response ? error.response.data : error.message);
    //         }
    //     }
    //     else {
    //         navigate('/Login')
    //     }
    // }

    // useEffect(() => {
    //     if (existingInquiries) {
    //         const userId = existingInquiries.id;
    //         const checkIfAdded = async () => {
    //             try {
    //                 const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    //                 const userData = userResponse.data;

    //                 if (userData.cart) {
    //                     const existingItemIndex = userData.cart.findIndex(cartItem => cartItem.id === selectedItem.id);
    //                     if (existingItemIndex >= 0) {
    //                         setIsAdded(true);
    //                     }
    //                 }
    //             } catch (error) {
    //                 console.error('Error:', error.response ? error.response.data : error.message);
    //             }
    //         };

    //         checkIfAdded();
    //     }
    // }, [existingInquiries, selectedItem.id]);








    useEffect(() => {
        // 비동기 함수 정의
        const fetchData = async () => {
            try {
                // 2.1) axios를 통해 API 호출
                const params = {
                    proId
                };
                const response = await axios.get(`/product/productDetail`, { params });

                // 2.2) 응답 데이터를 상태 변수에 저장
                const { productList, imgList } = response.data;  // 구조 분해 할당
                setProductList(productList);
                setImgList(imgList);

                const defaultImage = imgList.find(item => item.pro_num === 0);
                if (defaultImage) {
                    setMainImage(`${API_BASE_URL}/resources/productImg/${proId}/${defaultImage.pro_imgs}`);
                }
                setTotalPrice(productList.pro_price);
            } catch (error) {
                console.error("데이터를 가져오는 중 에러가 발생했습니다: ", error);
                // 오류 처리 로직 (예: alert 또는 콘솔 출력)
            }
        };
        // 2.4) 비동기 함수 호출
        fetchData();
    }, []);  // 빈 배열을 넣어 첫 렌더링 시에만 호출되도록 설정



    const handleBuyClick = (e) => {
        if (existingInquiries) {
            e.preventDefault();
            navigate('/ItemBuy', { state: { item: productList, imgList, count: count } });
        } else {
            navigate('/Login')
        }
    }

    const toCart = () => {
        
    }





    return (
        <div className="item_detail_main">
            <div className='detail_left_box'>
                <div className='detail_img' >
                    {/* {imgList && imgList.map((item, i) => (
                        <>
                            {item.pro_num === 0 ?
                                <img
                                    className="item_detail_img"
                                    src={`${API_BASE_URL}/resources/productImg/${item.pro_id.pro_id}/${item.pro_imgs}`}
                                    alt="main_img"
                                    
                                /> :
                                <span />
                            }
                        </>
                    ))} */}
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
                        <a href="#DETAIL" >상세보기</a>
                        <a href="#REVIEW_TAB" >상품리뷰</a>
                        <a href="#QNA" >Q&amp;A</a>
                        <a href="#SERVICE" >배송/교환/반품</a>
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
                    {
                        productList &&
                        <div className='total_price'>총금액 : {productList.pro_price} 원</div>
                    }
                    {/* <button type='button' style={{ cursor: 'pointer' }} className='submit_btn' onClick={handleBuyClick}>구매하기</button> */}
                </div>

                <div className="section_img">
                    {/* <div className='detail_item_name'>{productList.name}</div> */}
                    {productList && (
                        <div className='detail_item_name'>{productList.pro_name}</div>
                    )}
                    {
                        productList &&
                        <SectionImg imgList={imgList} productList={productList} />

                    }
                    {productList &&
                        <ItemReview key={productList.pro_id} item={productList} />
                    }
                    {productList &&
                        <ItemQna key={productList.pro_id} item={productList} />
                    }
                    <ItemService />

                </div>

            </div>
            <div className='detail_right_box'>
                <div className='right_inner'>
                    <div className='detail_top'>
                        <FontAwesomeIcon icon={faCartShopping} onClick={toCart} className='detail_cart' style={{ color: isAdded ? 'red' : 'inherit' }} />
                        {/* toCart 에 data 넘기는 역활 해야함 */}
                    </div>
                    {productList &&
                        <div className='item_name'><h2>{productList.pro_name}</h2></div>
                    }
                    {
                        productList &&
                        <div className='underline'><span className='item_price'>{(productList.pro_price)}</span>원</div>
                    }
                    <div className='item_info underline'>
                        <div className='info_left_box font_medium'>상품정보</div>
                        <div className='info_right_box'>
                            {productList &&
                                <p className='info_comment'>- {productList.cate_piece}</p>
                            }
                            {productList &&
                                <p>{productList.pro_des}</p>
                            }
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
                        <p className='total_price_title '>총금액</p>
                        <p className='total_price'><span className='t_price'>{totalprice}</span>원</p>
                    </div>
                    <div className='item_btn'>
                        <button type='button' style={{ cursor: 'pointer' }} className='submit_btn' onClick={handleBuyClick}>구매하기</button>
                    </div>
                    <TopBtn />
                </div>
            </div>
        </div>
    )
}