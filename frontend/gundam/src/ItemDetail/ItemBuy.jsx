import React, { useState, useEffect, useRef } from 'react';
import './ItemDetail.css';
import ItemBuyCartList from './ItemBuyCartList';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from "../service/app-config";

const ItemBuy = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { item, count } = location.state || {};
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [showUser, setShowUser] = useState(true);
    const [checkedTrueItems, setCheckedTrueItems] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryUser, setDeliveryUser] = useState('');
    const [deliveryPhone, setDeliveryPhone] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const loginId = JSON.parse(sessionStorage.getItem('loginInfo')).user_id;
    const addressKakaoRef = useRef(null);

    const formatNumber = (number) => number.toLocaleString('ko-KR');

    useEffect(() => {
        if (item && count) {
            const initialTotal = item.price * count;
            setTotal(initialTotal);
            setTotalQuantity(count);
        }
    }, [item, count]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/cart/user/${loginId}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error('사용자 정보 로드 중 오류 발생:', error);
            }
        };

        fetchUserDetails();
    }, [loginId]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

        script.onload = () => {
            if (addressKakaoRef.current) {
                addressKakaoRef.current.addEventListener("click", () => {
                    new window.daum.Postcode({
                        oncomplete: (data) => {
                            setDeliveryAddress(data.address);
                        }
                    }).open();
                });
            }
        };

        document.body.appendChild(script);

        return () => {
            if (addressKakaoRef.current) {
                addressKakaoRef.current.removeEventListener("click", () => { });
            }
            document.body.removeChild(script);
        };
    }, [showUser]);

    const deliveryChange = () => {
        setShowUser(prev => !prev);
    };

    const handleSaveDeliveryInfo = () => {
        if (!deliveryUser || !deliveryPhone || !deliveryAddress) {
            alert('모든 배송 정보를 입력해주세요.');
            return;
        }
        setUserDetails(prevDetails => ({
            ...prevDetails,
            user_name: deliveryUser,
            phone_num: deliveryPhone,
            address: deliveryAddress,
        }));
        alert('배송 정보가 저장되었습니다.');
    };

    const handleOrder = async () => {
        // 배송 정보가 없으면 경고
        if (!showUser && (!deliveryUser || !deliveryPhone || !deliveryAddress)) {
            alert('배송 정보를 입력해주세요.');
            return;
        }

        try {
            const today = new Date();
            const year = today.getFullYear().toString().slice(-2); // 마지막 두 자리 연도
            const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (1~12)
            const day = String(today.getDate()).padStart(2, '0'); // 일 (1~31)
            const formattedDate = `${year}${month}${day}`; // yyMMdd 형식
            console.log('formattedDate : ', formattedDate);
            const orderCountResponse = await axios.get(`${API_BASE_URL}/cart/${loginId}`);
            const orderCount = orderCountResponse.data.length;
            const order_id = `${formattedDate}${loginId}${String(orderCount + 1).padStart(4, '0')}`;
            console.log('order_id : ', order_id);
            console.log('userDetails : ', userDetails);
            const itemsToBuyFromCart = (await axios.get(`${API_BASE_URL}/cart/${loginId}`)).data;
            console.log('itemcart : ',itemsToBuyFromCart);
            const itemDetailToBuy = item ? {
                ...item,
                quantity: count,
                pro_id: item.pro_id,
                order_id: order_id
            } : null;
            console.log('itemdetailtobuy :',itemDetailToBuy);
            
            const allItemsToBuy = itemDetailToBuy ? [...itemsToBuyFromCart, itemDetailToBuy] : itemsToBuyFromCart;

            const stockCheckPromises = allItemsToBuy.map(async (item) => {
                const productResponse = await axios.get(`${API_BASE_URL}/products/${item.pro_id}`);
                return {
                    pro_id: item.pro_id,
                    stock: productResponse.data.pro_stock,
                    quantity: item.quantity
                };
            });

            const stockChecks = await Promise.all(stockCheckPromises);
            const outOfStockItem = stockChecks.find(stockCheck => stockCheck.quantity > stockCheck.stock);

            if (outOfStockItem) {
                alert(`주문 수량이 ${outOfStockItem.pro_id}의 재고(${outOfStockItem.stock}개)보다 많습니다.`);
                return;
            }

            const deliveryInfo = showUser ? {
                deliveryUser: userDetails.user_name,
                deliveryPhone: userDetails.phone_num,
                deliveryAddress: userDetails.address
            } : {
                deliveryUser,
                deliveryPhone,
                deliveryAddress
            };

            const orderDto = {
                order_id,
                user_id: loginId,
                order_date: formattedDate,
                order_status: 'pending',
                postcode: '123456',
                oritem_address: deliveryInfo.deliveryAddress,
                oritem_dtladdress: '상세 주소',
                oritem_name: deliveryInfo.deliveryUser,
                oritem_number: deliveryInfo.deliveryPhone,
                pay_method: '신용카드',
                oritem_payment: total,
                oritem_count: totalQuantity,
                items: allItemsToBuy.map(item => ({
                    pro_id: item.pro_id,
                    oritem_quan: item.quantity
                }))
            };

            await axios.post(`${API_BASE_URL}/api/orders`, orderDto);

            alert('결제가 완료되었습니다.');
            navigate('../Order');
        } catch (error) {
            console.error('결제 처리 중 오류 발생:', error);
        }
    };

    return (
        <div className="buy_main_box">
            <div className="buy_titlebar">
                <h1>주문결제</h1>
            </div>
            <div className="item_detail_main">
                <div className='detail_left_box'>
                    <div className="buy_left_subtitle">
                        <div className="subtitle_left"><h3>상품 정보</h3></div>
                    </div>
                    <ItemBuyCartList
                        setTotal={setTotal}
                        setTotalQuantity={setTotalQuantity}
                        setCheckedTrueItems={setCheckedTrueItems}
                    />
                </div>

                <div className='detail_right_box'>
                    <div className='right_inner'>
                        <div className='buy_right_subtitle'>
                            <h3>주문자 정보</h3>
                            <button className='delivery_change_btn' onClick={deliveryChange}>배송지 변경</button>
                        </div>

                        <div className='buy_item_info underline'>
                            {showUser ? (
                                <div id='user' className='userinfo'>
                                    <p>주문자</p>
                                    <p>{userDetails.user_name}</p>
                                    <p>연락처</p>
                                    <p>{userDetails.phone_num}</p>
                                    <p>e-Mail</p>
                                    <p>{userDetails.email}</p>
                                    <p>배송지</p>
                                    <p className='buy_user_address_box'>{userDetails.address}</p>
                                </div>
                            ) : (
                                <div id='delivery' className='delivery_info'>
                                    <p>수령자</p>
                                    <input type='text' name='delivery_user' placeholder='수령자를 입력하세요.'
                                        onChange={(e) => setDeliveryUser(e.target.value)} maxLength={8} />
                                    <p>연락처</p>
                                    <input type='text' name='delivery_phone' placeholder='연락처를 입력하세요.'
                                        onChange={(e) => setDeliveryPhone(e.target.value)} maxLength={11} />
                                    <p>배송지</p>
                                    <p className='buy_address_search'>
                                        <button id='address_kakao' className='address_search_btn' ref={addressKakaoRef}>주소검색</button>
                                    </p>
                                    <input type='text' name='delivery_address' className='buy_delivery_address_box'
                                        placeholder='주소를 검색하세요.' value={deliveryAddress} readOnly />
                                    <button className="save_btn" onClick={handleSaveDeliveryInfo}>저장</button>
                                </div>
                            )}
                        </div>

                        <div className='item_count underline'>
                            <div className='count_left_box font_medium'>구매수량</div>
                            <div className='count_right_box'>
                                <div className='count_num'>{totalQuantity}</div>
                            </div>
                        </div>

                        <div className='item_count underline'>
                            <div className='count_left_box font_medium'>결제 수단</div>
                            <select>
                                <option>신용카드</option>
                                <option>무통장 입금</option>
                                <option>네이버 페이</option>
                                <option>카카오 페이</option>
                            </select>
                        </div>

                        <div className='item_count underline'>
                            <div className='count_left_box font_medium'>총 결제 금액</div>
                            <div className='count_right_box'>
                                <div className='total_price'>{formatNumber(total)} 원</div>
                            </div>
                        </div>
                        <div className='buy_button_box'>
                            <button className='submit_btn' onClick={handleOrder}>결제하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemBuy;
