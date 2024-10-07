import React, { useState, useEffect } from 'react';
import './ItemDetail.css';
import axios from 'axios';

const CartItem = ({ item, onQuantityChange, onCheckboxChange, isChecked }) => {
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            onQuantityChange(item.id, newQuantity);
        }
    };

    return (
        <div className="buy_item_box">
            <div>
                <input type="checkbox" checked={isChecked} onChange={() => onCheckboxChange(item.id)} />
            </div>
            <div>
                <a href={`ItemList/ItemDetail/${item.id}`}>
                    <img src={item.image} alt={item.name} />
                </a>
            </div>
            <div> {item.name} </div>
            <div className="buy_count_box">
                <button onClick={() => handleQuantityChange(item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => handleQuantityChange(item.quantity + 1)}>+</button>
            </div>
            <div> {item.price.toLocaleString()} 원 </div>
            <div> {(item.price * item.quantity).toLocaleString()} 원 </div>
        </div>
    );
};

const ItemBuyCartList = ({ setTotal, setTotalQuantity, setCheckedTrueItems, initialItem, initialCount }) => {
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);

    const existingInquiries = JSON.parse(localStorage.getItem('loginInfo'));
    const userId = existingInquiries.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
                const userData = userResponse.data;

                if (!userData.cart) {
                    userData.cart = [];
                }

                let combinedItems = userData.cart;

                if (initialItem && initialCount) {
                    const existingItemIndex = combinedItems.find(item => item.id === initialItem.id);

                    if (existingItemIndex >= 0) {
                        combinedItems[existingItemIndex].quantity += initialCount;
                    } else {
                        const initialCartItem = { ...initialItem, quantity: initialCount, isChecked: true };
                        combinedItems = [initialCartItem, ...userData.cart];
                    }
                }

                setCartItems(combinedItems);

                // Filter items where isChecked is true
                const initiallyCheckedItems = combinedItems.filter(item => item.isChecked).map(item => item.id);
                setCheckedItems(initiallyCheckedItems);
                setIsAllChecked(initiallyCheckedItems.length === combinedItems.length); // Initially set all items as checked
                // setcheckedTrueItems(initiallyCheckedItems);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };
        fetchData();
    }, [userId, initialItem, initialCount]);

    useEffect(() => {
        if (cartItems.length > 0) {
            const totalAmount = cartItems
                .filter(item => checkedItems.includes(item.id))
                .reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotal(totalAmount);

            const totalQuantity = cartItems
                .filter(item => checkedItems.includes(item.id))
                .reduce((sum, item) => sum + item.quantity, 0);
            setTotalQuantity(totalQuantity);

            const trueCheckedItems = cartItems.filter(item => item.isChecked);
            setCheckedTrueItems(trueCheckedItems);
        }
    }, [cartItems, checkedItems, setTotal, setTotalQuantity, setCheckedTrueItems]);

    const handleQuantityChange = async (id, quantity) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
        );
        setCartItems(updatedItems);

        try {
            const userData = { ...existingInquiries, cart: updatedItems };
            await axios.put(`http://localhost:3001/users/${userId}`, userData);
        } catch (error) {
            console.error('수량을 업데이트하는 중 오류 발생:', error);
        }
    };

    const handleCheckboxChange = async (id) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        setCartItems(updatedItems);

        const updatedCheckedItems = updatedItems.filter(item => item.isChecked).map(item => item.id);
        setCheckedItems(updatedCheckedItems);
        setIsAllChecked(updatedCheckedItems.length === updatedItems.length);
        // setcheckedTrueItems(updatedCheckedItems);

        try {
            const userData = { ...existingInquiries, cart: updatedItems };
            await axios.put(`http://localhost:3001/users/${userId}`, userData);
        } catch (error) {
            console.error('체크박스 상태를 업데이트하는 중 오류 발생:', error);
        }
    };

    const handleAllCheckboxChange = async () => {
        const updatedItems = cartItems.map(item => ({ ...item, isChecked: !isAllChecked }));
        setCartItems(updatedItems);

        const updatedCheckedItems = updatedItems.filter(item => item.isChecked).map(item => item.id);
        setCheckedItems(updatedCheckedItems);
        setIsAllChecked(!isAllChecked);
        // setcheckedTrueItems(updatedCheckedItems);

        try {
            const userData = { ...existingInquiries, cart: updatedItems };
            await axios.put(`http://localhost:3001/users/${userId}`, userData);
        } catch (error) {
            console.error('전체 체크박스 상태를 업데이트하는 중 오류 발생:', error);
        }
    };

    const handleRemoveCheckedItems = async () => {
        try {
            const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
            const userData = userResponse.data;

            const updatedItems = userData.cart.filter(item => !checkedItems.includes(item.id));

            await axios.put(`http://localhost:3001/users/${userId}`, { ...userData, cart: updatedItems });

            setCartItems(updatedItems);
            setCheckedItems([]);
            setIsAllChecked(false);
        } catch (error) {
            console.error('Error deleting items:', error.response ? error.response.data : error.message);
        }
    };

    const handleRemoveAllItems = async () => {
        try {
            const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
            const userData = userResponse.data;

            userData.cart = [];

            await axios.put(`http://localhost:3001/users/${userId}`, userData);

            setCartItems([]);
            setCheckedItems([]);
            setIsAllChecked(false);
        } catch (error) {
            console.error('Error clearing cart:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <div className="item_list_container">
                <div className="item_list_header">
                    <div>
                        <input
                            type="checkbox"
                            checked={isAllChecked}
                            onChange={handleAllCheckboxChange}
                        />
                    </div>
                    <div>상품 이미지</div>
                    <div>상품 이름</div>
                    <div>수량</div>
                    <div>가격</div>
                    <div>총 가격</div>
                </div>
                {cartItems.map((item) => (
                    <CartItem
                        key={item.pro_id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onCheckboxChange={handleCheckboxChange}
                        isChecked={checkedItems.includes(item.pro_id)}
                    />
                ))}
                {/* <button className='button-size' onClick={handleRemoveCheckedItems}>선택한 상품 삭제</button>
                <button className='button-size' onClick={handleRemoveAllItems}>전체 상품 삭제</button> */}
            </div>
        </div>
    );
};

export default ItemBuyCartList;