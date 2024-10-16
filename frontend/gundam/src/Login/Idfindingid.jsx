import React, { useState } from 'react';
import Modal from 'react-modal';
// import './Idfindingid.css';
import '../MyPage/MyPage.css';
import axios from 'axios';
import { apiCall } from '../service/apiService';

// Modal.setAppElement('#root');

function IdFindingModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [user_name, setUser_Name] = useState('');
    const [phone_num, setPhone_Num] = useState('');
    const [login_id, setLogin_Id] = useState('');

    const validation = () => {

        // 이름 필수입력 체크
        if (user_name.trim() === "") {
            alert("이름은 필수입력 항목입니다.");
            document.querySelector("input[name='user_name']").focus();
            return false;
        }

        // 이름 입력길이 체크
        if (user_name.length < 2 || user_name.length > 10) {
            alert("이름은 2자 이상, 10자 이하로 입력하세요.");
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
        
        return true;
    };

    const handleFindId = (e) => {
        e.preventDefault();

        if (validation()) {
            let url = "/user/loginidFind";
            const data = { user_name, phone_num };

            apiCall(url, 'POST', data, null)
                .then((response) => {
                    alert(`회원님의 아이디는 ${response.login_id} 입니다.`);
                    setLogin_Id(response);
                    closeModal();
                }).catch((err) => {
                    alert('입력 정보를 다시 확인하세요.');
                    setLogin_Id('');
                });
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setLogin_Id('');
    }

    return (
        <span className='modalcss'>
            <button className='update_btn' type='button' onClick={openModal}>아이디 찾기</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="아이디 찾기"
            >
                <h2>아이디 찾기</h2>
                <form onSubmit={handleFindId}>
                    <label htmlFor='user_name' className='pop_label'>이름</label>
                    <br/>
                    <input 
                        className='pop_input'
                        type='text'
                        id='user_name'
                        name='user_name'
                        placeholder='이름'
                        onChange={(e) => setUser_Name(e.target.value)}
                        required />
                    <br/>
                    <label htmlFor='phone_num' className='pop_label'>전화번호</label>
                    <br/>
                    <input 
                        className='pop_input'
                        type='text'
                        id='phone_num'
                        name='phone_num'
                        placeholder='연락처를 입력하세요.'
                        onChange={(e) => setPhone_Num(e.target.value)}
                        required />
                    <div className='pop_btn_box'>
                        <button type='submit' className='pop_btn'>찾기</button>
                        <button onClick={closeModal} className='pop_btn'>닫기</button>
                    </div>
                </form>
            </Modal>
        </span>
    );
}

export default IdFindingModal;