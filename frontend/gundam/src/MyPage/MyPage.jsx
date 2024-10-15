import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyPageLeft from './MypageLeft';

const MyPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({}); // 사용자 정보를 저장할 상태

    useEffect(() => {
        // 페이지 로드 시 사용자 정보를 불러오는 함수 실행
        fetchUserInfo();
    }, []);

    const fetchUserInfo = () => {
        const response = sessionStorage.getItem('userInfo'); // 로컬 스토리지에서 userInfo 항목 불러오기
        if (response !== null) {
            const user = JSON.parse(response); // 문자열을 객체로 변환
            setUserInfo(user); // userInfo 상태 업데이트
        }
    };

    const handleSubmit = async (values) => {
        const { name, email, password, address, dtl_address, phoneNumber } = values;
        const combinedAddress = `${address} ${dtl_address}`; // address와 dtl_address 값을 공백으로 구분하여 연결
        const formData = { name, email, password, address: combinedAddress, phoneNumber };

        try {
            const response = await axios.post('http://localhost:3000/users', formData); // POST 메소드로 변경
            console.log(response.data);
            // navigate('/MyPage'); // 이동할 경로 확인 필요
            // 성공적으로 정보가 업데이트되었다는 알림을 사용자에게 제공하거나, 다른 페이지로 리디렉션
            alert('정보가 성공적으로 업데이트되었습니다.');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='mypage_container'>
            <MyPageLeft />
            <div className='user_info'>
                <h3 className='MyPage_h4'>회원 정보</h3>
                <div className='row'>
                    <div className='name'>이름</div>
                    <div className="Value">{userInfo.user_name}</div>
                </div>
                <div className='row'>
                    <div className='name'>이메일</div>
                    <div className="Value">{userInfo.email}</div>
                </div>
                <div className='row'>
                    <div className='name'>주소</div>
                    <div className="Value">{userInfo.address}</div>
                </div>
                <div className='row'>
                    <div className='name'>전화번호</div>
                    <div className="Value">{userInfo.phone_num}</div>
                </div>
            </div>
        </div>
    );



};

export default MyPage;