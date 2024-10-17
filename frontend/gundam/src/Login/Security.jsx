import React, { useState } from 'react';
import Modal from 'react-modal';
import '../MyPage/MyPage.css';
// import './Idfindingid.css';
// import axios from 'axios';
import { apiCall } from '../service/apiService';
// import { useNavigate } from 'react-router-dom';
import MyPage from './../MyPage/MyPage';

Modal.setAppElement('#root');

function PasswordFindingModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [login_id, setLogin_Id] = useState('');
    const [phone_num, setPhone_Num] = useState('');
    const [userInfo, setUserInfo] = useState(''); // 사용자 정보
    const [userCheck, setUserCheck] = useState(false); // 사용자 인증 상태
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const validation = () => {

        if (!userCheck) {
            // 아이디 필수입력 체크
            if (login_id.trim() === "") {
                alert("아이디는 필수입력 항목입니다.");
                document.querySelector("input[name='login_id']").focus();
                return false;
            }
            // 아이디 입력길이 체크
            if (login_id.length < 4 || login_id.length > 16) {
                alert("ID를 4자 이상, 16자 이하로 입력하세요.");
                return false;
            }
            // 연락처 필수입력 체크
            if (phone_num.trim() === "") {
                alert("연락처는 필수입력 항목입니다.");
                document.querySelector("input[name='phone_num']").focus();
                return false;
            }
            // 연락처 입력길이 체크
            if (phone_num.length < 10 || phone_num.length > 11) {
                alert("연락처를 10자 이상, 11자 이하로 입력하세요.");
                return false;
            }

        } else {
            if (password.trim() === "") {
                alert("비밀번호는 필수 입력 항목입니다.");
                return false;
            }
            if (password.length < 6 || password.length > 16) {
                alert("비밀번호는 6자 이상, 16자 이하로 입력하세요.");
                return false;
            }
            if (password !== checkPassword) {
                alert("비밀번호가 일치하지 않습니다.");
                return false;
            }

        }
        return true;
    };

    const handleFindPassword = (e) => {
        e.preventDefault();

        if (validation()) {

            let url = "/user/pwUserCheck";
            const data = { login_id, phone_num };

            apiCall(url, 'POST', data, null)
                .then((response) => {
                    alert('정보가 확인됐습니다. 비밀번호를 변경하세요.');
                    setUserInfo(response);
                    setPhone_Num('');
                    setUserCheck(true);
                }).catch((err) => {
                    alert('입력 정보가 올바르지않습니다. 다시 확인하세요.');
                    setUserInfo('');
                    setPhone_Num('');
                    setUserCheck(false);
                });
        }
    }

    const updatePassword = (e) => {

        e.preventDefault();

        if (validation()) {
            let url = "/user/pwUpdate";
            const data = { user_id: userInfo.user_id, password: password };

            apiCall(url, 'POST', data, null)
                .then((response) => {
                    alert('비밀번호 변경이 완료되었습니다.');
                    closeModal();
                }).catch((err) => {
                    alert('비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.');
                    setUserCheck(false);
                });
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setUserInfo('');
        setUserCheck(false);
        setIsOpen(false);
    }

    return (
        <span className='modalcss'>
            <button className='update_btn' type='button' onClick={openModal}>비밀번호 변경</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="비밀번호 변경"
            >
                <h2>비밀번호 변경</h2>

                {!userCheck ? (
                    <form onSubmit={handleFindPassword}>
                        <input
                            className='pop_input'
                            type='text'
                            id='login_id'
                            name='login_id'
                            placeholder='아이디를 입력하세요.'
                            maxLength={10}
                            onChange={(e) => setLogin_Id(e.target.value)} />
                        <input
                            className='pop_input'
                            type='text'
                            id='phone_num'
                            name='phone_num'
                            value={phone_num}
                            placeholder='연락처를 입력하세요.'
                            maxLength={11}
                            onChange={(e) => {
                                if (/^\d*$/.test(e.target.value)) {
                                    setPhone_Num(e.target.value);
                                }
                            }} />
                        <div className='pop_btn_box'>
                            <button type='submit' className='pop_btn'>찾기</button>
                            <button onClick={closeModal} className='pop_btn'>닫기</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={updatePassword}>
                        <br />
                        <label htmlFor='password' className='pop_label'>비밀번호</label>
                        <br />
                        <input
                            className='pop_input'
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='비밀번호를 입력하세요.'
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={16} />
                        <br />
                        <label htmlFor='checkPassword' className='pop_label'>비밀번호 확인</label>
                        <br />
                        <input
                            className='pop_input'
                            type='password'
                            id='checkPassword'
                            name='checkPassword'
                            value={checkPassword}
                            placeholder='비밀번호를 입력하세요.'
                            onChange={(e) => setCheckPassword(e.target.value)}
                            maxLength={16} />
                        <div className='pop_btn_box'>
                            <button type='submit' className='pop_btn'>수정</button>
                            <button onClick={closeModal} className='pop_btn'>닫기</button>
                        </div>
                    </form>
                )}
            </Modal>
        </span>
    );
}

export default PasswordFindingModal;