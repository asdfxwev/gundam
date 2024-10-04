import React, { useState, useEffect, useMemo } from "react";
import './ItemDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import qnaData from '../data/db.json';
import axios from 'axios';
import PagiNationNum from "../csc/PagiNationNum";

const ItemQna = ({ item, pathName }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalOpenPop, setModalOpenPop] = useState(false);
    const [qnas, setQnas] = useState([]);
    const [comment, setQnaValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [expandedQnaId, setExpandedQnaId] = useState(null); // 클릭된 Q&A ID

    const navigate = useNavigate();

    useEffect(() => {
        setQnas(qnaData.qna);
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            const loginCheck = JSON.parse(localStorage.getItem("loginInfo"));
            if (loginCheck !== null) {
                setIsLoggedIn(true);
            }
        }
    }, [isLoggedIn]);

    const qnaPop = () => {
        if (isLoggedIn) {
            setModalIsOpen(true);
        } else {
            setModalOpenPop(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closePopModal = () => {
        setModalOpenPop(false);
    };

    // 선택된 상품의 Q&A만 필터링 및 메모이제이션
    const filteredQna = useMemo(() => {
        return qnas.filter(qna => qna.productId === item).reverse();
    }, [qnas, item]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * 5;
        const endIndex = startIndex + 5;
        const newPaginatedItems = filteredQna.slice(startIndex, endIndex);

        setPaginatedItems(prevItems => {
            if (JSON.stringify(prevItems) !== JSON.stringify(newPaginatedItems)) {
                return newPaginatedItems;
            }
            return prevItems;
        });
    }, [currentPage, filteredQna]);

    const onQnaMessage = (e) => {
        setQnaValue(e.target.value);
    };

    const submitQna = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3001/qna`);
            const qnaList = response.data;
            const date = new Date().toLocaleDateString();

            const qna_Id = qnaList.length ? qnaList[qnaList.length - 1].qna_Id + 1 : 1;

            const productId = item;
            const existingInquiries = JSON.parse(localStorage.getItem('loginInfo'));
            const userId = existingInquiries.id;

            const newQna = { qna_Id, productId, userId, comment, date };

            if (comment === '') {
                alert(`내용을 입력해주세요.`);
                return false;
            }

            await axios.post(`http://localhost:3001/qna`, newQna);

            setQnaValue('');
            closeModal();
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const handleQnaClick = (qnaId) => {
        setExpandedQnaId(prevId => (prevId === qnaId ? null : qnaId));
    };

    return (
        <>
            <div className="info_top_box" id="QNA">
                <div className="info_top_left">Q&A</div>
                <div className="info_top_right">
                    <FontAwesomeIcon className="iconsize" icon={faPenToSquare} onClick={qnaPop} />
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Qna 작성">
                        <div className="review_pop">
                            <h2>Qna작성</h2>
                            <div className="qnaBox">
                                내용 <textarea value={comment} onChange={onQnaMessage} type="text" id="comment" className="re_comment" />
                            </div>
                            <div className="re_button_box">
                                <button type="button" className="re_button" onClick={submitQna}>저장</button>
                                <button type="button" className="re_button" onClick={closeModal}>닫기</button>
                            </div>
                        </div>
                    </Modal>
                    <Modal isOpen={modalOpenPop} onRequestClose={closePopModal} contentLabel="로그인 필요">
                        <div className="review_pop">
                            <h2>로그인 후 이용 가능합니다.</h2>
                            <div className="re_button_box">
                                <button type="button" className="re_button" onClick={() => { navigate('/Login') }}>로그인</button>
                                <button type="button" className="re_button" onClick={closePopModal}>닫기</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="qna_list">
                {paginatedItems.length > 0 ? (
                    paginatedItems.map(qna => (
                        <div 
                            key={qna.qna_Id}
                            className="qna_list_row"
                            onClick={() => handleQnaClick(qna.qna_Id)}
                        >
                            <div className="qna_state">문의중</div>
                            <div>
                                <div>{qna.comment}</div>
                                <div className={`qna_details ${expandedQnaId === qna.qna_Id ? 'show' : ''}`}>
                                    <p>등록일: {qna.qna_date}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no_qna">
                        <div>등록된 Q&A가 없습니다.</div>
                    </div>
                )}
            </div>
            <PagiNationNum
                itemsPerPage={5}
                maxPagesToShow={5}
                totalItems={filteredQna.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};

export default ItemQna;
