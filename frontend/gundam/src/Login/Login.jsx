import React, { useState } from "react";
import "./Login.css";
import { Link } from 'react-router-dom';
import "./Findingid";
import IdFindingModal from './Idfindingid';
import SecurityModal from './Security';
import { useLogin } from './LoginStatus';
import { useNavigate } from "react-router-dom";
//import axios from 'axios'; // axios import 추가
//import dbData from '../data/db.json';
//const importedUsers = dbData.users; // 중복 제거 후 사용

const Login = () => {
    const [loginId, setLoginId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const { onLoginSubmit } = useLogin();

    return (
        <div className="container_entire">
            <div className="container-login">
                <img className='leftimg' src='./image/gamn.png' alt="Gundam Logo" />
                <img className='rightimg' src='./image/gamm.png' alt="Gundam Logo" />

                <div className="wrap-login">
                    <form className="login-form" onSubmit={(e) => {
                        e.preventDefault();
                        onLoginSubmit(loginId, userPassword);
                    }} >
                        <a href="/"><img className='logo_img' src='./image/logo.png' alt="Gundam Logo" /></a>

                        <span className="login-form-title">
                        </span>

                        <div className="wrap-input">
                            <input type="text" className={loginId !== "" ? "has-val input" : "input"} name="loginId" placeholder="아이디"
                                size={20} value={loginId} minLength={4} maxLength={20}
                                onChange={(e) => setLoginId(e.target.value)}
                            />
                        </div>

                        <div className="wrap-input">
                            <input type="password" className={userPassword !== "" ? "has-val input" : "input"} name="userPassword" placeholder="비밀번호"
                                size={20} value={userPassword} minLength={6} maxLength={16}
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                        </div>

                        <div className="container-login-form-btn">
                            <input type="submit" className="login-form-btn" value="Login" />
                        </div>

                        <div className="text-center">
                            <span className="txt1">계정이 없으신가요? </span>
                            <Link to="/Login/Join" className="txt2" style={{ color: '#7547a3' }}>&nbsp;&nbsp;
                                <strong>회원가입 ✔</strong>
                            </Link>
                        </div>
                        <div>
                            <IdFindingModal href="./Login/Findingid" />
                            &nbsp;
                            <SecurityModal href="./Login/Security" />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    ); //return
}; //Login

export default Login;
