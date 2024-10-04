import React, { useState, useEffect, useMemo } from "react";
import './ItemDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import reviewData from '../data/db.json';
import PagiNationNum from "../csc/PagiNationNum";
import { faStar as faStarEmpty, faStar } from '@fortawesome/free-solid-svg-icons';

// 별점 UI 컴포넌트
const StarRating = ({ rating, setRating }) => {
    const stars = [1, 2, 3, 4, 5];
    return (
        <div className="star-rating">
            {stars.map((star) => (
                <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    onClick={() => setRating(star)}
                    className={`star-icon ${rating >= star ? 'filled' : ''}`}
                />
            ))}
        </div>
    );
};

// ItemReview 컴포넌트
const ItemReview = ({ item, setReviewCount, pathName }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 저장 변수
    const [modalIsOpen, setModalIsOpen] = useState(false); // 리뷰작성 모달팝업 호출 변수
    const [modalOpenPop, setModalOpenPop] = useState(false); // 비로그인 시 안내모달팝업 호출 변수
    const [modalNoPurchase, setModalNoPurchase] = useState(false); // 구매 후 작성 가능 안내 모달팝업 호출 변수
    const [reviews, setReviews] = useState([]); // 리뷰 데이터를 저장할 상태 변수
    const [title, setReviewTitle] = useState('');
    const [comment, setReviewMessage] = useState('');
    const [rating, setRating] = useState(0); // 별점 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [expandedReviewId, setExpandedReviewId] = useState(null); // 클릭된 리뷰 ID
    const navigate = useNavigate();

    useEffect(() => {
        setReviews(reviewData.review);
    }, []);

    useEffect(() => {
        const filteredReviews = reviews.filter(review => review.productId === item);
        // setReviewCount(filteredReviews.length);
    }, [reviews, item, setReviewCount]);

    useEffect(() => {
        const loginCheck = JSON.parse(localStorage.getItem("loginInfo"));
        if (loginCheck !== null) {
            setIsLoggedIn(true);
        }
    }, []);

    const reviewPop = async () => {
        if (isLoggedIn) {     // 로그인 상태가 true 일때
            const loginCheck = JSON.parse(localStorage.getItem("loginInfo"));
            const userResponse = await axios.get(`http://localhost:3001/users/${loginCheck.id}`);
            const userData = userResponse.data;

            const hasBoughtItem = userData.buy && userData.buy.some(buyItem => buyItem.id === item);

            if (hasBoughtItem) {
                setModalIsOpen(true);
            } else {
                setModalNoPurchase(true); // 구매 후 작성 가능 안내 모달팝업 호출
            }
        } else {
            setModalOpenPop(true); // 비로그인 시 안내모달팝업 호출
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closePopModal = () => {
        setModalOpenPop(false);
    };

    const closeNoPurchaseModal = () => {
        setModalNoPurchase(false);
    };

    const filteredReviews = useMemo(() => {
        const filteredReview = reviews.filter(review => review.productId === item);
        return filteredReview.reverse();
    }, [reviews, item]);

    function onreviewTitle(e) {
        setReviewTitle(e.target.value)
    }

    function onreviewMessage(e) {
        setReviewMessage(e.target.value)
    }

    const reviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3001/review`);
            const reviewList = response.data;
            const date = new Date().toLocaleDateString();

            // 리뷰 아이디 생성
            const reviewId = reviewList.length ? reviewList[reviewList.length - 1].reviewId + 1 : 1;

            const productId = item;
            const existingInquiries = JSON.parse(localStorage.getItem('loginInfo'));
            const userId = existingInquiries.id;

            if (title === '' || comment === '' || rating === 0) {
                alert(`제목, 내용, 별점을 모두 입력해주세요.`);
                return false;
            }

            const newReview = { reviewId, productId, userId, title, comment, date, rating };

            // 서버에 새로운 리뷰 추가
            await axios.post(`http://localhost:3001/review`, newReview);

            setReviewTitle('');
            setReviewMessage('');
            setRating(0); // 별점 초기화
            closeModal();
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }

    useEffect(() => {
        const startIndex = (currentPage - 1) * 5;
        const endIndex = startIndex + 5;
        const newPaginatedItems = filteredReviews.slice(startIndex, endIndex);

        setPaginatedItems(prevItems => {
            // 상태가 실제로 변경되었는지 확인하여 불필요한 상태 변경 방지
            if (JSON.stringify(prevItems) !== JSON.stringify(newPaginatedItems)) {
                return newPaginatedItems;
            }
            return prevItems;
        });
    }, [currentPage, filteredReviews]);

    const handleReviewClick = (reviewId) => {
        setExpandedReviewId(prevId => (prevId === reviewId ? null : reviewId));
    };

    return (
        <>
            <div className="info_top_box" id="REVIEW_TAB">
                <div className="info_top_left">상품리뷰</div>
                <div className="info_top_right">
                    <FontAwesomeIcon className="iconsize" icon={faPenToSquare} onClick={reviewPop} />
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                    >
                        <form className="review_pop">
                            <h2>리뷰작성</h2>
                            <div>
                                <div>제목
                                    <input value={title} onChange={onreviewTitle} type="text" id="title" className="re_title" />
                                </div>
                                <div>별점
                                    <StarRating rating={rating} setRating={setRating} />
                                </div>
                                <div className="reviewBox">내용
                                    <textarea value={comment} onChange={onreviewMessage} type="text" id="comment" className="re_comment" />
                                </div>
                            </div>
                            <div className="re_button_box">
                                <button type="button" className="re_button" onClick={reviewSubmit}>저장</button>
                                <button type="button" className="re_button" onClick={closeModal}>닫기</button>
                            </div>
                        </form>
                    </Modal>

                    <Modal
                        isOpen={modalOpenPop}
                        onRequestClose={closePopModal}
                        contentLabel="Example Modal"
                    >
                        <div className="review_pop">
                            <h2>로그인 후 이용 가능합니다.</h2>
                            <div className="re_button_box">
                                <button type="button" className="re_button" onClick={() => { navigate('/Login') }}>로그인</button>
                                <button type="button" className="re_button" onClick={closePopModal}>닫기</button>
                            </div>
                        </div>
                    </Modal>

                    <Modal
                        isOpen={modalNoPurchase}
                        onRequestClose={closeNoPurchaseModal}
                        contentLabel="Example Modal"
                    >
                        <div className="review_pop">
                            <h2>상품을 구매 후 리뷰작성이 가능합니다.</h2>
                            <div className="re_button_box">
                                <button type="button" className="re_button" onClick={closeNoPurchaseModal}>닫기</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="review_list">
                <div className="re_list_top">
                    <div>등록일</div><div>Review</div>
                </div>
                <div className="re_list_data">
                    {paginatedItems.length > 0 ? (
                        paginatedItems.map(review => (
                            <div
                                key={review.reviewId}
                                className={`re_list_row ${expandedReviewId === review.reviewId ? 'expanded' : ''}`}
                                onClick={() => handleReviewClick(review.reviewId)}
                            >
                                <div>{review.date}</div>
                                <div>
                                    <p>{review.title}</p>
                                    <div className={`review-details ${expandedReviewId === review.reviewId ? 'show' : ''}`}>
                                        <p>{review.comment}</p>
                                        <p>별점: {review.rating} <FontAwesomeIcon icon={faStar} className="star-icon" /></p>
                                    </div>
                                </div>
                            </div>

                        ))
                    ) : (
                        <div className="re_list_row">
                            <div className="no_review">등록된 리뷰가 없습니다.</div>
                        </div>
                    )}
                </div>
            </div>
            <PagiNationNum
                itemsPerPage={5}
                maxPagesToShow={5}
                totalItems={filteredReviews.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );

}

export default ItemReview;
