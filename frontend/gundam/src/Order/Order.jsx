import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';
import MypageLeft from '../MyPage/MypageLeft';
import { API_BASE_URL } from "../service/app-config";
import Modal from 'react-modal';
import { faStar as faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const Cart = () => {
    const [orderList, setOrderList] = useState([]); // 주문 목록 상태
    const [mainImage, setMainImage] = useState([]); // 상품 이미지 상태
    const [modalIsOpen, setModalIsOpen] = useState(false); // 리뷰 작성 모달 상태
    const [modalModifyIsOpen, setModalModifyIsOpen] = useState(false); // 리뷰 작성 모달 상태
    const [rev_title, setReviewTitle] = useState(''); // 리뷰 제목 상태
    const [rev_com, setReviewMessage] = useState(''); // 리뷰 내용 상태
    const [rev_rating, setRating] = useState(0); // 별점 상태
    const [selectedProId, setSelectedProId] = useState(''); // 선택된 상품 ID
    const [selectedOrderId, setSelectedOrderId] = useState(''); // 선택된 주문 ID
    const [reviewExist, setReviewExist] = useState([]); // 기존 리뷰 상태
<<<<<<< Updated upstream
    const [selectedRevId, setSelectedRevId] = useState('');
=======
>>>>>>> Stashed changes

    // 로그인한 사용자 정보
    const existingInquiries = JSON.parse(sessionStorage.getItem('userInfo'));
    const user_id = existingInquiries.user_id;

<<<<<<< Updated upstream
=======
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/orders/orderList`, { user_id });
                setOrderList(response.data.orderList);
                setMainImage(response.data.imgList);
                setReviewExist(response.data.reviewList); // 리뷰 리스트를 배열로 설정
            } catch (error) {
                console.error("데이터를 가져오는 중 에러가 발생했습니다: ", error);
            }
        };
        fetchData();
    }, [user_id]);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeModalModify = () => {
        // setModalIsOpen(false);
        setModalModifyIsOpen(false);
        setReviewTitle('');
        setReviewMessage('');
        setRating(0);
        closeModal();
    }

    // 리뷰 작성 모달 팝업을 여는 함수
    function reviewPop(pro_id, order_id) {
        setSelectedProId(pro_id);
        setSelectedOrderId(order_id);
        setModalIsOpen(true);
    }

    function reviewModifyPop(pro_id, order_id) {
        setSelectedProId(pro_id);
        setSelectedOrderId(order_id);

        // 선택된 리뷰의 기존 데이터를 불러와 상태에 설정
        const matchedReview = reviewExist.find(review =>
            review.product.pro_id === pro_id && review.order.order_id === order_id
        );
        if (matchedReview) {
            setReviewTitle(matchedReview.rev_title);
            setReviewMessage(matchedReview.rev_com);
            setRating(matchedReview.rev_rating); // 별점 설정
        }

        setModalModifyIsOpen(true);
    }


    // 리뷰 제출 함수
    const reviewSubmit = async (e) => {
        e.preventDefault();
        const data = {
            rev_title,
            rev_com,
            rev_rating,
            user_id,
            order_id: selectedOrderId,
            pro_id: selectedProId
        };

        if (rev_title === '' || rev_com === '' || rev_rating === 0) {
            alert(`제목, 내용, 별점을 모두 입력해주세요.`);
            return false;
        }
>>>>>>> Stashed changes

    const fetchData = async () => {
        try {
<<<<<<< Updated upstream
            const response = await axios.post(`${API_BASE_URL}/api/orders/orderList`, { user_id });
            setOrderList(response.data.orderList);
            setMainImage(response.data.imgList);
            setReviewExist(response.data.reviewList); // 리뷰 리스트를 배열로 설정
        } catch (error) {
            console.error("데이터를 가져오는 중 에러가 발생했습니다: ", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeModalModify = () => {
        // setModalIsOpen(false);
        setModalModifyIsOpen(false);
        setReviewTitle('');
        setReviewMessage('');
        setRating(0);
        closeModal();
    }

    // 리뷰 작성 모달 팝업을 여는 함수
    function reviewPop(pro_id, order_id) {
        setSelectedProId(pro_id);
        setSelectedOrderId(order_id);
        setModalIsOpen(true);
    }

    function reviewModifyPop(pro_id, order_id, rev_id) {
        console.log("revid = " + rev_id);
        setSelectedProId(pro_id);
        setSelectedOrderId(order_id);
        setSelectedRevId(rev_id);

        // 선택된 리뷰의 기존 데이터를 불러와 상태에 설정
        const matchedReview = reviewExist.find(review =>
            review.product.pro_id === pro_id && review.order.order_id === order_id
        );
        if (matchedReview) {
            setReviewTitle(matchedReview.rev_title);
            setReviewMessage(matchedReview.rev_com);
            setRating(matchedReview.rev_rating); // 별점 설정
        }

        setModalModifyIsOpen(true);
    }

    // 리뷰 제출 함수
    const reviewSubmit = async (e) => {
        e.preventDefault();
        const data = {
            rev_title,
            rev_com,
            rev_rating,
            user_id,
            order_id: selectedOrderId,
            pro_id: selectedProId
        };

        if (rev_title === '' || rev_com === '' || rev_rating === 0) {
            alert(`제목, 내용, 별점을 모두 입력해주세요.`);
            return false;
        }

        try {
            await axios.post(`${API_BASE_URL}/product/productReview`, data);
            setReviewTitle('');
            setReviewMessage('');
            setRating(0); // 별점 초기화
            closeModalModify();
            // window.location.reload();
            await fetchData();

        } catch (error) {
            console.error('리뷰 제출 중 에러가 발생했습니다: ', error.response ? error.response.data : error.message);
        }
    };

    const reviewModify = async (e) => {
        e.preventDefault();
        const data = {
            rev_title,
            rev_com,
            rev_rating,
            user_id,
            rev_id: selectedRevId,
            order_id: selectedOrderId,
            pro_id: selectedProId
        };
        console.log(data);

=======
            await axios.post(`${API_BASE_URL}/product/productReview`, data);
            setReviewTitle('');
            setReviewMessage('');
            setRating(0); // 별점 초기화
            closeModal();
        } catch (error) {
            console.error('리뷰 제출 중 에러가 발생했습니다: ', error.response ? error.response.data : error.message);
        }
    };

    const reviewModify = async (e) => {
        e.preventDefault();
        const data = {
            rev_title,
            rev_com,
            rev_rating,
            user_id,
            order_id: selectedOrderId,
            pro_id: selectedProId
        };

>>>>>>> Stashed changes
        if (rev_title === '' || rev_com === '' || rev_rating === 0) {
            alert(`제목, 내용, 별점을 모두 입력해주세요.`);
            return false;
        }

        try {
            await axios.post(`${API_BASE_URL}/product/productReviewModify`, data);
            setReviewTitle('');
            setReviewMessage('');
            setRating(0); // 별점 초기화
<<<<<<< Updated upstream
            closeModalModify();
            await fetchData();
=======
            closeModal();
>>>>>>> Stashed changes
        } catch (error) {
            console.error('리뷰 제출 중 에러가 발생했습니다: ', error.response ? error.response.data : error.message);
        }
    };

<<<<<<< Updated upstream
    const reviewDelete = async (rev_id) => {
        const confirmDelete = window.confirm("정말로 이 리뷰를 삭제하시겠습니까?");
    
        if (!confirmDelete) {
            return; // 사용자가 취소를 누르면 삭제 작업을 중단
        }
    
        //e.preventDefault();
        const data = {
            rev_id
            // order_id: selectedOrderId,
            // pro_id: selectedProId
        };
        console.log(data);
        try {
            await axios.post(`${API_BASE_URL}/product/productReviewDelete`, data);
            await fetchData();
=======
    const reviewDelete = async (e) => {
        e.preventDefault();
        const data = {
            order_id: selectedOrderId,
            pro_id: selectedProId
        };
        try {
            await axios.post(`${API_BASE_URL}/product/productReviewDelete`, data);
>>>>>>> Stashed changes
            // setReviewTitle('');
            // setReviewMessage('');
            // setRating(0); // 별점 초기화
            // closeModal();
        } catch (error) {
            console.error('리뷰 제출 중 에러가 발생했습니다: ', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="mypageContainer">
            <MypageLeft />
            <div className="cartWrapper">
                <h1 className='h1-names'>구매내역</h1>
                <div className="cart-containers">
                    <div className="cart-header">
                        <div>구매일</div>
                        <div>상품 이미지</div>
                        <div>상품 이름</div>
                        <div>수량</div>
                        <div>가격</div>
                        <div>총 가격</div>
                        <div>리뷰</div>
                    </div>
                    {orderList && orderList.length > 0 ? (
                        orderList.map((item) => {
<<<<<<< Updated upstream
                            console.log(item)
=======
>>>>>>> Stashed changes
                            const matchedImage = mainImage.find(image => image.pro_id.pro_id === item.pro_id.pro_id);
                            const matchedReview = reviewExist.find(review =>
                                review.product.pro_id === item.pro_id.pro_id && review.order.order_id === item.order_id.order_id
                            );
<<<<<<< Updated upstream

=======
                            console.log(matchedReview);
>>>>>>> Stashed changes


                            return (
                                <div className="cart-item" key={item.order_id.order_id}>
                                    <div>{item.order_id.order_date}</div>
                                    <div>
                                        <a href={`ItemList/ItemDetail/${item.pro_id.pro_id}`}>
                                            {matchedImage ? (
                                                <img src={`${API_BASE_URL}/resources/productImg/${item.pro_id.pro_id}/${matchedImage.pro_imgs}`} alt={item.pro_id.pro_name} />
                                            ) : (
                                                <img src={`${API_BASE_URL}/resources/default-image.png`} alt="default" />
                                            )}
                                        </a>
                                    </div>
                                    <div>{item.pro_id.pro_name}</div>
<<<<<<< Updated upstream
                                    <div>{item.oritem_quan}</div>
=======
                                    <div>{item.order_id.oritem_count}</div>
>>>>>>> Stashed changes
                                    <div>{item.pro_id.pro_price}원</div>
                                    <div>{(item.pro_id.pro_price * item.oritem_quan)}원</div>
                                    {matchedReview ? (
                                        <div>
<<<<<<< Updated upstream
                                            <span style={{cursor: 'pointer'}} onClick={() => reviewModifyPop(item.pro_id.pro_id, item.order_id.order_id, matchedReview.rev_id)}>리뷰수정</span>
                                            &nbsp;&nbsp;&#124;&#124;&nbsp;&nbsp;
                                            <span style={{cursor: 'pointer'}} onClick={() => reviewDelete(matchedReview.rev_id)}>리뷰삭제</span>
                                        </div>
                                    ) : (
                                        <div style={{cursor: 'pointer'}} onClick={() => reviewPop(item.pro_id.pro_id, item.order_id.order_id)}>리뷰작성</div>
=======
                                            <div onClick={() => reviewModifyPop(item.pro_id.pro_id, item.order_id.order_id)}>리뷰수정</div>
                                            <div onClick={() => reviewDelete(item.pro_id.pro_id, item.order_id.order_id)}>리뷰삭제</div>
                                        </div>
                                    ) : (
                                        <div onClick={() => reviewPop(item.pro_id.pro_id, item.order_id.order_id)}>리뷰작성</div>
>>>>>>> Stashed changes
                                    )}
                                </div>

                            );
                        })
                    ) : (
                        <div className="cart-item">
                            <div>등록된 주문이 없습니다.</div>
                        </div>
                    )}

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="리뷰 작성"
                    >
                        <form className="review_pop">
                            <h2>리뷰작성</h2>
                            <div>
                                <div>제목
                                    <input name='rev_title' value={rev_title} onChange={(e) => setReviewTitle(e.target.value)} type="text" id="title" className="re_title" />
                                </div>
                                <div>별점
                                    <StarRating name='rev_rating' rating={rev_rating} setRating={setRating} />
                                </div>
                                <div className="reviewBox">내용
                                    <textarea value={rev_com} name='rev_com' onChange={(e) => setReviewMessage(e.target.value)} id="comment" className="re_comment" />
                                </div>
                            </div>
                            <div className="re_button_box">
<<<<<<< Updated upstream
                                <button type="button" className="re_button" onClick={reviewSubmit}>저장</button>
=======
                                <button type="button" className="re_button" onClick={reviewModify}>저장</button>
>>>>>>> Stashed changes
                                <button type="button" className="re_button" onClick={closeModal}>닫기</button>
                            </div>
                        </form>
                    </Modal>

                    <Modal
                        isOpen={modalModifyIsOpen}
                        onRequestClose={closeModalModify}
                        contentLabel="리뷰 수정"
                    >
                        <form className="review_pop">
                            <h2>리뷰수정</h2>
                            <div>
                                <div>제목
                                    <input name='rev_title' value={rev_title} onChange={(e) => setReviewTitle(e.target.value)} type="text" id="title" className="re_title" />
                                </div>
                                <div>별점
                                    <StarRating name='rev_rating' rating={rev_rating} setRating={setRating} />
                                </div>
                                <div className="reviewBox">내용
                                    <textarea value={rev_com} name='rev_com' onChange={(e) => setReviewMessage(e.target.value)} id="comment" className="re_comment" />
                                </div>
                            </div>
                            <div className="re_button_box">
<<<<<<< Updated upstream
                                <button type="button" className="re_button" onClick={reviewModify}>저장</button>
=======
                                <button type="button" className="re_button" onClick={reviewSubmit}>저장</button>
>>>>>>> Stashed changes
                                <button type="button" className="re_button" onClick={closeModalModify}>닫기</button>
                            </div>
                        </form>
                    </Modal>

                </div>
            </div>
        </div>
    );
};

export default Cart;
