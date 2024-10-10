import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';
import { JoinProvider, useJoin } from './JoinStatus';
import { apiCall } from '../service/apiService';

const SignupForm = () => {
    //const { onJoinSubmit } = JoinProvider();
    // const { onJoinSubmit } = useJoin();
    const navigate = useNavigate();

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

    const [completeVal, setCompleteVal] = useState(true); //validation 결과 변수

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

    // Login_id 중복체크
    const [counts, setCounts] = useState(false);
    const checkloginid = async () => {
        
        if (loginId != null && loginId.length > 0) {
            let url = "/user/checkid";

            const data = {login_id: loginId};

            const response = await apiCall(url, 'GET', data, null)
                .then((response) => {
                    // if (response.exists) {  // 서버에서 `exists: true`를 반환하는 경우 (중복됨)
                        alert("해당 ID는 이미 사용 중입니다.");
                        document.getElementById("loginId").value = ''; // 입력창 초기화
                        setCounts(false);
                    // } else {  // 중복되지 않음
                    //     alert("해당 ID는 사용 가능합니다.");
                    //     setCounts(true);  // 중복 체크 통과 상태 저장
                    // }
                }).catch((err) => {
                    alert("ID 중복확인중 오류가 발생했습니다.");
                    
                });
        } else {
            alert("아이디를 입력하세요.");
        }
        // try {
            // let url = "/user/checkid";

            // const data = {login_id: loginId};

            // const response = await apiCall(url, 'GET', data, null)
            //     .then((response) => {
            //         if (response.exists) {  // 서버에서 `exists: true`를 반환하는 경우 (중복됨)
            //             alert("해당 ID는 이미 사용 중입니다.");
            //             document.getElementById("loginId").value = ''; // 입력창 초기화
            //             setCounts(false);
            //         } else {  // 중복되지 않음
            //             alert("해당 ID는 사용 가능합니다.");
            //             setCounts(true);  // 중복 체크 통과 상태 저장
            //         }
            //     }).catch((err) => {
            //         alert("ID 중복확인중 오류가 발생했습니다.");
            //     });
                
            // if (response.exists) {  // 서버에서 `exists: true`를 반환하는 경우 (중복됨)
            //     alert("해당 ID는 이미 사용 중입니다.");
            //     document.getElementById("loginId").value = ''; // 입력창 초기화
            //     setCounts(false);
            // } else {  // 중복되지 않음
            //     alert("해당 ID는 사용 가능합니다.");
            //     setCounts(true);  // 중복 체크 통과 상태 저장
            // }

        // } catch (error) {
        //     console.error("ID 중복체크 중 오류가 발생했습니다: ", error);
        // }
    }

    const validation = (e) => {
        // 입력값들이 null이면 해당 항목은 필수입력 항목이라는 메세지 노출 시키는 부분.

        

        // 비밀번호 필수입력 체크
        if (userPassword == null || userPassword == '') {
            alert("비밀번호는 필수입력 항목입니다.");
            document.querySelector("input[name='password']").focus();
            setCompleteVal = false;
        }
        // 비밀번호 입력길이 체크
        if (userPassword.length <= 5 || userPassword.length >= 17) {
            alert("비밀번호는 6이상, 16이하 입력하세요.");
            setCompleteVal = false;
        }
        // 비밀번호 입력값 일치 체크
        if (userPassword !== checkPassword) {
            alert("입력된 비밀번호가 일치하지 않습니다.<br>다시 확인해주세요.");
            // document.getElementById(checkPassword).focus();
            document.querySelector("input[name='checkPassword']").focus();
            setCompleteVal = false;
        }

        return completeVal;
    }

    // 회원가입
    const onJoinSubmit = async () => {

        if (completeVal && counts) {
            
            try {
                let url = "/user/join";

                const data = {
                    user_name: userName, login_id: loginId, password: userPassword, phone_num: phoneNumber,
                    email: email, postcode: postCode, address: address, dtl_address: dtlAddress, birth: birth, gender: gender
                };

                const response = await apiCall(url, 'POST', data, null)
                    .then((response) => {
                        sessionStorage.setItem("loginInfo", JSON.stringify(response));  // 세션에 로그인 정보 저장
                        alert('회원가입이 완료됐습니다. 로그인 후 접속해주세요.');
                        //setJoinInfo(response);
                        navigate("/Login");
                    }).catch((err) => {
                        if (err === 502) {
                            alert("입력정보를 확인하세요.");
                        } else {
                            alert(`** 시스템 오류 발생: err=${err}`);
                        }
                        navigate("/Login/Join");
                    });

                //console.log("회원가입 응답 데이터: ", response.data);
            } catch (error) {
                console.error("회원가입 중 에러가 발생했습니다: ", error);
            }
        
        } else {
            alert("입력정보를 다시 확인하세요.");
        }

    }

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
                        onBlur={() => {
                            if (userName.length <= 0) {
                                alert("이름은 필수입력 항목입니다.");
                            } else if (userName.length < 2 || userName.length > 10) {
                                alert("이름을 확인하세요");
                            }
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="loginId">아이디</label>
                    <div className='id_div'>
                        <input
                            id="loginId"
                            name="loginId"
                            type="text"
                            className='id_input'
                            value={loginId}
                            minLength={4} maxLength={20}
                            onChange={(e) => setLoginId(e.target.value)}
                            placeholder="아이디를 입력하세요"
                        />
                        <button type="button" onClick={checkloginid}>
                            중복 확인
                        </button>
                    </div>
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
                        // onBlur={() => {
                        //     if (userPassword == null || userPassword == '') {
                        //         alert("비밀번호는 필수입력 항목입니다.");
                        //         document.querySelector("input[name='password']").focus();
                        //         return;
                        //     }

                        //     if (userPassword.length <= 5 || userPassword.length >= 17) {
                        //         alert("비밀번호는 6이상, 16이하 입력하세요.");
                        //         return;
                        //     }
                        // }}
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
                        onChange={(e) => {
                            setCheckPassword(e.target.value)
                            //setIsAlertShown(false); // 사용자가 다시 입력할 때 경고 상태 리셋
                        }}
                        
                        placeholder="비밀번호를 입력하세요"
                        // onBlur={() => {
                        //     if (userPassword !== checkPassword) {
                        //         alert("비밀번호가 일치하지 않습니다.");
                        //         // document.getElementById('checkPassword').value = '';
                        //     }
                        // }}
                    />
                    {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
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
                    <div className='juso_div'>
                        <input
                            id="postCode"
                            name="postCode"
                            value={postCode}
                            // style={{ width: 60 }}
                            className='post_input'
                            type="text"
                            readOnly
                        /> &nbsp;
                        <input
                            type='text' id='address' name='address'
                            value={address}
                            placeholder='주소를 검색하세요.'
                            // style={{ width: 100 }}
                            className='juso_input'
                            readOnly
                        /> &nbsp;
                        <button type="button" id="address_kakao">주소 검색</button>
                    </div><br/>
                    <input
                        id="dtlAddress"
                        name="dtlAddress"
                        type="text"
                        value={dtlAddress}
                        onChange={(e) => setDtlAddress(e.target.value)}
                        placeholder="상세 주소를 입력하세요"
                    />
                    
                </div>

                {/* <div className="form-group">
                    <label htmlFor="dtlAddress">상세 주소</label>
                    <input
                        id="dtlAddress"
                        name="dtlAddress"
                        type="text"
                        value={dtlAddress}
                        onChange={(e) => setDtlAddress(e.target.value)}
                        placeholder="상세 주소를 입력하세요"
                    />
                </div> */}

                <div className="form-group">
                    <label htmlFor="birth">생년월일</label>
                    <div className='birth_div'>
                        <input
                            id="birth"
                            name="birth"
                            type="text"
                            value={birth}
                            className='birth_input'
                            minLength={6} maxLength={6}
                            onChange={(e) => {
                                if (/^\d*$/.test(e.target.value)) {
                                    setBirth(e.target.value);
                                }
                            }}
                            />&nbsp;-&nbsp;
                        <input
                            id="gender"
                            name="gender"
                            type="text"
                            value={gender}
                            className='gender_input'
                            minLength={1} maxLength={1}
                            onChange={(e) => {
                                if (/^\d*$/.test(e.target.value)) {
                                    setGender(e.target.value)
                                }
                            }}
                            />
                    </div>
                    {/* <input
                        id="birth"
                        name="birth"
                        type="date"
                        value={birth}
                        minLength={6} maxLength={6}
                        onChange={(e) => setBirth(e.target.value)}
                    /> */}
                </div>

                {/* <div className="form-group">
                    <label htmlFor="gender">성별</label>
                    <input
                        id="gender"
                        name="gender"
                        value={gender}
                        minLength={1} maxLength={1}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div> */}

                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignupForm;