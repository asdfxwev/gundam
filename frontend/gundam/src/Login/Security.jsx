import React, { useState } from 'react';
import Modal from 'react-modal';
import './Idfindingid.css';
import axios from 'axios';

Modal.setAppElement('#root');

function PasswordFindingModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    // const [name, setName] = useState(''); // 사용자 이름 상태
    // const [email, setEmail] = useState(''); // 사용자 이메일 상태
    const [login_id, setLogin_Id] = useState(''); // 사용자 login_id 상태
    const [phone_num, setPhone_Num] = useState(''); // 사용자 login_id 상태
    const [userInfo, setUserInfo] = useState(''); // 사용자 login_id 상태
    const [userCheck, setUserCheck] = useState(false); // 사용자 login_id 상태
    // const [password, setPassword] = useState(''); // 비밀번호 상태 관리
    const [message, setMessage] = useState('');

    const handleFindPassword = (e) => {
        e.preventDefault();

        const onLoginSubmit = (login_id, phone_num) => {

            let url = "/user/pwUserCheck";
            const data = { login_id, phone_num };
    
            apiCall(url, 'POST', data, null)
                .then((response) => {
                    alert('정보가 확인됐습니다 비밀번호를 변경하세요.');
                    setUserInfo(response);
                    setUserCheck(true);
                }).catch((err) => {
                    alert('입력정보를 다시 확인하세요.');
                    setUserInfo('');
                    setUserCheck(false);
                });
        };

        // 이름과 이메일로 사용자의 비밀번호 검색
        // axios.get(`http://localhost:3000/users?name=${name}&email=${email}`)
        //     .then(response => {
        //         let foundUser = response.data.find(user => user.name === name && user.email === email);

        //         if (foundUser) {
        //             setPassword(foundUser.password); // 사용자의 비밀번호를 상태에 설정
        //             setMessage('');
        //         } else {
        //             setMessage('User not found');
        //             setPassword(''); // 사용자를 찾지 못한 경우 비밀번호 상태를 비움
        //         }
        //     })
        //     .catch(error => {
        //         setMessage('Error fetching data');
        //     });
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <span className='modalcss'>
            <button className='FindID' type='button' onClick={openModal}>비밀번호 변경</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="비밀번호 변경"
            >
                <h2>비밀번호 변경</h2>
                <form onSubmit={handleFindPassword}>
                    <input className='inputText'
                        type='text'
                        id='login_id'
                        name='login_id'
                        placeholder='이름'
                        onChange={(e) => setLogin_Id(e.target.value)}
                        required />
                    <input className='inputText'
                        type='text'
                        id='phone_num'
                        name='phone_num'
                        placeholder='이메일'
                        onChange={(e) => setPhone_Num(e.target.value)}
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