import React, { useState, useEffect } from 'react';
import './cart.css';
import axios from 'axios';
import MypageLeft from '../MyPage/MypageLeft';
import { API_BASE_URL } from '../service/app-config';

const CartItem = ({ item, onQuantityChange, onCheckboxChange, isChecked }) => {
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            onQuantityChange(item.id, newQuantity);
        }
    };

    return (
        <div className="cart-item">
            <div>
                <input type="checkbox" checked={isChecked} onChange={() => onCheckboxChange(item.id)} />
            </div>
            <div>
                <a href={`${API_BASE_URL}/product/${item.pro_id.pro_id}`}>
                    <img src={`${API_BASE_URL}/product/${item.pro_id.pro_id}`} alt={item.name} />
                </a>
            </div>
            <div>{item.name}</div>
            <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => handleQuantityChange(item.quantity + 1)}>+</button>
            </div>
            <div>{item.price.toLocaleString()}원</div>
            <div>{(item.price * item.quantity).toLocaleString()}원</div>
        </div>
    );
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const existingInquiries = JSON.parse(localStorage.getItem('loginInfo'));
    const userId = existingInquiries.user_id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3000/logininfo/${userId}`);
                const userData = userResponse.data;

                // 사용자의 카트가 없을 경우 초기화
                const initialCart = userData.cart || [];
                setCartItems(initialCart.reverse());
                setCheckedItems(initialCart.map(item => item.id));
                setIsAllChecked(initialCart.length > 0);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
                setErrorMessage('카트 데이터를 가져오는 데 실패했습니다. 나중에 다시 시도해주세요.');
            }
        };
        fetchData();
    }, [userId]);

    const handleQuantityChange = async (id, quantity) => {
        const updatedItems = cartItems.map(item => (item.id === id ? { ...item, quantity } : item));
        setCartItems(updatedItems);

        // 서버에 수량 업데이트 요청
        try {
            await axios.put(`http://localhost:3000/logininfo/${userId}`, { ...existingInquiries, cart: updatedItems });
        } catch (error) {
            console.error('Error updating quantity:', error);
            setErrorMessage('수량 업데이트 중 오류가 발생했습니다.');
        }
    };

    const handleCheckboxChange = (id) => {
        const newCheckedItems = checkedItems.includes(id)
            ? checkedItems.filter(itemId => itemId !== id)
            : [...checkedItems, id];

        setCheckedItems(newCheckedItems);
        setIsAllChecked(newCheckedItems.length === cartItems.length);
    };

    const handleAllCheckboxChange = () => {
        const newCheckedItems = isAllChecked ? [] : cartItems.map(item => item.id);
        setCheckedItems(newCheckedItems);
        setIsAllChecked(!isAllChecked);
    };

    const handleRemoveCheckedItems = async () => {
        try {
            const updatedItems = cartItems.filter(item => !checkedItems.includes(item.id));

            await axios.put(`http://localhost:3000/logininfo/${userId}`, { ...existingInquiries, cart: updatedItems });

            setCartItems(updatedItems);
            setCheckedItems([]);
            setIsAllChecked(false);
        } catch (error) {
            console.error('Error deleting items:', error);
            setErrorMessage('선택한 상품을 삭제하는 중 오류가 발생했습니다.');
        }
    };

    const handleRemoveAllItems = async () => {
        try {
            await axios.put(`http://localhost:3000/logininfo/${userId}`, { ...existingInquiries, cart: [] });
            setCartItems([]);
            setCheckedItems([]);
            setIsAllChecked(false);
        } catch (error) {
            console.error('Error clearing cart:', error);
            setErrorMessage('장바구니를 비우는 중 오류가 발생했습니다.');
        }
    };

    const total = cartItems
        .filter(item => checkedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('장바구니에 상품이 없습니다!');
        } else {
            window.location.href = '/Itembuy';
        }
    };

    return (
        <div className="mypageContainer">
            <MypageLeft />
            <div className="cartWrapper">
                <h1 className='h1-names'>장바구니</h1>
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
                    {cartItems && cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onCheckboxChange={handleCheckboxChange}
                            isChecked={checkedItems.includes(item.id)}
                        />
                    ))}
                    <button className='button-size' onClick={handleRemoveCheckedItems}>선택한 상품 삭제</button>
                    <button className='button-size' onClick={handleRemoveAllItems}>전체 상품 삭제</button>
                    <div className="cart-total">
                        총 합계: {total.toLocaleString()}원
                    </div>
                    <div className="cart-actions">
                        <button onClick={handleCheckout}>결제하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
