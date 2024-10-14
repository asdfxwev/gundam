import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import axios from 'axios';
import MypageLeft from '../MyPage/MypageLeft';
import { API_BASE_URL } from '../service/app-config';

// CartItem 컴포넌트 정의
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
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onCheckboxChange(item.pro_id)}
                />
            </div>
            <div>
                <a href={`/itemList/itemDetail/${item.pro_id}`}>
                    <img
                        src={`${API_BASE_URL}/resources/productImg/${item.pro_id}/${item.pro_imgs}`}
                        alt={item.pro_name}
                    />
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

// Cart 컴포넌트 정의
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const user_id = JSON.parse(sessionStorage.getItem('userInfo')).user_id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/cart/${user_id}`);
                setCartItems(response.data);
                setCheckedItems(response.data.map(item => item.pro_id));
                setIsAllChecked(response.data.length > 0);
            } catch (error) {
                setErrorMessage('카트 데이터를 가져오는 데 실패했습니다.');
            }
        };
        fetchData();
    }, [user_id]);

    const handleQuantityChange = (pro_id, quantity) => {
        const updatedItems = cartItems.map(item =>
            item.pro_id === pro_id ? { ...item, cart_quantity: quantity } : item
        );
        setCartItems(updatedItems);
    };

    const handleCheckboxChange = (pro_id) => {
        const newCheckedItems = checkedItems.includes(pro_id)
            ? checkedItems.filter(itemId => itemId !== pro_id)
            : [...checkedItems, pro_id];

        setCheckedItems(newCheckedItems);
        setIsAllChecked(newCheckedItems.length === cartItems.length);
    };

    const handleAllCheckboxChange = () => {
        const newCheckedItems = isAllChecked ? [] : cartItems.map(item => item.pro_id);
        setCheckedItems(newCheckedItems);
        setIsAllChecked(!isAllChecked);
    };

    const handleSaveSelected = async () => {
        if (checkedItems.length === 0) {
            alert('저장할 상품을 선택해주세요.');
            return;
        }

        const confirmUpdate = window.confirm('선택한 상품의 수량을 업데이트하시겠습니까?');
        if (confirmUpdate) {
            try {
                await Promise.all(checkedItems.map(async (pro_id) => {
                    const item = cartItems.find(item => item.pro_id === pro_id);
                    const userDefinedQuantity = item.cart_quantity;
                    return axios.put(`${API_BASE_URL}/cart/${user_id}/${pro_id}`, {
                        cart_quantity: userDefinedQuantity
                    });
                }));

                const notCheckedItems = cartItems.filter(item => !checkedItems.includes(item.pro_id));
                await Promise.all(notCheckedItems.map(item => {
                    return axios.delete(`${API_BASE_URL}/cart/${user_id}/${item.pro_id}`);
                }));

                alert('선택한 상품의 수량이 업데이트되었습니다.');
                setCheckedItems(cartItems.map(item => item.pro_id));
                setIsAllChecked(true);
                navigate('/cart');
            } catch (error) {
                console.error('Error updating cart items:', error);
                alert('선택한 상품 수량 업데이트에 실패했습니다.');
            }
        }
    };

    const total = cartItems
        .filter(item => checkedItems.includes(item.pro_id))
        .reduce((sum, item) => sum + (item.cart_quantity * item.pro_price), 0);

    const handlePayment = () => {
        if (checkedItems.length === 0) {
            alert('결제할 상품을 선택해주세요.');
            return;
        }

        const selectedItems = cartItems.filter(item => checkedItems.includes(item.pro_id));
        console.log('결제할 상품들:', selectedItems);
        alert('결제가 진행됩니다.');
        navigate('/itemBuy', { state: { items: selectedItems } });
    };

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
                    {cartItems.map(item => (
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
                    <div className='buy-action'>
                        <button onClick={handlePayment}>결제</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
