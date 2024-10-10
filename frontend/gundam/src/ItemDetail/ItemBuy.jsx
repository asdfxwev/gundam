import React, { useState, useEffect } from 'react';
import './ItemDetail.css';
import ItemBuyCartList from './ItemBuyCartList';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from "../service/app-config";

const ItemBuy = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { item, count } = location.state || {};
    const [userinfo, setUserinfo] = useState(null); // 사용자 정보를 저장할 상태
    const [checkedTrueItems, setCheckedTrueItems] = useState([]);
    const [total, setTotal] = useState(0); // 총 결제금액 상태 변수
    const [totalQuantity, setTotalQuantity] = useState(0); // 총 구매수량 상태 변수
    const [showUser, setShowUser] = useState(true); // 사용자 정보 표시 여부 상태 변수
    const [deliveryAddress, setDeliveryAddress] = useState(''); // 배송지 주소 상태 변수
    const [deliveryUser, setDeliveryUser] = useState(''); // 수령자 이름 상태 변수
    const [deliveryPhone, setDeliveryPhone] = useState(''); // 수령자 연락처 상태 변수

    const formatNumber = (number) => number.toLocaleString('ko-KR');

    useEffect(() => {
        const fetchUserinfo = async () => {
            const userId = JSON.parse(sessionStorage.getItem('loginInfo')).user_id; // 세션에서 user_id 가져오기
            try {
                const response = await axios.get(`${API_BASE_URL}/user/${userId}`); // 사용자 정보 가져오기
                console.log('response test:',response);
                setUserinfo(response.data); // 사용자 정보 상태 업데이트
            } catch (error) {
                console.error('사용자 정보를 가져오는 중 오류 발생:', error);
            }
        };

        fetchUserinfo(); // 사용자 정보 가져오기 호출
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    useEffect(() => {
        if (item && count) {
            const initialTotal = item.price * count;
            setTotal(initialTotal);
            setTotalQuantity(count);
        }
    }, [item, count]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.onload = () => {
            console.log('Kakao 주소 검색 스크립트 로드됨');
            // 주소 검색 버튼에 이벤트 리스너 추가
            const addressKakao = document.getElementById("address_kakao");
            addressKakao?.addEventListener("click", () => {
                new window.daum.Postcode({
                    oncomplete: (data) => {
                        setDeliveryAddress(data.address);
                    }
                }).open();
            });
        };

        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    const deliveryChange = () => {
        setShowUser((prev) => !prev); // 사용자 정보 표시 상태 토글
    };

    const handleOrder = async () => {
        if (!deliveryUser || !deliveryPhone || !deliveryAddress) {
            alert('배송 정보를 입력해주세요.');
            return;
        }

        if (!userinfo) {
            alert('사용자 정보를 불러오는 중 오류가 발생했습니다.');
            return;
        }

        try {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0].replace(/-/g, '');
            const orderCountResponse = await axios.get(`http://localhost:3000/orders/${userinfo.id}`);
            const orderCount = orderCountResponse.data.oritem_count;
            const order_id = `${formattedDate}${userinfo.user_id}${String(orderCount + 1).padStart(4, '0')}`;

            const itemsToBuyFromCart = userinfo.cart.filter(cartItem => cartItem.isChecked);
            const itemDetailToBuy = item ? {
                ...item,
                quantity: count,
                pro_id: item.pro_id,
                order_id: order_id
            } : null;

            const allItemsToBuy = itemDetailToBuy ? [...itemsToBuyFromCart, itemDetailToBuy] : itemsToBuyFromCart;

            const deliveryInfo = showUser ? {
                deliveryuser: userinfo.name,
                deliveryphone: userinfo.phoneNumber,
                deliveryaddress: userinfo.address
            } : {
                deliveryuser: deliveryUser,
                deliveryphone: deliveryPhone,
                deliveryaddress: deliveryAddress
            };

            await axios.post('http://localhost:3000/orders', {
                order_id,
                user_id: userinfo.id,
                order_date: today,
                order_status: 'pending',
                postcode: '123456',
                oritem_address: deliveryInfo.deliveryaddress,
                oritem_dtladdress: '상세 주소',
                oritem_name: deliveryInfo.deliveryuser,
                oritem_number: deliveryInfo.deliveryphone,
                pay_method: '신용카드',
                oritem_payment: total,
                oritem_count: totalQuantity
            });

            await Promise.all(
                allItemsToBuy.map(async (item) => {
                    await axios.post('http://localhost:3000/oritems', {
                        order_id,
                        pro_id: item.pro_id,
                        oritem_quan: item.quantity
                    });
                })
            );

            userinfo.cart = userinfo.cart.filter(cartItem => !cartItem.isChecked);
            await axios.put(`http://localhost:3000/user/${userinfo.id}`, userinfo);

            alert('결제가 완료되었습니다.');
            navigate('../Order'); // 결제 완료 페이지로 이동
        } catch (error) {
            console.error('결제 처리 중 오류 발생:', error);
        }
    };

    return (
        <>
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
                            initialItem={item}
                            initialCount={count}
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
                                    userinfo && (
                                        <div id='user' className='userinfo'>
                                            <p>주문자</p>
                                            <p>{userinfo.user_name}</p>
                                            <p>연락처</p>
                                            <p>{userinfo.phoneNumber}</p>
                                            <p>e-Mail</p>
                                            <p>{userinfo.email}</p>
                                            <p>배송지</p>
                                            <p className='buy_user_address_box'>{userinfo.address}</p>
                                        </div>
                                    )
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
                                            <button id='address_kakao' className='address_search_btn'>주소검색</button>
                                        </p>
                                        <input type='text' name='delivery_address' className='buy_delivery_address_box'
                                            placeholder='주소를 검색하세요.' value={deliveryAddress} readOnly />
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
                                <select className=''>
                                    <option>신용카드</option>
                                    <option>무통장 입금</option>
                                    <option>카카오 페이</option>
                                    <option>네이버 페이</option>
                                </select>
                            </div>
                            <div className='item_total_price font_medium'>
                                <p className='total_price_title'>총 결제금액</p>
                                <p className='total_price'><span className='t_price'>{formatNumber(total)}</span> 원</p>
                            </div>
                            <button className='buy_btn' onClick={handleOrder}>결제하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemBuy;
