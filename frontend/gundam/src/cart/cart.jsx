import React, { useState, useEffect } from 'react';
import './cart.css';
import axios from 'axios';
import MypageLeft from '../MyPage/MypageLeft';
import { API_BASE_URL } from '../service/app-config';

const CartItem = ({ item, onQuantityChange, onCheckboxChange, isChecked }) => {
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            onQuantityChange(item.pro_id, newQuantity);
        }
    };

    const totalPrice = item.cart_quantity * item.pro_price;

    return (
        <div className="cart-item">
            <div>
                <input type="checkbox" checked={isChecked} onChange={() => onCheckboxChange(item.pro_id)} />
            </div>
            <div>
                <a href={`/itemList/itemDetail/${item.pro_id}`}>
                    <img src={`${API_BASE_URL}/resources/productImg/${item.pro_id}/${item.pro_imgs}`} alt={item.name} />
                </a>
            </div>
            <div>{item.pro_name}</div>
            <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.cart_quantity - 1)}>-</button>
                {item.cart_quantity}
                <button onClick={() => handleQuantityChange(item.cart_quantity + 1)}>+</button>
            </div>
            <div>{item.pro_price.toLocaleString()}원</div>
            <div>{totalPrice.toLocaleString()}원</div>
        </div>
    );
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const userId = JSON.parse(sessionStorage.getItem('loginInfo')).user_id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
                setCartItems(response.data);
                setCheckedItems(response.data.map(item => item.pro_id));
                setIsAllChecked(response.data.length > 0);
            } catch (error) {
                setErrorMessage('카트 데이터를 가져오는 데 실패했습니다.');
            }
        };
        fetchData();
    }, [userId]);

    const handleQuantityChange = (proId, quantity) => {
        const updatedItems = cartItems.map(item =>
            item.pro_id === proId ? { ...item, cart_quantity: quantity } : item
        );
        setCartItems(updatedItems);
    };

    const handleCheckboxChange = (proId) => {
        const newCheckedItems = checkedItems.includes(proId)
            ? checkedItems.filter(itemId => itemId !== proId)
            : [...checkedItems, proId];
        setCheckedItems(newCheckedItems);
        setIsAllChecked(newCheckedItems.length === cartItems.length);
    };

    const handleAllCheckboxChange = () => {
        const newCheckedItems = isAllChecked ? [] : cartItems.map(item => item.pro_id);
        setCheckedItems(newCheckedItems);
        setIsAllChecked(!isAllChecked);
    };

    // 선택된 상품 수량 업데이트 기능
    const handleSaveSelected = async () => {
        if (checkedItems.length === 0) {
            alert('저장할 상품을 선택해주세요.');
            return;
        }
        const confirmUpdate = window.confirm('선택한 상품의 수량을 업데이트하시겠습니까?');
        if (confirmUpdate) {
            try {
                await Promise.all(checkedItems.map(proId => {
                    const item = cartItems.find(item => item.pro_id === proId);
                    return axios.put(`${API_BASE_URL}/cart/${proId}`, {
                        cart_quantity: item.cart_quantity 
                    });
                }));
                alert('선택한 상품의 수량이 업데이트되었습니다.');

                setCheckedItems([]);
                setIsAllChecked(false);
            } catch (error) {
                alert('선택한 상품 수량 업데이트에 실패했습니다.');
            }
        }
    };

    // 전체 선택된 상품들의 합계를 계산
    const total = cartItems
        .filter(item => checkedItems.includes(item.pro_id))
        .reduce((sum, item) => sum + (item.cart_quantity * item.pro_price), 0);

    return (
        <div className="mypageContainer">
            <MypageLeft />
            <div className="cartWrapper">
                <h1>장바구니</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="cart-containers">
                    <div className="cart-header">
                        <div>
                            <input
                                type="checkbox"
                                checked={isAllChecked}
                                onChange={handleAllCheckboxChange}
                            />
                            전체선택
                        </div>
                        <div>상품 이미지</div>
                        <div>상품 이름</div>
                        <div>수량</div>
                        <div>가격</div>
                        <div>총 가격</div>
                    </div>
                    {cartItems && cartItems.map(item => (
                        <CartItem
                            key={item.pro_id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onCheckboxChange={handleCheckboxChange}
                            isChecked={checkedItems.includes(item.pro_id)}
                        />
                    ))}
                    <div className="cart-total">
                        <div className='cart-actions'>
                            <button onClick={handleSaveSelected}>선택 값 저장</button>
                        </div>
                        총 합계: {total.toLocaleString()}원
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
