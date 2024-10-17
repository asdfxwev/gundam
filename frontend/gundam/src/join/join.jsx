import React, { useEffect, useState } from 'react';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../service/apiService';

const SignupForm = () => {
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

    const [completeVal, setCompleteVal] = useState(false); //validation 결과 변수

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
        // 아이디 입력길이 체크
        if (loginId.length < 4 || loginId.length > 16) {
            alert("ID를 4자 이상, 16자 이하로 입력하세요.");
            return;
        }

        if (loginId != null && loginId.length > 0) {
            //get방식은 data 로 전달할수없고 url에 담아서 보내야함
            let url = `/user/checkid/${loginId}`;

            const response = apiCall(url, 'get', null, null)
                .then((response) => {
                    alert("사용 가능한 ID 입니다.");
                    setCounts(true);
                }).catch((err) => {
                    alert("해당 ID는 이미 사용 중입니다.");
                    document.getElementById("loginId").value = ''; // 입력창 초기화
                    setCounts(false);
                });
        } else {
            alert("아이디를 입력하세요.");
        }

    }

    const validation = () => {

        // 이름 필수입력 체크
        if (userName.trim() === "") {
            alert("이름은 필수입력 항목입니다.");
            document.querySelector("input[name='userName']").focus();
            setCompleteVal(false);
            return;
        }
        // 이름 입력길이 체크
        if (userName.length < 2 || userName.length > 10) {
            alert("이름은 2자 이상, 10자 이하로 입력하세요.");
            setCompleteVal(false);
            return;
        }
        // 아이디 필수입력 체크
        if (loginId.trim() === "") {
            alert("아이디는 필수입력 항목입니다.");
            document.querySelector("input[name='loginId']").focus();
            setCompleteVal(false);
            return;
        }
        // 아이디 입력길이 체크
        if (loginId.length < 4 || loginId.length > 16) {
            alert("ID를 4자 이상, 16자 이하로 입력하세요.");
            setCompleteVal(false);
            return;
        }
        // 아이디 중복체크
        if (!counts) {
            alert("ID 중복을 확인하세요.");
            setCompleteVal(false);
            return;
        }
        // 비밀번호 필수입력 체크
        if (userPassword.trim() === "") {
            alert("비밀번호는 필수입력 항목입니다.");
            document.querySelector("input[name='password']").focus();
            setCompleteVal(false);
            return;
        }
        // 비밀번호 입력길이 체크
        if (userPassword.length < 6 || userPassword.length > 16) {
            alert("비밀번호는 6자 이상, 16자 이하로 입력하세요.");
            setCompleteVal(false);
            return;
        }
        // 비밀번호 입력값 일치 체크
        if (userPassword !== checkPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            document.querySelector("input[name='checkPassword']").focus();
            setCompleteVal(false);
            return;
        }
        // 연락처 필수입력 체크
        if (phoneNumber.trim() === "") {
            alert("연락처는 필수입력 항목입니다.");
            document.querySelector("input[name='phoneNumber']").focus();
            setCompleteVal(false);
            return;
        }
        // 연락처 입력길이 체크
        if (phoneNumber.length < 10 || phoneNumber.length > 11) {
            alert("연락처를 10자 이상, 11자 이하로 입력하세요.");
            setCompleteVal(false);
            return;
        }
        // 이메일 필수입력 체크
        if (email.trim() === "") {
            alert("이메일은 필수입력 항목입니다.");
            document.querySelector("input[name='email']").focus();
            setCompleteVal(false);
            return;
        }
        // 이메일 형식 체크
        if (!/^[0-9a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/i.test(email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            document.querySelector("input[name='email']").focus();
            setCompleteVal(false);
            return;
        }
        // 주소 필수입력 체크
        if (postCode.trim() === "" || address.trim() === "") {
            alert("주소는 필수입력 항목입니다.");
            setCompleteVal(false);
            return;
        }
        // 생년월일 필수입력 체크
        if (birth.trim() === "") {
            alert("생년월일은 필수입력 항목입니다.");
            document.querySelector("input[name='birth']").focus();
            setCompleteVal(false);
            return;
        }
        // 생년월일 입력길이 체크
        if (birth.length != 6) {
            alert("생년월일이 올바르지 않습니다.");
            setCompleteVal(false);
            return;
        }
        // 성별 필수입력 체크
        if (gender.trim() === "") {
            alert("성별은 필수입력 항목입니다.");
            document.querySelector("input[name='gender']").focus();
            setCompleteVal(false);
            return;
        }

        setCompleteVal(true);

        return completeVal;
    };

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
                        navigate("/Login");
                    }).catch((err) => {
                        if (err === 502) {
                            alert("입력정보를 확인하세요.")
                        } else {
                            alert(`** 회원가입을 실패했습니다 다시 시도해주세요.`);
                        }
                        navigate("/Login/Join");
                    });
            } catch (error) {
                console.error("회원가입 중 에러가 발생했습니다: ", error);
            }

        }

    }

    return (
        <div className='join_box'>
            <form className="signup-form" onSubmit={(e) => {
                e.preventDefault();
                validation();
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
                        maxLength={10}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="이름을 입력하세요"
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
                            maxLength={16}
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
                        maxLength={16}
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
                        maxLength={16}
                        onChange={(e) => setCheckPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                <div className="form-group">
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
                </div>

                <div className="form-group">
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
                </div>

                <div className="form-group">
                    <label htmlFor="address">주소</label>
                    <div className='juso_div'>
                        <input
                            id="postCode"
                            name="postCode"
                            value={postCode}
                            className='post_input'
                            type="text"
                            readOnly
                        /> &nbsp;
                        <input
                            type='text' id='address' name='address'
                            value={address}
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
                        value={dtlAddress}
                        onChange={(e) => setDtlAddress(e.target.value)}
                        placeholder="상세 주소를 입력하세요"
                    />

                </div>

                <div className="form-group">
                    <label htmlFor="birth">생년월일</label>
                    <div className='birth_div'>
                        <input
                            id="birth"
                            name="birth"
                            type="text"
                            value={birth}
                            className='birth_input'
                            maxLength={6}
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
                            maxLength={1}
                            onChange={(e) => {
                                if (/^\d*$/.test(e.target.value)) {
                                    setGender(e.target.value);
                                }
                            }}
                        />
                    </div>
                </div>

                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignupForm;