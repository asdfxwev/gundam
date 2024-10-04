import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Customerservice.css';
import './InquiryWrite.css';
import CscLeft from './CscLeft';

export default function InquiryEdit() {
    const location = useLocation();
    const { inquiry } = location.state;
    const [inquiryData, setInquiryData] = useState({
        inquiryType: inquiry.inquiryType,
        subject: inquiry.subject,
        message: inquiry.message,
        id: inquiry.id,
        formData: inquiry.formData
    });
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);


    const existingInquiries = JSON.parse(localStorage.getItem('loginInfo'));
    const userId = existingInquiries.id; // Assuming the user ID is stored here

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    }

    const handleInquiryChange = (event) => {
        const labelElement = document.querySelector(`label[for=${event.target.id}]`);
        if (labelElement) {
            setInquiryData(labelElement.innerHTML);
        }
    };

    const InquirySubmit = async (event) => {
        event.preventDefault();

        try {
            // Fetch the current user data
            const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
            const userData = userResponse.data
            console.log(userData);
            console.log(userData.inquries);
            const id = inquiryData.id
            const inquiryType = inquiryData.inquiryType
            const subject = inquiryData.subject
            const message = inquiryData.message

            const updatedInquiries = userData.inquries.filter(inquiry => inquiry.id !== id);
            // console.log(updatedInquiries);
            await axios.put(`http://localhost:3001/users/${existingInquiries.id}`, { ...userData, inquries: updatedInquiries });

            const formData = new FormData();
            files.map((file) => {
                formData.append("files", file);
            });
            console.log(formData);
            const userResponses = await axios.get(`http://localhost:3001/users/${userId}`);
            const userDatas = userResponses.data

            const newInquiry = { id, inquiryType, subject, message, formData };

            userDatas.inquries = userDatas.inquries ? [...userDatas.inquries, newInquiry] : [newInquiry];
            await axios.put(`http://localhost:3001/users/${userId}`, userDatas);
            navigate('/Inquiry?page=1');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInquiryData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    // function onSubjectChange(e) {
    //     setInquiryData(e.target.value)
    //     // setInquiryNum(e => e + 1)
    // }

    return (
        <section className="cscContainer">
            <CscLeft />
            <form className="cscMain" onSubmit={InquirySubmit}>
                <h2 className="cscTitle">1:1문의 수정</h2>
                <div className="inquiryGrid">
                    <div className="inquiryType">문의유형</div>
                    <div className="inquiryTypeList">
                        <div >
                            <input name="inquirySelect" id="inquiryNum1" type="radio" onChange={handleInquiryChange} checked={inquiryData.inquiryType === "배송"} />
                            <label For="inquiryNum1">배송</label>
                        </div>
                        <div>
                            <input name="inquirySelect" id="inquiryNum2" type="radio" onChange={handleInquiryChange} checked={inquiryData.inquiryType === "상품"} />
                            <label For="inquiryNum2">상품</label>
                        </div>
                        <div>
                            <input name="inquirySelect" id="inquiryNum3" type="radio" onChange={handleInquiryChange} checked={inquiryData.inquiryType === "반품"} />
                            <label For="inquiryNum3">반품</label>
                        </div>
                        <div>
                            <input name="inquirySelect" id="inquiryNum4" type="radio" onChange={handleInquiryChange} checked={inquiryData.inquiryType === "교환"} />
                            <label For="inquiryNum4">교환</label>
                        </div>
                        <div>
                            <input name="inquirySelect" id="inquiryNum5" type="radio" onChange={handleInquiryChange} checked={inquiryData.inquiryType === "완구A/S"} />
                            <label For="inquiryNum5">완구A/S</label>
                        </div>
                        <div>
                            <input name="inquirySelect" id="inquiryNum6" type="radio" onChange={handleInquiryChange} checked={inquiryData.inquiryType === "주문/결제"} />
                            <label For="inquiryNum6">주문/결제</label>
                        </div>
                        <div>
                            <input name="inquirySelect" id="inquiryNum7" type="radio" onChange={handleInquiryChange} checked={inquiryData.inquiryType === "이벤트"} />
                            <label For="inquiryNum7">이벤트</label>
                        </div>
                        <div>
                            <input name="inquirySelect" id="inquiryNum8" type="radio" onChange={handleInquiryChange} checked={inquiryData.inquiryType === "회원"} />
                            <label For="inquiryNum8">회원</label>
                        </div>
                        <div>
                            <input name="inquirySelect" id="inquiryNum9" type="radio" onChange={handleInquiryChange} checked={inquiryData.inquiryType === "시스템장애"} />
                            <label For="inquiryNum9">시스템장애</label>
                        </div>
                        <div>
                            <input name="inquirySelect" id="inquiryNum10" type="radio" onChange={handleInquiryChange} checked={inquiryData.inquiryType === "기타"} />
                            <label For="inquiryNum10">기타</label>
                        </div>
                    </div>
                    <div className="inquiryType"><label For="subject">문의제목</label>
                    </div>
                    <div>
                        <input className="inquriySubject"
                            id="subject"
                            type="text"
                            value={inquiryData.subject}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="inquiryType"><label For="message">문의내용</label></div>
                    <div>
                        <textarea className="inquiryMessage"
                            id="message"
                            value={inquiryData.message}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    <div className="inquiryFile"><label for='file'>파일첨부</label></div>
                    <div>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="inquiryTypeBtn">
                        <button className="inquiryBtn" type="submit">수정완료</button>
                    </div>
                </div>
            </form>
        </section>
    );
}



// cartItemsfilter = userBasket.filter((item) => {
//     return checkedCartItems.some(checkedItem => checkedItem.productId !== item.productId);
// });

// cartItemsfilter = userBasket.filter((item) => {
//     return !checkedCartItems.some(checkedItem => checkedItem.productId === item.productId);
// });