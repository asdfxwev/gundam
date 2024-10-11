import './Menu.css';
import HeaderMenu from './HeaderMenu';
import HeaderMenuData from './HeaderMenuData';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderSearch from './HeaderSearch';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../Login/LoginStatus';
import { apiCall } from '../service/apiService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser, faShoppingCart, faSearch, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
    const [visibleMenu, setVisibleMenu] = useState(null);
    const [smallTopMenu, setSmallTopMenu] = useState(false);
    const [menuAnimating, setMenuAnimating] = useState(false); // 메뉴 애니메이션 상태 추가
    const [menuClosing, setMenuClosing] = useState(false); // 메뉴 닫기 애니메이션 상태 추가
    const location = useLocation();
    const { loginInfo, isLoggedIn, onLogout } = useLogin();
    const [userInfo, setUserInfo] = useState(''); // token 값으로 select한 user정보

    const Menu = (menu) => {
        if (visibleMenu === menu) {
            setMenuClosing(true); // 메뉴 닫기 애니메이션 상태 설정
            setTimeout(() => {
                setVisibleMenu(null);
                setMenuAnimating(false);
                setMenuClosing(false); // 애니메이션 상태 초기화
            }, 500); // 애니메이션 지속 시간과 동일하게 설정
        } else {
            setVisibleMenu(menu);
            setMenuAnimating(true);
            setMenuClosing(false);
        }
        // scroll();
    };

    
    // if (isLoggedIn) {
    //     let url = `/user/token_info`;

    //     const data = {token: loginInfo};

    //     const response = apiCall(url, 'POST', data, null)
    //         .then((response) => {
    //             setUserInfo(response);
    //             alert("토큰으로 사용자 정보 가져왔음!"+userInfo);
    //         }).catch((err) => {
    //             isLoggedIn(false);
    //             alert("사용자 정보를 찾을수 없습니다. 다시 로그인 하세요.");
    //         });
    // }

    // 화면 로드 시 토큰값이 있으면 user정보를 가져와야하는 부분
    // useEffect(() => {
        
    //     if (isLoggedIn) {
    //         const fetchUserInfo = async () => {
    //             try {
    //                 console.log("토큰값 확인 => ", loginInfo);
    //                 const url = `/user/token_info`;
    //                 const data = { token: loginInfo };
    //                 const response = await apiCall(url, 'POST', data, null);
    //                 setUserInfo(response);
    //                 console.log("토큰으로 사용자 정보 가져왔음!", userInfo);
    //             } catch (err) {
    //                 onLogout(); // 로그아웃 상태로 처리
    //                 alert("사용자 정보를 찾을 수 없습니다. 다시 로그인하세요.");
    //             }
    //         };

    //         fetchUserInfo(); // 비동기 함수 호출
    //     }
    // }, [isLoggedIn, loginInfo, onLogout]);

    useEffect(() => {
        const scroll = () => {
            if (window.scrollY > window.innerHeight * 0.3 && location.pathname === '/') {
                setSmallTopMenu(true);
            } else {
                setSmallTopMenu(false);
            }
        };
        window.addEventListener('scroll', scroll);

        return () => {
            window.removeEventListener('scroll', scroll);
        };
    }, []);

    const handleLinkClick = () => {
        setMenuClosing(true);
        setTimeout(() => {
            setVisibleMenu(null);
            setMenuAnimating(false);
            setMenuClosing(false);
        }, 500);
    };

    const navigate = useNavigate();

    const closeMenu = () => {
        if (visibleMenu) {
            setMenuClosing(true);
            setTimeout(() => {
                setVisibleMenu(null);
                setMenuAnimating(false);
                setMenuClosing(false);
            }, 500);
        }
    };

    const isMainPage = location.pathname !== '/';
    if (location.pathname.includes('Login')) return null;

    return (
        <>
            <div className={`h_main_container ${smallTopMenu ? 'smallHeadMenu' : ''} ${isMainPage ? 'noPosition' : ''} `}>
                <div className="h_menu_container">
                    <div className={`h_menu ${smallTopMenu ? 'blackText' : ''}`} onClick={() => Menu('headerMenu')}>건프라</div>
                    <div className={`h_menu ${smallTopMenu ? 'blackText' : ''}`} onClick={() => Menu('headerMenu1')}>애니프라</div>
                    <div className={`h_menu ${smallTopMenu ? 'blackText' : ''}`} onClick={() => Menu('headerMenu2')}>피규어</div>
                    <div className={`h_menu ${smallTopMenu ? 'blackText' : ''}`} onClick={() => Menu('etc')}>기타</div>
                </div>
                
                <div className="h_right_container">
                    {isLoggedIn ? (
                        <>
                            <div className={`h_right h_login ${smallTopMenu ? 'blackText' : ''} `}>{loginInfo.user_name} 님</div>
                            <div style={{ cursor: 'pointer' }} className={`h_right h_logout ${smallTopMenu ? 'blackText' : ''} `} onClick={onLogout}>
                                <FontAwesomeIcon icon={faRightFromBracket} /> 로그아웃</div>
                            <div className={`h_right h_mypage ${smallTopMenu ? 'blackText' : ''} `}>
                                <a href='/Mypage' className={`${isMainPage ? 'noPosition' : ''}`}><FontAwesomeIcon icon={faUser} /> 마이페이지</a>
                            </div>
                            <div className={`h_right h_shopping ${smallTopMenu ? 'blackText' : ''} `}>
                                <a href='/Cart' className={`${isMainPage ? 'noPosition' : ''}`}><FontAwesomeIcon icon={faShoppingCart} /> 장바구니</a>
                            </div>
                        </>) : (
                        <>
                            <div className={`h_right h_join ${smallTopMenu ? 'blackText' : ''} `}>
                                <a href='/Login/Join' className={`${isMainPage ? 'noPosition' : ''}`}><FontAwesomeIcon icon={faUserPlus} /> 회원가입</a>
                            </div>
                            <div className={`h_right h_login ${smallTopMenu ? 'blackText' : ''} `}>
                                <a href='/Login' className={`${isMainPage ? 'noPosition' : ''}`}><FontAwesomeIcon icon={faSignInAlt} /> 로그인</a>
                            </div>
                            <div className={`h_right h_mypage ${smallTopMenu ? 'blackText' : ''} `}>
                                <a href='/Login' className={`${isMainPage ? 'noPosition' : ''}`}><FontAwesomeIcon icon={faUser} /> 마이페이지</a>
                            </div>
                            <div className={`h_right h_shopping ${smallTopMenu ? 'blackText' : ''} `}>
                                <a href='/Login' className={`${isMainPage ? 'noPosition' : ''}`}><FontAwesomeIcon icon={faShoppingCart} /> 장바구니</a>
                            </div>
                        </>)
                    }
                </div>
            </div>

            {visibleMenu === 'headerMenu' && <HeaderMenu data={HeaderMenuData.headerMenu} smallTopMenu={smallTopMenu} onLinkClick={handleLinkClick} menuAnimating={menuAnimating} menuClosing={menuClosing} closeMenu={closeMenu} />}
            {visibleMenu === 'headerMenu1' && <HeaderMenu data={HeaderMenuData.headerMenu1} smallTopMenu={smallTopMenu} onLinkClick={handleLinkClick} menuAnimating={menuAnimating} menuClosing={menuClosing} closeMenu={closeMenu} />}
            {visibleMenu === 'headerMenu2' && <HeaderMenu data={HeaderMenuData.headerMenu2} smallTopMenu={smallTopMenu} onLinkClick={handleLinkClick} menuAnimating={menuAnimating} menuClosing={menuClosing} closeMenu={closeMenu} />}
            {visibleMenu === 'etc' && <HeaderMenu data={HeaderMenuData.etc} smallTopMenu={smallTopMenu} onLinkClick={handleLinkClick} menuAnimating={menuAnimating} menuClosing={menuClosing} closeMenu={closeMenu} />}
            {visibleMenu === 'headerSearch' && <HeaderSearch onLinkClick={handleLinkClick} smallTopMenu={smallTopMenu} menuAnimating={menuAnimating} menuClosing={menuClosing} closeMenu={closeMenu} />}
        </>
    );
}
