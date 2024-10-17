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
import { API_BASE_URL } from "../service/app-config";

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
const ItemReview = ({ item, setReviewCount, pathName, pro_id, reviewList }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 저장 변수
    const [modalIsOpen, setModalIsOpen] = useState(false); // 리뷰작성 모달팝업 호출 변수
    const [modalOpenPop, setModalOpenPop] = useState(false); // 비로그인 시 안내모달팝업 호출 변수
    const [modalNoPurchase, setModalNoPurchase] = useState(false); // 구매 후 작성 가능 안내 모달팝업 호출 변수
    const [reviews, setReviews] = useState([]); // 리뷰 데이터를 저장할 상태 변수
    const [rev_title, setReviewTitle] = useState('');
    const [rev_com, setReviewMessage] = useState('');
    const [rev_rating, setRating] = useState(0); // 별점 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [expandedReviewId, setExpandedReviewId] = useState(null); // 클릭된 리뷰 ID
    const [order_id, setOrderId] = useState();
    const navigate = useNavigate();



    // useEffect(() => {
    //     setReviews(reviewData.review);
    // }, []);

    // useEffect(() => {
    //     const filteredReviews = reviews.filter(review => review.productId === item);
    //     // setReviewCount(filteredReviews.length);
    // }, [reviews, item, setReviewCount]);

    useEffect(() => {
        const loginCheck = JSON.parse(sessionStorage.getItem('userInfo'));
        if (loginCheck !== null) {
            setIsLoggedIn(true);
        }
    }, []);

    const reviewPop = async () => {
        if (isLoggedIn) {     // 로그인 상태가 true 일때
            const user_id = JSON.parse(sessionStorage.getItem('userInfo')).user_id;
            const users = { user_id, pro_id }
            const Response = await axios.post(`${API_BASE_URL}/product/productReviewId`, users);
            const data = Response.data
            console.log(data);
            setOrderId(data);

            // const hasBoughtItem = userData.buy && userData.buy.some(buyItem => buyItem.id === item);
            console.log("data = " + data);
            if (data) {
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

    // const filteredReviews = useMemo(() => {
    //     const filteredReview = reviews.filter(review => review.productId === item);
    //     return filteredReview.reverse();
    // }, [reviews, item]);


    console.log(reviewList);
    let reviewTotal = 0;
    if (reviewList != null) {
        for (let i = 0; i < reviewList.length; i++) {
            reviewTotal += parseFloat(reviewList[i].rev_rating);
        }
    }

    let avgrevRating = reviewTotal / reviewList.length;

    console.log(reviewTotal);

    function onreviewTitle(e) {
        setReviewTitle(e.target.value)
    }

    function onreviewMessage(e) {
        setReviewMessage(e.target.value)
    }

    const reviewSubmit = async (e) => {
        e.preventDefault();
        const user_id = JSON.parse(sessionStorage.getItem('loginInfo')).user_id;
        const data = { rev_title, rev_com, rev_rating, pro_id, user_id, order_id }
        console.log(data);
        try {
            if (rev_title === '' || rev_com === '' || rev_rating === 0) {
                alert(`제목, 내용, 별점을 모두 입력해주세요.`);
                return false;
            }
            console.log(data);
            await axios.post(`${API_BASE_URL}/product/productReview`, data);
            setReviewTitle('');
            setReviewMessage('');
            setRating(0); // 별점 초기화
            closeModal();
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }


    // useEffect(() => {
    //     const startIndex = (currentPage - 1) * 5;
    //     const endIndex = startIndex + 5;
    //     const newPaginatedItems = filteredReviews.slice(startIndex, endIndex);

    //     setPaginatedItems(prevItems => {
    //         // 상태가 실제로 변경되었는지 확인하여 불필요한 상태 변경 방지
    //         if (JSON.stringify(prevItems) !== JSON.stringify(newPaginatedItems)) {
    //             return newPaginatedItems;
    //         }
    //         return prevItems;
    //     });
    // }, [currentPage, filteredReviews]);

    const handleReviewClick = (reviewId) => {
        setExpandedReviewId(prevId => (prevId === reviewId ? null : reviewId));
    };

    const convertToKST = (dateString) => {
        const utcDate = new Date(dateString); // dateString을 Date 객체로 변환
        const kstDate = new Date(utcDate.getTime() + 3240 * 10000); // 9시간 더함
        return `${String(kstDate.getFullYear()).slice(-2)}-${String(kstDate.getMonth() + 1).padStart(2, '0')}-${String(kstDate.getDate()).padStart(2, '0')} ${String(kstDate.getHours()).padStart(2, '0')}:${String(kstDate.getMinutes()).padStart(2, '0')}:${String(kstDate.getSeconds()).padStart(2, '0')}`;
    };

    return (
        <>
            <div className="info_top_box" id="REVIEW_TAB">
                <div className="info_top_left">상품리뷰 평균별점 : {avgrevRating}</div>
                {/* <div className="info_top_right">
                    
                </div> */}
            </div>
            <div className="review_list">
                <div className="re_list_top">
                    <div>등록일</div><div>Review</div>
                </div>
                <div className="re_list_data">
                    {reviewList && reviewList.length > 0 ? (
                        reviewList.map((item, i) => (
                            <div
                                key={i}
                                className={`re_list_row ${expandedReviewId === item.rev_id ? 'expanded' : ''}`}
                                onClick={() => handleReviewClick(item.rev_id)}
                            >
                                <div>{convertToKST(item.rev_creat)}</div>
                                <div>
                                    <p>제목 : {item.rev_title}</p>
                                    <div className={`review-details ${expandedReviewId === item.rev_id ? 'show' : ''}`}>
                                        <p>내용 : {item.rev_com}</p>
                                        <p>답변 : {item.rev_answer}</p>
                                        <p>별점:
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <FontAwesomeIcon
                                                    key={index}
                                                    icon={faStar}
                                                    className={`star-icon ${index < item.rev_rating ? 'filled' : ''}`}
                                                />
                                            ))}
                                            {/* {item.rev_rating} <FontAwesomeIcon icon={faStar} className="star-icon" /> */}
                                        </p>
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
                totalItems={reviewList.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );

}

export default ItemReview;
