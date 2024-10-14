import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../service/app-config';
import './MyPage.css';
import MypageLeft from './MypageLeft';
import SignupForm from '../join/join';
import { useLogin } from '../Login/LoginStatus';
import { apiCall } from '../service/apiService';


const MyInfoUp = () => {

    const { validation } = SignupForm();
    const { loginInfo, isLoggedIn, onLogout } = useLogin();
    const [user_id, setUser_id] = useState(''); // token 값으로 select한 user_id정보
    const [userInfo, setUserInfo] = useState(''); // user_id값으로 user 정보 get
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [postCode, setPostCode] = useState("");
    const [address, setAddress] = useState("");
    const [dtlAddress, setDtlAddress] = useState("");


    useEffect(() => {
        if (isLoggedIn) {
            let url = `/user/token_info`;

            const response = apiCall(url, 'POST', null, loginInfo)   // 세션스토리지에서 토큰만 사용할때
            // const response = apiCall(url, 'POST', null, loginInfo.token)
                .then((response) => {
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
                    setUserInfo(response);
                });
        }
    }, [user_id]); // user_id 값이 변경될 때 실행되도록 설정

    // 카카오 주소 api
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.onload = () => {
            const addressKakao = document.getElementById("address_kakao");
            if (addressKakao) {
                addressKakao.addEventListener("click", function () {
                    new window.daum.Postcode({
                        oncomplete: function (data) {
                            setPostCode(data.zonecode);
                            setAddress(data.address);
                            document.querySelector("input[name='address']").focus();
                        }
                    }).open();
                });
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 회원가입 함수
    const onUpSubmit = (userName, phoneNumber, email, postCode, address, dtlAddress) => {

        let url = "/user/myinfoupdate";
        const data = { userName, phoneNumber, email, postCode, address, dtlAddress };

        apiCall(url, 'POST', data, null)
            .then((response) => {
                alert('회원정보 변경이 완료됐습니다.');
                // setJoinInfo(response);
                navigate("/MyInfoUp");
            }).catch((err) => {
                alert(`** 회원정보 변경중 오류가 발생했습니다. 다시 시도해부세요.`);
                navigate("/MyInfoUp");
            });
    };

    return (
        <div className="mypageContainer">
            <MypageLeft />

            <div className="user_info">
                <h1>내정보 변경</h1>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    validation();
                    onUpSubmit(userName, phoneNumber, email, postCode, address, dtlAddress);
                }} >

                    <div className="">
                        <label htmlFor="userName">이름</label>
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            value={userInfo.user_name}
                            maxLength={10}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="이름을 입력하세요"
                        />
                    </div>

                    <div className="">
                        <label htmlFor="phoneNumber">연락처</label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={userInfo.phone_num}
                            maxLength={11}
                            onChange={(e) => {
                                if (/^\d*$/.test(e.target.value)) {
                                    setPhoneNumber(e.target.value);
                                }
                            }}
                            placeholder="연락처를 입력하세요"
                        />
                    </div>

                    <div className="">
                        <label htmlFor="email">이메일</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={userInfo.email}
                            maxLength={50}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">주소</label>
                        <div className='juso_div'>
                            <input
                                id="postCode"
                                name="postCode"
                                value={userInfo.postcode}
                                className='post_input'
                                type="text"
                                readOnly
                            /> &nbsp;
                            <input
                                type='text' id='address' name='address'
                                value={userInfo.address}
                                placeholder='주소를 검색하세요.'
                                className='juso_input'
                                readOnly
                            /> &nbsp;
                            <button type="button" id="address_kakao">주소 검색</button>
                        </div><br />
                        <input
                            id="dtlAddress"
                            name="dtlAddress"
                            type="text"
                            value={userInfo.dtl_address}
                            onChange={(e) => setDtlAddress(e.target.value)}
                            placeholder="상세 주소를 입력하세요"
                        />
                    </div>

                    <button type="submit">수정</button>
                </form>

            </div>
        </div>
    );
};

export default MyInfoUp;
