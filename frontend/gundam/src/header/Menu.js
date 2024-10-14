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
    const [user_id, setUser_id] = useState(''); // token 값으로 select한 user_id정보
    const [userInfo, setUserInfo] = useState(''); // user_id값으로 user 정보 get

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

    // 최초 로드 시 로그인true면 토큰값으로 user정보 가져와야하는 부분
    useEffect(() => {
        if (isLoggedIn) {
            let url = `/user/token_info`;

            // const response = apiCall(url, 'POST', null, loginInfo)   // 세션스토리지에서 토큰만 사용할때
            const response = apiCall(url, 'POST', null, loginInfo.token)
                .then((response) => {
                    // sessionStorage.setItem("userId", JSON.stringify(response));  // 세션에 로그인 정보 저장
                    setUser_id(response);

                }).catch((err) => {
                    onLogout(); // 로그아웃 상태로 처리
                    alert("사용자 정보를 찾을수 없습니다. 다시 로그인 하세요.");
                });
        }

    }, [isLoggedIn, loginInfo, onLogout]);

    useEffect(() => {
        if (user_id && user_id.length > 0) {
            let url = `/user/user_info`;

            const data = { user_id: user_id };
            
            const response = apiCall(url, 'POST', data, null)
                .then((response) => {
                    // sessionStorage.setItem("userInfo", JSON.stringify(response));  // 세션에 로그인 정보 저장
                    setUserInfo(response);
                });
        }
    }, [user_id]); // user_id 값이 변경될 때 실행되도록 설정

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
                            <div className={`h_right h_login ${smallTopMenu ? 'blackText' : ''} `}>{userInfo.user_name} 님</div>
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
