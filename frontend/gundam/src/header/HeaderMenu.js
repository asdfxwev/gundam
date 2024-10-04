import React from 'react';
import './HeaderMenu.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiCall } from '../service/apiService';


const HeaderMenu = ({ data, smallTopMenu, menuAnimating, menuClosing, closeMenu }) => {
    const location = useLocation();
    const [closing, setClosing] = useState(null);
    const [productList, setProductLists] = useState(null);
    const [brandList, setBrandList] = useState(null);
    const [cateList, setCateList] = useState(null);
    const [pieceList, setPieceList] = useState(null);
    const [stateList, setStateList] = useState(null);

    const isMainPage = location.pathname !== '/';

    const navigate = useNavigate();

    const onLinkClick = (url) => {

        apiCall(url, 'GET', null, null)
        .then((response) => {
            alert(`** serverDataRequest 성공 url=${url}`);
            //sessionStorage.setItem("serverData", JSON.stringify(response));
            console.log(response.data);
            const { productList, brandList, cateList, pieceList, stateList } = response;
            setProductLists(productList);
            setBrandList(brandList);
            setCateList(cateList);
            setPieceList(pieceList);
            setStateList(stateList);

            navigate(url);
        }).catch((err) => {
            if (err.response.status===403) {
                alert(`** Server Reject : 접근권한이 없습니다. => ${err.response.status}`);
            }else if (err===502) { alert(`** 처리도중 오류 발생, err=${err}`);
            }else { alert(`** serverDataRequest 시스템 오류, err=${err}`); }
        }); //apiCall


    }

    return (
        <>
            {data.map((menu, index) => (
                <div key={index} onMouseLeave={closeMenu} className={`detailMenu ${smallTopMenu ? 'smallMenu' : ''} ${isMainPage ? 'absolute' : ''} ${menuAnimating ? 'menuAnimation' : ''} ${menuClosing ? 'menuClosing' : ''}`}>
                    {menu.menu.map((item, idx) => (
                        <div key={idx} className={item.id}><a href='/ItemList' onClick={() => {onLinkClick("/product/productList")}}>{item.name}</a></div>
                    ))}

                    {menu.items.map((item, idx) => (
                        <div key={idx} className={item.id}><a href='/ItemList' onClick={() => {onLinkClick("/adminproduct/productList")}}>{item.name}</a></div>
                    ))}
                    {menu.itemss.map((item, idx) => (
                        <div key={idx} className={item.id}><a href='/ItemList' onClick={() => {onLinkClick("/adminproduct/productList")}}>{item.name}</a></div>
                    ))}
                    {menu.itemsss && menu.itemsss.map((item, idx) => (
                        <div key={idx} className={item.id}><a href='/ItemList' onClick={() => {onLinkClick("/adminproduct/productList")}}>{item.name}</a></div>
                    ))}
                    {menu.itemssss && menu.itemssss.map((item, idx) => (
                        <div key={idx} className={item.id}><a href='/ItemList' onClick={() => {onLinkClick("/adminproduct/productList")}}>{item.name}</a></div>
                    ))}
                    {menu.image.map((image, idx) => (
                        <div key={idx} className={image.id}><a href='/ItemList' onClick={() => {onLinkClick("/adminproduct/productList")}}>{image.name}</a></div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default HeaderMenu;
