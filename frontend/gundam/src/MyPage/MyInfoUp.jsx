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

    // const { validation } = SignupForm();
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
                    setUserName(response.user_name);
                    setPhoneNumber(response.phone_num);
                    setEmail(response.email);
                    setPostCode(response.postcode);
                    setAddress(response.address);
                    setDtlAddress(response.dtl_address);
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
                            // document.querySelector("input[name='address']").focus();
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

    const validation = () => {

        // 이름 필수입력 체크
        if (userName.trim() === "") {
            alert("이름은 필수입력 항목입니다.");
            document.querySelector("input[name='userName']").focus();
            return false;
        }

        // 이름 입력길이 체크
        if (userName.length < 2 || userName.length > 10) {
            alert("이름은 2자 이상, 10자 이하로 입력하세요.");
            return false;
        }

        // 연락처 필수입력 체크
        if (phoneNumber.trim() === "") {
            alert("연락처는 필수입력 항목입니다.");
            document.querySelector("input[name='phoneNumber']").focus();
            return false;
        }

        // 연락처 입력길이 체크
        if (phoneNumber.length < 10 || phoneNumber.length > 11) {
            alert("연락처를 10자 이상, 11자 이하로 입력하세요.");
            return false;
        }

        // 이메일 필수입력 체크
        if (email.trim() === "") {
            alert("이메일은 필수입력 항목입니다.");
            document.querySelector("input[name='email']").focus();
            return false;
        }

        // 이메일 형식 체크
        if (!/^[0-9a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/i.test(email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            document.querySelector("input[name='email']").focus();
            return false;
        }

        // 주소 필수입력 체크
        if (postCode.trim() === "" || address.trim() === "") {
            alert("주소는 필수입력 항목입니다.");
            return false;
        }

        return true;
    };

    // 회원정보 변경 함수
    const onUpSubmit = () => {

        if (validation) {
            let url = "/user/myinfo_update";

            const data = {
                user_id: user_id, login_id: userInfo.login_id, user_name: userName, phone_num: phoneNumber,
                email, postcode: postCode, address, dtl_address: dtlAddress, birth: userInfo.birth, gender: userInfo.gender
            };

            apiCall(url, 'POST', data, null)
                .then((response) => {
                    alert('회원정보 변경이 완료됐습니다.');
                    // setJoinInfo(response);
                    // navigate("/MyInfoUp");
                    window.location.reload(); // page 새로고침
                }).catch((err) => {
                    alert(`** 회원정보 변경중 오류가 발생했습니다. 다시 시도해주세요.`);
                    navigate("/MyInfoUp");
                });
        }
    };

    return (
        <div className="mypageContainer">
            <MypageLeft />

            <form onSubmit={(e) => {
                e.preventDefault();

                const isConfirmed = window.confirm("회원정보를 수정하시겠습니까?");

                if (isConfirmed) {
                    if (validation()) {
                        onUpSubmit(userName, phoneNumber, email, postCode, address, dtlAddress);
                    }
                }
            }} >
                <div className="user_info_up">
                    <h1>회원정보 변경</h1>

                    <label htmlFor="userName">이름</label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        value={userName}
                        maxLength={10}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="이름을 입력하세요"
                    />

                    <label htmlFor="phoneNumber">연락처</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        value={phoneNumber}
                        maxLength={11}
                        onChange={(e) => {
                            if (/^\d*$/.test(e.target.value)) {
                                setPhoneNumber(e.target.value);
                            }
                        }}
                        placeholder="연락처를 입력하세요"
                    />

                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        maxLength={50}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                    />
                    <label></label>
                    <label></label>

                    <label className='juso_title' htmlFor="address">주소</label>
                    <input
                        id="postCode"
                        name="postCode"
                        value={postCode}
                        className='post_input'
                        type="text"
                        readOnly
                    />

                    <button type="button" id="address_kakao">주소 검색</button>
                    <label></label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        value={address}
                        placeholder='주소를 검색하세요.'
                        className='juso_input'
                        readOnly
                    />

                    <label htmlFor="dtlAddress">상세주소</label>
                    <input
                        id="dtlAddress"
                        name="dtlAddress"
                        type="text"
                        value={dtlAddress}
                        className='dtl_juso_input'
                        onChange={(e) => setDtlAddress(e.target.value)}
                        placeholder="상세 주소를 입력하세요"
                    />

                </div>
                <div className='btn_box'>
                    <button type="button" id='pwupdate' className='update_btn'>비밀번호변경</button>
                    <button type="submit" className='update_btn'>수정</button>
                </div>
            </form>
        </div>
    );
};

export default MyInfoUp;
