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
    const [checkedTrueItems, setCheckedTrueItems] = useState([]); // 체크된 아이템 상태 변수
    const [showUser, setShowUser] = useState(true); // user 정보 표시 여부 상태 변수
    const [deliveryAddress, setDeliveryAddress] = useState(''); // 배송지 주소 상태 변수
    const [deliveryUser, setDeliveryUser] = useState(''); // 수령자 이름 상태 변수
    const [deliveryPhone, setDeliveryPhone] = useState(''); // 수령자 연락처 상태 변수

    const formatNumber = (number) => {
        return number.toLocaleString('ko-KR');
    };

    useEffect(() => {
        if (item && count) {
            setTotal(item.price * count);
            setTotalQuantity(count);
            setCheckedTrueItems([{ ...item, quantity: count }]);
        }
    }, [item, count]);

    // ItemBuyCartList 컴포넌트가 첫 번째로 처리되도록 useEffect를 사용하여 설정
    useEffect(() => {
        if (item && count) {
            const initialCartItems = [{ ...item, quantity: count }];
            const initialTotal = initialCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const initialTotalQuantity = initialCartItems.reduce((sum, item) => sum + item.quantity, 0);
            setTotal(initialTotal);
            setTotalQuantity(initialTotalQuantity);
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
                        oncomplete: async function (data) {
                            // 주소 데이터 상태에 저장
                            setDeliveryAddress(data.address);
                        }
                    }).open();
                });
            }
        };

        document.body.appendChild(script);

        // 스크립트 제거를 위한 정리 함수
        return () => {
            document.body.removeChild(script);
        };
    }, [userinfo]);

    const delivery_change = () => {
        setShowUser(!showUser); // showUser 상태를 반전시킴
    };

    const gundam_buy = async () => {
        try {
            const userResponse = await axios.get(`http://localhost:3001/users/${userinfo.id}`);
            const userData = userResponse.data;

            const today = new Date().toISOString().split('T')[0]; // 오늘의 년월일을 얻음 (YYYY-MM-DD 형식)

            // isChecked가 true인 데이터만 buy 배열에 추가
            const itemsToBuyFromCartWithDate = userData.cart
                .filter(cartItem => cartItem.isChecked)
                .map(item => ({
                    ...item,
                    date: today // cart에서 가져온 항목에 date 속성 추가
                }));

            // itemdetail에서 가져온 항목이 있는 경우에만 date 속성 추가
            let itemDetailToBuy = null;
            if (item) {
                itemDetailToBuy = {
                    ...item,
                    quantity: count,
                    date: today
                };
            }

            // 결합된 항목들 (itemDetailToBuy가 있는 경우에만 추가)
            const allItemsToBuy = itemDetailToBuy
                ? [...itemsToBuyFromCartWithDate, itemDetailToBuy]
                : [...itemsToBuyFromCartWithDate];

            // 중복 제거: buy 배열에 동일한 id의 항목이 없을 때만 추가
            const newBuyItems = allItemsToBuy.filter(item => !(userData.buy && userData.buy.some(buyItem => buyItem.id === item.id)));
            
            if (!showUser && (deliveryUser === '' || deliveryPhone === '' || deliveryAddress === '')) {
                alert(`배송정보를 입력해주세요.`);
                return false;
            }

             // userinfo 값에 따라 배송 정보 설정
            const deliveryInfo = showUser ? {
                deliveryuser: userinfo.name,
                deliveryphone: userinfo.phoneNumber,
                deliveryaddress: userinfo.address
            } : {
                deliveryuser: deliveryUser,
                deliveryphone: deliveryPhone,
                deliveryaddress: deliveryAddress
            };

            // newBuyItems에 deliveryInfo 추가
            const updatedBuyItems = newBuyItems.map(item => ({
                ...item,
                ...deliveryInfo
            }));

            userData.buy = userData.buy ? [...userData.buy, ...updatedBuyItems] : updatedBuyItems;

            // isChecked가 true인 데이터는 cart에서 제거
            userData.cart = userData.cart.filter(cartItem => !cartItem.isChecked);

            await axios.put(`http://localhost:3001/users/${userinfo.id}`, userData);

            alert('결제가 완료되었습니다.');
            navigate('../Order'); // 결제 완료 페이지로 이동
        } catch (error) {
            console.error('결제 처리 중 오류 발생:', error);
        }
    };

    // =====================================================================


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
                            <div className="subtitle_right"></div>
                        </div>
                        <div>
                            <ItemBuyCartList
                                setTotal={setTotal}
                                setTotalQuantity={setTotalQuantity}
                                setCheckedTrueItems={setCheckedTrueItems}
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
                                        <input type='text' name='delivery_user' placeholder='수령자를 입력하세요.' onChange={(e) => setDeliveryUser(e.target.value)} maxLength={8}></input>
                                        <p>연락처</p>
                                        <input type='text' name='delivery_phone' placeholder='연락처를 입력하세요.' onChange={(e) => setDeliveryPhone(e.target.value)} maxLength={11}></input>
                                        <p>배송지</p>
                                        <p className='buy_address_search'>
                                            <button id='address_kakao' className='address_search_btn'>주소검색</button>
                                        </p>
                                        <input type='text' name='deliyvery_address' className='buy_deliyvery_address_box' placeholder='주소를 검색하세요.' value={deliveryAddress} readOnly></input>
                                    </div>
                                )}
                            </div>
                            <div className='item_count underline'>
                                <div className='count_left_box font_medium'>구매수량</div>
                                <div className='count_right_box'>
                                    <div className='count_num'>{totalQuantity}</div>
                                </div>
                            </div>
                            <div className='item_total_price font_medium'>
                                <p className='total_price_title '>총 결제금액</p>
                                <p className='total_price'><span className='t_price'>{formatNumber(total)}</span> 원</p>
                            </div>
                            <div className='item_btn'>
                                <button className='submit_btn' onClick={gundam_buy} >결제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemBuy;