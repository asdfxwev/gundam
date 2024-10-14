import React, { useState, useEffect } from 'react';
import './ItemDetail.css';
import axios from 'axios';
import { API_BASE_URL } from "../service/app-config";

// CartItem 컴포넌트
const CartItem = ({ item, onQuantityChange, onCheckboxChange, isChecked }) => {
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            onQuantityChange(item.pro_id, newQuantity);
        }
    };

    return (
        <div className="buy_item_box">
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
            <div className="buy_count_box">
                <button onClick={() => handleQuantityChange(item.cart_quantity - 1)}>-</button>
                {item.cart_quantity}
                <button onClick={() => handleQuantityChange(item.cart_quantity + 1)}>+</button>
            </div>
            <div>{(item.pro_price ? item.pro_price.toLocaleString() : '0')} 원</div>
            <div>{(item.pro_price && item.cart_quantity ? (item.pro_price * item.cart_quantity).toLocaleString() : '0')} 원</div>
        </div>
    );
};

// ItemBuyCartList 컴포넌트
const ItemBuyCartList = ({ setTotal, setTotalQuantity, setCheckedTrueItems, initialItem, initialCount }) => {
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const user_id = JSON.parse(sessionStorage.getItem('userId')).user_id;

    // 데이터 로드 및 장바구니 아이템 설정
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/cart/${user_id}`);
                const cartData = response.data || [];

                // 장바구니에 initialItem 추가 및 수량 업데이트 처리
                const updatedItems = [...cartData];
                if (initialItem && initialCount) {
                    const existingIndex = updatedItems.findIndex(item => item.pro_id === initialItem.pro_id);
                    if (existingIndex >= 0) {
                        updatedItems[existingIndex].cart_quantity += initialCount;
                    } else {
                        updatedItems.push({ ...initialItem, cart_quantity: initialCount, isChecked: true });
                    }
                }

                setCartItems(updatedItems);
                const initiallyCheckedItems = updatedItems.filter(item => item.isChecked).map(item => item.pro_id);
                setCheckedItems(initiallyCheckedItems);
                setIsAllChecked(initiallyCheckedItems.length === updatedItems.length);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, [user_id, initialItem, initialCount]);

    // 총액 및 총 수량 계산
    useEffect(() => {
        if (cartItems.length > 0) {
            const totalAmount = cartItems
                .filter(item => checkedItems.includes(item.pro_id))
                .reduce((sum, item) => sum + (item.pro_price * item.cart_quantity || 0), 0);
            const totalQuantity = cartItems
                .filter(item => checkedItems.includes(item.pro_id))
                .reduce((sum, item) => sum + (item.cart_quantity || 0), 0);

            setTotal(totalAmount);
            setTotalQuantity(totalQuantity);
            setCheckedTrueItems(cartItems.filter(item => checkedItems.includes(item.pro_id)));
        }
    }, [cartItems, checkedItems, setTotal, setTotalQuantity, setCheckedTrueItems]);

    // 개별 상품의 수량 변경 핸들러
    const handleQuantityChange = (id, quantity) => {
        const updatedItems = cartItems.map(item =>
            item.pro_id === id ? { ...item, cart_quantity: quantity } : item
        );
        setCartItems(updatedItems);
    };

    // 개별 체크박스 상태 변경 핸들러
    const handleCheckboxChange = (id) => {
        const updatedItems = cartItems.map(item =>
            item.pro_id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        setCartItems(updatedItems);

        const newCheckedItems = updatedItems.filter(item => item.isChecked).map(item => item.pro_id);
        setCheckedItems(newCheckedItems);
        setIsAllChecked(newCheckedItems.length === updatedItems.length);
    };

    // 전체 체크박스 상태 변경 핸들러
    const handleAllCheckboxChange = () => {
        const updatedItems = cartItems.map(item => ({ ...item, isChecked: !isAllChecked }));
        setCartItems(updatedItems);

        const newCheckedItems = updatedItems.filter(item => item.isChecked).map(item => item.pro_id);
        setCheckedItems(newCheckedItems);
        setIsAllChecked(!isAllChecked);
    };

    return (
        <div>
            <div className="item_list_container">
                <div className="item_list_header">
                    <div>
                        <input type="checkbox" checked={isAllChecked} onChange={handleAllCheckboxChange} />
                    </div>
                    <div>상품 이미지</div>
                    <div>상품 이름</div>
                    <div>수량</div>
                    <div>가격</div>
                    <div>총 가격</div>
                </div>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem
                            key={item.pro_id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onCheckboxChange={handleCheckboxChange}
                            isChecked={checkedItems.includes(item.pro_id)}
                        />
                    ))
                ) : (
                    <p>장바구니에 아이템이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default ItemBuyCartList;
