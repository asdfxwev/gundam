import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';
import { JoinProvider, useJoin } from './JoinStatus';

const SignupForm = () => {
    //const { onJoinSubmit } = JoinProvider();
    const { onJoinSubmit } = useJoin();

    const [userName, setUserName] = useState("");
    const [loginId, setLoginId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [postCode, setPostCode] = useState("");
    const [address, setAddress] = useState("");
    const [dtlAddress, setDtlAddress] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");


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

    return (
        <div className='join_box'>
            <form className="signup-form" onSubmit={(e) => {
                        e.preventDefault();
                        onJoinSubmit(userName, loginId, userPassword, checkPassword, phoneNumber, 
                                        email, postCode, address, dtlAddress, birth, gender);
                    }} >
                
                <h1 className='logo2'>
                    <a href="/"><img src='../../image/logo.png' alt='/' /></a>
                </h1>

                <div className="form-group">
                    <label htmlFor="userName">이름</label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        value={userName}
                        minLength={2} maxLength={10}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="이름을 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="loginId">아이디</label>
                    <input
                        id="loginId"
                        name="loginId"
                        type="text"
                        value={loginId}
                        minLength={4} maxLength={20}
                        onChange={(e) => setLoginId(e.target.value)}
                        placeholder="아이디를 입력하세요"
                    />
                    <button    // axios 통신 select count(*) 쿼리 생성 후 결과값리턴으로 기능동작해야함
                        type="button"
                        onClick={async () => {
                            // ex. onLoginCheck(loginId)

                            // if (!values.loginId) {
                            //     alert('아이디를 다시 확인하세요.');
                            //     return;
                            // }
                            // if (errors.loginId) {
                            //     alert(errors.loginId);
                            //     return;
                            // }
                        }}
                    >
                        중복 확인
                    </button>
                </div>

                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={userPassword}
                        minLength={6} maxLength={16}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="checkPassword">비밀번호 확인</label>
                    <input
                        id="checkPassword"
                        name="checkPassword"
                        type="password"
                        value={checkPassword}
                        minLength={6} maxLength={16}
                        onChange={(e) => setCheckPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">핸드폰 번호</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        value={phoneNumber}
                        minLength={10} maxLength={11}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="핸드폰 번호를 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="address">주소</label>
                    <input
                        id="postCode"
                        name="postCode"
                        value={postCode}
                        style={{width:50}}
                        type="text"
                        readOnly
                    />
                    <input 
                        type='text' id='address' name='address'
                        value={address}
                        placeholder='주소를 검색하세요.'
                        readOnly
                    />
                    <button type="button" id="address_kakao">주소 검색</button>
                </div>

                <div className="form-group">
                    <label htmlFor="dtlAddress">상세 주소</label>
                    <input
                        id="dtlAddress"
                        name="dtlAddress"
                        type="text"
                        value={dtlAddress}
                        onChange={(e) => setDtlAddress(e.target.value)}
                        placeholder="상세 주소를 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="birth">생년월일</label>
                    <input
                        id="birth"
                        name="birth"
                        type="date"
                        value={birth}
                        minLength={6} maxLength={6}
                        onChange={(e) => setBirth(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">성별</label>
                    <input
                        id="gender"
                        name="gender"
                        value={gender}
                        minLength={1} maxLength={1}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>

                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignupForm;
