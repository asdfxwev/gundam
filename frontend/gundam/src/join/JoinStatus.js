import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../service/apiService';

// 로그인 상태를 관리할 Context 생성
const JoinContext = createContext();

// Provider를 통해 로그인 상태와 관련된 로직을 관리하는 컴포넌트
export function JoinProvider({ children }) {
    const [joinInfo, setJoinInfo] = useState('');
    const navigate = useNavigate();

    // 회원가입 함수
    const onJoinSubmit = (userName, loginId, userPassword, checkPassword, phoneNumber, 
                            email, postCode, address, dtlAddress, birth, gender) => {

        let url = "/user/join";
        const data = { user_name: userName, login_id: loginId, password: userPassword, phone_num: phoneNumber, 
            email: email, postcode: postCode, address: address, dtl_address: dtlAddress, birth: birth, gender: gender };

        apiCall(url, 'POST', data, null)
            .then((response) => {
                sessionStorage.setItem("loginInfo", JSON.stringify(response));  // 세션에 로그인 정보 저장
                alert('회원가입이 완료됐습니다. 로그인 후 접속해주세요.');
                setJoinInfo(response);
                navigate("/Login");
            }).catch((err) => {
                if (err === 502) {
                    alert("ID 또는 비밀번호를 확인하세요.");
                } else {
                    alert(`** 시스템 오류 발생: err=${err}`);
                }
                navigate("/Login/Join");
            });
    };

    return (
        <JoinContext.Provider value={{ joinInfo, onJoinSubmit }}>
            {children}
        </JoinContext.Provider>
    );
}

// 회원가입 성공 여부를 가져오는 훅

export function useJoin() {
    return useContext(JoinContext);
}