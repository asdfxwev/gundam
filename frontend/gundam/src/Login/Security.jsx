import React, { useState } from 'react';
import Modal from 'react-modal';
import './Idfindingid.css';
import axios from 'axios';

Modal.setAppElement('#root');

function PasswordFindingModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(''); // 사용자 이름 상태
    const [email, setEmail] = useState(''); // 사용자 이메일 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태 관리
    const [message, setMessage] = useState('');

    const handleFindPassword = (e) => {
        e.preventDefault();
        // 이름과 이메일로 사용자의 비밀번호 검색
        axios.get(`http://localhost:3001/users?name=${name}&email=${email}`)
            .then(response => {
                let foundUser = response.data.find(user => user.name === name && user.email === email);

                if (foundUser) {
                    setPassword(foundUser.password); // 사용자의 비밀번호를 상태에 설정
                    setMessage('');
                } else {
                    setMessage('User not found');
                    setPassword(''); // 사용자를 찾지 못한 경우 비밀번호 상태를 비움
                }
            })
            .catch(error => {
                setMessage('Error fetching data');
            });
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <span className='modalcss'>
            <button className='FindID' type='button' onClick={openModal}>비밀번호 찾기</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="비밀번호 찾기"
            >
                <h2>비밀번호 찾기</h2>
                <form onSubmit={handleFindPassword}>
                    <input className='inputText'
                        type='text'
                        id='name'
                        name='name'
                        placeholder='이름'
                        onChange={(e) => setName(e.target.value)}
                        required />
                    <input className='inputText'
                        type='email'
                        id='email'
                        name='email'
                        placeholder='이메일'
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    {password && <p>사용자 비밀번호 : {password}</p>}
                    {message && <p>{message}</p>}
                    <button type='submit'>찾기</button>
                </form>
                <button onClick={closeModal}>닫기</button>
            </Modal>
        </span>
    );
}

export default PasswordFindingModal;