import React, { useState } from "react";
import './ItemDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const ItemService = () => {

    const [DeliveryOpen, setDeliveryOpen] = useState(true);
    const [ReturnOpen, setReturnOpen] = useState(true);

    const accordion1 = () => {
        setDeliveryOpen(!DeliveryOpen);
    };

    const accordion2 = () => {
        setReturnOpen(!ReturnOpen);
    };

    return(
        <>
            <div className="detail_info_box">
                <div className="info_top_box" id="SERVICE">
                    <div className="info_top_left">배송안내</div>
                    <div className="info_top_right">
                        <FontAwesomeIcon className="iconsize" icon={DeliveryOpen ? faAngleUp : faAngleDown} onClick={accordion1} />
                    </div>
                </div>
                <div className={`service_delivery_list ${DeliveryOpen ? '' : 'detail_visible'}`}>
                    <div>BNKR몰 배송안내</div>
                    <div>
                        <p>이용택배사 : CJ 대한통운 (CJ 대한통운 고객센터 : 1588-1255)</p>
                        <p>배송지역 : 전국 (해외배송 불가)</p>
                    </div>
                    <div>배송기간 안내</div>
                    <div>
                        <p>주말, 공휴일을 제외한 영업일 기준으로 평균 1~5일정도 소요됩니다.</p>
                        <p>프리미엄 반다이, 웹한정 등 예약 상품은 상품이 입고된 후에 출고됩니다.</p>
                        <p>물류산정 및 부피나 무게 문제로 분할 배송되는 경우 박스에 따라 배송 기간이 다소 차이날 수 있습니다.</p>
                        <p>연말, 연초, 명절 등 택배사에 물류가 집중되는 시기에는 평균적인 배송 시기보다 늦을 수 있습니다.</p>
                    </div>
                    <div>주문 출고 마감 안내</div>
                    <div>
                        <p>반다이남코코리아몰은 아래와 같은 기준으로 출고하고 있습니다.</p>
                        <p>평일 : 오전 9시까지의 주문 건, 당일 출고</p>
                        <p>토,일 : 금요일 오전 9시 이후 주문 ~ (주말 포함) 월요일 오전 9시 주문 건, 월요일 오전 9시 출고 마감.</p>
                        <p>법정공휴일 : 전일 오전 9시 이후 주문 ~ 법정 공휴일이 지난 영업일 오전 9시 주문 건, 영업일 9시 출고 마감.</p>
                        <p>배송 준비 중인 주문의 경우, 오전 9시 이후에는 출고 작업이 진행 중이므로 주문 취소 처리가 불가능합니다.</p>
                    </div>
                </div>
            </div>

            <div className="detail_info_box">
                <div className="info_top_box">
                    <div className="info_top_left">반품/교환/AS</div>
                    <div className="info_top_right">
                        <FontAwesomeIcon className="iconsize" icon={ReturnOpen ? faAngleUp : faAngleDown} onClick={accordion2} />
                    </div>
                </div>
                <div className={`service_return_list ${ReturnOpen ? '' : 'detail_visible'}`}>
                    <div>반품안내</div>
                    <div>
                        <p>제품 불량, 오배송 등 당사의 과실로 인한 반품은 당사가 배송비를 부담합니다.</p>
                        <p>단, 단순 변심 및 고객님의 사정으로 반품하실 경우 배송비는 고객님께서 부담하셔서 보내주시면 됩니다.</p>
                    </div>
                    <div>교환안내</div>
                    <div>
                        <p>제품 불량, 오배송 등 당사 과실로 인한 반품은 당사가 배송비를 부담합니다. 다른 상품으로는 교환되지 않습니다.</p>
                        <p>보내주실 곳 주소 : 경기도 오산시 동부대로 446(원동) 풍농오산센터 4층  (고객센터) 반다이남코코리아몰 담당자 앞</p>
                        <p>연락처 : 1544-4607</p>
                    </div>
                    <div>반품 및 교환 가능 기준</div>
                    <div>
                        <p>상품의 포장 등을 훼손, 개봉하지 않은 상태로 반품 접수 후 처리됩니다.</p>
                        <p>구매 후 7일 전에 반품 의사를 접수해주시기 바랍니다.</p>
                    </div>
                    <div>반품 및 교환 불가능 기준</div>
                    <div>
                        <p>구매확정 이후에는 교환/반품 불가능합니다.</p>
                        <p>상품 패키지는 상품을 포장하는 포장재이며 상품의 일부분이 아닙니다.</p>
                        <p>제품 내용물이 훼손되지 않은 유통 과정에서 발생한 오염이나 패키지 손상은 교환 및 반품 대상이 되지 않습니다.</p>
                        <p>모니터 해상도 설정 차이로 인하여 상품 및 이미지의 색상이 실제와 다를 수 있으며 이는 교환 및 반품 사유가 되지 않습니다.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemService;