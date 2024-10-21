import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../service/apiService';

// 로그인 상태를 관리할 Context 생성
const LoginContext = createContext();

// Provider를 통해 로그인 상태와 관련된 로직을 관리하는 컴포넌트
export function LoginProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginInfo, setLoginInfo] = useState('');
    const navigate = useNavigate();

    // 로그인 정보 확인 (sessionStorage에서 로그인 상태 확인)
    useEffect(() => {
        const loginCheck = JSON.parse(sessionStorage.getItem("loginInfo"));
        if (loginCheck !== null && loginCheck.length > 0) {  // 세션스토리지에서 토큰만 사용할때
        // if (loginCheck !== null && loginCheck.token != null) {
            setIsLoggedIn(true);
            setLoginInfo(loginCheck);
            //alert(`** sessionStorage 로그인 확인 token=${loginCheck}`);
        }
    }, []);

    // 로그인 함수
    const onLoginSubmit = (loginId, userPassword) => {

        let url = "/user/login";
        const data = { login_id: loginId, password: userPassword };

        apiCall(url, 'POST', data, null)
            .then((response) => {
                sessionStorage.setItem("loginInfo", JSON.stringify(response));  // 세션에 로그인 정보 저장
                alert('로그인 되었습니다.');
                setIsLoggedIn(true);
                setLoginInfo(response);
                // alert("로그인 토큰값 확인 => " + response);
                navigate("/");
            }).catch((err) => {
                setIsLoggedIn(false);
                setLoginInfo('');
                // alert(err); 오류 status

                if (err === 502) {
                    alert("ID 또는 비밀번호를 확인하세요.");
                } else if (err === 429) {
                    alert("로그인 시도 횟수가 초과됐습니다. 비밀번호 변경 후 다시 로그인하세요.");
                } else if (err === 401) {
                    alert("ID 또는 비밀번호를 확인하세요.");
                } else {
                    alert("입력하신 정보는 탈퇴 되었거나 없는정보 입니다.");
                }

                navigate("/Login");
            });
    };

    // 로그아웃 함수
    const onLogout = () => {
        let url = "/user/logout";
        // alert(`** 로그아웃 토큰 확인: ${loginInfo}`);
        apiCall(url, 'GET', null, loginInfo)
            .then(() => {
                sessionStorage.clear();
                setIsLoggedIn(false);
                setLoginInfo('');
                navigate("/");
            }).catch((err) => {
                alert(`** 시스템 오류 발생: err=${err}`);
            });
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, loginInfo, onLoginSubmit, onLogout }}>
            {children}
        </LoginContext.Provider>
    );
}

// 로그인 상태를 가져오는 훅
export function useLogin() {
    return useContext(LoginContext);
}