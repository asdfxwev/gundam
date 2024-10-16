import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Idfindingid.css';
import axios from 'axios';
import { apiCall } from '../service/apiService';
import { useNavigate } from 'react-router-dom';
import { faL } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

function PasswordFindingModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [login_id, setLogin_Id] = useState('');
    const [phone_num, setPhone_Num] = useState('');
    const [userInfo, setUserInfo] = useState(''); // 사용자 정보
    const [userCheck, setUserCheck] = useState(false); // 사용자 인증 상태
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    // const [completeVal, setCompleteVal] = useState(false); //validation 결과 변수
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (userCheck) {
    //         document.querySelector("from[id='usercheckform']").hidden
    //         document.querySelector("from[id='pwupdateform']").show
    //     }
    // }, [userCheck]); // 회원정보값을 받아왔을때 실행되도록 설정

    const validation = () => {
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
        return true;
    };

    const handleFindPassword = (e) => {
        e.preventDefault();

        let url = "/user/pwUserCheck";
        const data = { login_id, phone_num };

        apiCall(url, 'POST', data, null)
            .then((response) => {
                alert('정보가 확인됐습니다. 비밀번호를 변경하세요.');
                setUserInfo(response);
                setUserCheck(true);
            }).catch((err) => {
                alert('입력 정보를 다시 확인하세요.');
                setUserInfo('');
                setUserCheck(false);
            });
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
                        <input className='inputText'
                            type='text'
                            id='login_id'
                            name='login_id'
                            placeholder='아이디를 입력하세요.'
                            onChange={(e) => setLogin_Id(e.target.value)} />
                        <input className='inputText'
                            type='text'
                            id='phone_num'
                            name='phone_num'
                            placeholder='연락처를 입력하세요.'
                            onChange={(e) => setPhone_Num(e.target.value)} />
                        <div className='pop_btn_box'>
                            <button type='submit' className='pop_btn'>찾기</button>
                            <button onClick={closeModal} className='pop_btn'>닫기</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={updatePassword}>
                        <label htmlFor='password'>비밀번호</label>
                        <input className='inputText'
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='비밀번호를 입력하세요.'
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={16} />
                        <br />
                        <label htmlFor='checkPassword'>비밀번호 확인</label>
                        <input className='inputText'
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