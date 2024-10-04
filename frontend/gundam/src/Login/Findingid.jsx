import React, { useState } from 'react';
import axios from 'axios';
import './Findingid.css';
// import IdFindingModal from './Idfindingid';

const Find = () => {
    const [activeTab, setActiveTab] = useState('findId');
    const [name, setName] = useState(''); // 이름 상태 관리
    const [phoneNumber, setPhoneNumber] = useState(''); // 핸드폰 번호 상태 관리 추가
    const [email, setEmail] = useState(''); // 이메일 상태 관리
    const [message, setMessage] = useState('');

    const handleFindEmail = (e) => {
        e.preventDefault();
        // 이름과 핸드폰 번호로 사용자 검색
        axios.get(`http://localhost:3001/users?name=${name}&phoneNumber=${phoneNumber}`)
            .then(response => {
                let foundUser = response.data.find(user => user.name === name && user.phoneNumber === phoneNumber);

                if (foundUser) {
                    setEmail(foundUser.email); // 사용자의 이메일을 상태에 설정
                    setMessage('');
                } else {
                    setMessage('User not found');
                    setEmail(''); // 사용자를 찾지 못한 경우 이메일 상태를 비움
                }
            })
            .catch(error => {
                setMessage('Error fetching data');
            });
    }



    function FindId() {
        return (
            <>

                <div id='findId' className='tabContent'>
                    <h2>이메일 찾기</h2>
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
                        <button className='login_button' type='submit'>FIND</button>
                    </form>
                    {email && <p>사용자 이메일 : {email}</p>}
                    {message && <p>{message}</p>}
                    {/* <IdFindingModal /> */}
                </div>

            </>
        )
    }

    const FindPw = () => {
        return (
            <>

                <div id='findPw' className='tabContent2'>
                    <h2>비밀번호 찾기</h2>
                    <form>
                        <input type='text' id='name' name='name' required />
                        <span>name</span>
                        <input type='email' id='email' name='email' required />
                        <span>E-mail</span>
                        <button className='login_button' type='submit'>FIND</button>
                    </form>
                </div>
            </>
        )
    }

    return (
        <div className='findCss'>
            <div className='findMainCon'>
                <div className='findMain'>
                    <div>
                        <button
                            className={`tabLinks ${activeTab === 'findId' ? 'active' : ''}`}

                        ><h4>이메일 찾기</h4></button>
                        <button
                            className={`tabLinks ${activeTab === 'findPw' ? 'active' : ''}`}
                        ><h4>비밀번호 찾기</h4></button>
                    </div>
                    <div>
                        <FindId />
                        <FindPw />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Find;