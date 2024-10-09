import React, { useState, useEffect } from 'react';
import './ItemDetail.css';
import ItemBuyCartList from './ItemBuyCartList';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemBuy = () => {
    const userinfo = JSON.parse(localStorage.getItem('loginInfo')); // 사용자 정보
    const location = useLocation();
    const navigate = useNavigate();
    const { item, count } = location.state || {};

    const [total, setTotal] = useState(0); // 총 결제금액 상태 변수
    const [totalQuantity, setTotalQuantity] = useState(0); // 총 구매수량 상태 변수
    const [showUser, setShowUser] = useState(true); // user 정보 표시 여부 상태 변수
    const [deliveryAddress, setDeliveryAddress] = useState(''); // 배송지 주소 상태 변수
    const [deliveryUser, setDeliveryUser] = useState(''); // 수령자 이름 상태 변수
    const [deliveryPhone, setDeliveryPhone] = useState(''); // 수령자 연락처 상태 변수

    const formatNumber = (number) => {
        return number.toLocaleString('ko-KR');
    };

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
            const addressKakao = document.getElementById("address_kakao");
            if (addressKakao) {
                addressKakao.addEventListener("click", function () {
                    new window.daum.Postcode({
                        oncomplete: function (data) {
                            setDeliveryAddress(data.address);
                        }
                    }).open();
                });
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const delivery_change = () => {
        setShowUser(!showUser); // showUser 상태를 반전시킴
    };

    const gundam_buy = async () => {
        try {
            const userResponse = await axios.get(`http://localhost:3000/users/${userinfo.id}`);
            const userData = userResponse.data;
    
            // 현재 날짜를 YYYYMMDD로 변환
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0].replace(/-/g, ''); // 'yyyyMMdd' 형식
    
            // 사용자의 기존 주문 개수에 따른 자동 증가값 계산
            const orderCountResponse = await axios.get(`http://localhost:3000/orders/count/${userinfo.id}`);
            const orderCount = orderCountResponse.data.count; // 기존 주문 개수
            const autoIncrement = String(orderCount + 1).padStart(4, '0'); // 4자리로 패딩 처리
    
            const order_id = `${formattedDate}${userinfo.id}${autoIncrement}`; // 주문 ID 생성
    
            // 카트에서 isChecked가 true인 항목만 구매 배열에 추가
            const itemsToBuyFromCart = userData.cart.filter(cartItem => cartItem.isChecked);
    
            // itemDetail에서 가져온 항목이 있는 경우 추가
            let itemDetailToBuy = null;
            if (item) {
                itemDetailToBuy = {
                    ...item,
                    quantity: count,
                    pro_id: item.pro_id, // 상품 ID 추가
                    order_id: order_id // order_id 추가
                };
            }
    
            const allItemsToBuy = itemDetailToBuy
                ? [...itemsToBuyFromCart, itemDetailToBuy]
                : itemsToBuyFromCart;
    
            // 배송 정보 설정
            const deliveryInfo = showUser ? {
                deliveryuser: userinfo.name,
                deliveryphone: userinfo.phoneNumber,
                deliveryaddress: userinfo.address
            } : {
                deliveryuser: deliveryUser,
                deliveryphone: deliveryPhone,
                deliveryaddress: deliveryAddress
            };
    
            // 주문 상태를 code_value에서 찾기
            const orderStatusValue = userData.order_status; // order_status를 사용
            const codeResponse = await axios.get(`http://localhost:3000/code?code_value=${orderStatusValue}`);
            const codeData = codeResponse.data;
    
            // 일치하는 code_name 가져오기
            const orderStatus = codeData.code_name; // code_name을 order_status로 설정
    
            // orders 테이블에 데이터 삽입
            await axios.post('http://localhost:3000/orders', {
                order_id: order_id,
                user_id: userinfo.id,
                order_date: today,
                order_status: orderStatus, // 수정된 부분
                postcode: '123456', // 우편번호
                oritem_address: deliveryInfo.deliveryaddress,
                oritem_dtladdress: '상세 주소', // 상세 주소 (예시)
                oritem_name: deliveryInfo.deliveryuser,
                oritem_number: deliveryInfo.deliveryphone,
                pay_method: '신용카드', // 결제 방식
                oritem_payment: total, // 총 결제 금액
                oritem_count: totalQuantity // 총 구매 수량
            });
    
            // orderitems 테이블에 각 상품에 대한 데이터 삽입
            await Promise.all(
                allItemsToBuy.map(async (item) => {
                    await axios.post('http://localhost:3000/orderitems', {
                        order_id: order_id,
                        pro_id: item.pro_id,
                        oritem_quan: item.quantity // 구매한 수량
                    });
                })
            );
    
            // isChecked가 true인 데이터는 cart에서 제거
            userData.cart = userData.cart.filter(cartItem => !cartItem.isChecked);
    
            // 업데이트된 userData 저장
            await axios.put(`http://localhost:3000/users/${userinfo.id}`, userData);
    
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
                        <div>
                            <ItemBuyCartList
                                setTotal={setTotal}
                                setTotalQuantity={setTotalQuantity}
                                initialItem={item}
                                initialCount={count}
                            />
                        </div>
                    </div>

                    <div className='detail_right_box'>
                        <div className='right_inner'>
                            <div className='buy_right_subtitle'>
                                <h3>주문자 정보</h3>
                                <button className='delivery_change_btn' onClick={delivery_change}>배송지 변경</button>
                            </div>

                            <div className='buy_item_info underline'>
                                {showUser ? (
                                    <div id='user' className='userinfo'>
                                        <p>주문자</p>
                                        <p>{userinfo.name}</p>
                                        <p>연락처</p>
                                        <p>{userinfo.phoneNumber}</p>
                                        <p>e-Mail</p>
                                        <p>{userinfo.email}</p>
                                        <p>배송지</p>
                                        <p className='buy_user_address_box'>{userinfo.address}</p>
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
                                            <button id='address_kakao' className='address_search_btn'>주소검색</button>
                                        </p>
                                        <input type='text' name='deliyvery_address' className='buy_deliyvery_address_box' 
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
                            <div className='item_btn'>
                                <button className='submit_btn' onClick={gundam_buy}>결제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemBuy;
