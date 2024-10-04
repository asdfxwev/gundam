import React, { useState } from 'react';
import Modal from 'react-modal';
import './Idfindingid.css';
import axios from 'axios';

// Modal.setAppElement('#root');

function IdFindingModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleFindEmail = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/users?name=${name}&phoneNumber=${phoneNumber}`)
            .then(response => {
                let foundUser = response.data.find(user => user.name === name && user.phoneNumber === phoneNumber);
                if (foundUser) {
                    setEmail(foundUser.email);
                    setMessage('');
                } else {
                    setMessage('User not found');
                    setEmail('');
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
            <button className='FindID' type='button' onClick={openModal}>아이디 찾기</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="아이디 찾기"
            >
                <h2>아이디 찾기</h2>
                <form onSubmit={handleFindEmail}>
                    <input className='inputText'
                        type='text'
                        id='name'
                        name='name'
                        placeholder='이름'
                        onChange={(e) => setName(e.target.value)}
                        required />
                    <input className='inputText'
                        type='text'
                        id='phoneNumber'
                        name='phoneNumber'
                        placeholder='핸드폰 번호'
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required />
                    <button type='submit'>찾기</button>
                    {email && <p>사용자 이메일 : {email}</p>}
                    {message && <p>{message}</p>}
                </form>
                <button onClick={closeModal}>닫기</button>
            </Modal>
        </span>
    );
}

export default IdFindingModal;