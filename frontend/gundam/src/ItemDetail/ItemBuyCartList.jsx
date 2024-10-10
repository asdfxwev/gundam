import React, { useState, useEffect } from 'react';
import './ItemDetail.css';
import axios from 'axios';
import { API_BASE_URL } from "../service/app-config";

// CartItem 컴포넌트 정의
const CartItem = ({ item, onQuantityChange, onCheckboxChange, isChecked }) => {
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            onQuantityChange(item.pro_id, newQuantity); // id를 item.id에서 item.pro_id로 변경
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
                    <img src={`${API_BASE_URL}/resources/productImg/${item.pro_id}/${item.pro_imgs}`} alt={item.pro_name} />
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

// ItemBuyCartList 컴포넌트 정의
const ItemBuyCartList = ({ setTotal, setTotalQuantity, setCheckedTrueItems, initialItem, initialCount }) => {
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(true);
    const user_id = JSON.parse(sessionStorage.getItem('loginInfo')).user_id;

    // 세션 스토리지에서 로그인 정보 가져오기
    const existingInquiries = JSON.parse(sessionStorage.getItem('loginInfo'));
    const userIdFromSession = existingInquiries ? existingInquiries.user_id : null;

    useEffect(() => {
        const fetchData = async () => {
            if (!userIdFromSession) {
                console.log('세션에서 사용자 ID를 사용할 수 없습니다.');
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/cart/${user_id}`);
                const cartData = response.data || [];

                // 장바구니 데이터 처리
                const combinedItems = [...cartData];

                // initialItem이 존재할 경우 추가 또는 수량 업데이트
                if (initialItem && initialCount) {
                    const existingItemIndex = combinedItems.findIndex(item => item.pro_id === initialItem.pro_id);
                    if (existingItemIndex >= 0) {
                        combinedItems[existingItemIndex].cart_quantity += initialCount; // 수량 업데이트
                    } else {
                        const initialCartItem = { ...initialItem, cart_quantity: initialCount, isChecked: true };
                        combinedItems.push(initialCartItem); // 장바구니에 새로운 아이템 추가
                    }
                }

                setCartItems(combinedItems);

                // 체크된 아이템들만 필터링
                const initiallyCheckedItems = combinedItems.filter(item => item.isChecked).map(item => item.pro_id);
                setCheckedItems(initiallyCheckedItems);
                setIsAllChecked(initiallyCheckedItems.length === combinedItems.length);

            } catch (error) {
                console.error('데이터 가져오기 오류:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, [userIdFromSession, initialItem, initialCount]);

    useEffect(() => {
        if (cartItems.length > 0) {
            const totalAmount = cartItems
                .filter(item => checkedItems.includes(item.pro_id))
                .reduce((sum, item) => sum + item.pro_price * item.cart_quantity, 0);
            const totalQuantity = cartItems
                .filter(item => checkedItems.includes(item.pro_id))
                .reduce((sum, item) => sum + item.cart_quantity, 0);

            setTotal(totalAmount);
            setTotalQuantity(totalQuantity);
            setCheckedTrueItems(cartItems.filter(item => item.isChecked));
        }
    }, [cartItems, checkedItems, setTotal, setTotalQuantity, setCheckedTrueItems]);

    const handleQuantityChange = (id, quantity) => {
        const updatedItems = cartItems.map(item => (item.pro_id === id ? { ...item, cart_quantity: quantity } : item));
        setCartItems(updatedItems);
    };

    const handleCheckboxChange = (id) => {
        const updatedItems = cartItems.map(item => (item.pro_id === id ? { ...item, isChecked: !item.isChecked } : item));
        setCartItems(updatedItems);

        // 체크된 아이템들을 업데이트
        const newCheckedItems = updatedItems.filter(item => item.isChecked).map(item => item.pro_id);
        setCheckedItems(newCheckedItems);
        setIsAllChecked(newCheckedItems.length === updatedItems.length);
    };

    const handleAllCheckboxChange = () => {
        const updatedItems = cartItems.map(item => ({ ...item, isChecked: !isAllChecked }));
        setCartItems(updatedItems);

        // 체크된 아이템들을 업데이트
        const newCheckedItems = updatedItems.filter(item => item.isChecked).map(item => item.pro_id);
        setCheckedItems(newCheckedItems);
        setIsAllChecked(newCheckedItems.length === updatedItems.length);
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
