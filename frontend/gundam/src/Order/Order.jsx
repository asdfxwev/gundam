import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';
import MypageLeft from '../MyPage/MypageLeft';

const CartItem = ({ item, onQuantityChange, onCheckboxChange, isChecked }) => {
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            onQuantityChange(item.order_id, newQuantity); // order_id로 수정
        }
    };

    return (
        <div className="cart-item">
            <div>{item.order_date}</div> {/* 주문 날짜 */}
            <div><a href={`ItemList/ItemDetail/${item.order_id}`}>
                <img src={item.image} alt={item.name} /></a>
            </div>
            <div> {item.oritem_name}</div> {/* 상품 이름 */}
            <div className="quantity-controls">
                {item.oritem_count} {/* 수량 */}
            </div>
            <div>{item.oritem_payment.toLocaleString()}원</div> {/* 가격 */}
            <div>{(item.oritem_payment * item.oritem_count).toLocaleString()}원</div> {/* 총 가격 */}
        </div>
    );
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);

    // 로그인한 사용자 정보
    const existingInquiries = JSON.parse(localStorage.getItem('loginInfo'));
    const userId = existingInquiries.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Spring Boot API에서 주문 데이터 가져오기
                const response = await axios.get(`http://localhost:8080/api/orders?userId=${userId}`);
                const ordersData = response.data;

                setCartItems(ordersData.reverse());   // 최신순으로 정렬
                setCheckedItems(ordersData.map(item => item.order_id));
                setIsAllChecked(true);
            } catch (error) {
                console.error('주문 데이터를 가져오는 중 오류 발생:', error);
            }
        };
        fetchData();
    }, [userId]);

    // 수량 변경 처리
    const handleQuantityChange = async (orderId, quantity) => {
        const updatedItems = cartItems.map(item =>
            item.order_id === orderId ? { ...item, oritem_count: quantity } : item
        );
        setCartItems(updatedItems);

        try {
            // 수량 업데이트 API 호출
            await axios.put(`http://localhost:8080/api/orders/${orderId}`, {
                ...updatedItems.find(item => item.order_id === orderId), // 해당 주문 데이터 전송
                oritem_count: quantity
            });
        } catch (error) {
            console.error('수량 업데이트 중 오류 발생:', error.response ? error.response.data : error.message);
        }
    };

    const handleCheckboxChange = (id) => {
        const newCheckedItems = checkedItems.includes(id)
            ? checkedItems.filter(itemId => itemId !== id)
            : [...checkedItems, id];

        setCheckedItems(newCheckedItems);
        setIsAllChecked(newCheckedItems.length === cartItems.length);
    };

    return (
        <div className="mypageContainer">
            <MypageLeft />
            <div className="cartWrapper">
                <h1 className='h1-names'>구매내역</h1>
                <div className="cart-containers">
                    <div className="cart-header">
                        <div>구매일</div>
                        <div>상품 이미지</div>
                        <div>상품 이름</div>
                        <div>수량</div>
                        <div>가격</div>
                        <div>총 가격</div>
                    </div>
                    {cartItems && cartItems.map((item) => (
                        <CartItem
                            key={item.order_id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onCheckboxChange={handleCheckboxChange}
                            isChecked={checkedItems.includes(item.order_id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cart;
