import React, { useState } from "react";
import './ItemDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from "../service/app-config";

const SectionImg = ( {imgList, productList} ) => {

    const [isOpen, setIsOpen] = useState(true);

    const accordion = () => {
        setIsOpen(!isOpen);
    };

    

    return(
        <>
                {imgList && imgList.map((item, i) => (
                    <>
                        
                            <img
                                className="item_detail_img"
                                src={`${API_BASE_URL}/resources/productImg/${item.pro_id.pro_id}/${item.pro_imgs}`}
                                alt="sub_img"
                            />
                        
                    </>
                ))}


            <div className="detail_info_box">
                <div className="info_top_box">
                    <div className="info_top_left">상품상세정보</div>
                    <div className="info_top_right">
                        <FontAwesomeIcon className="iconsize" icon={isOpen ? faAngleUp : faAngleDown} onClick={accordion} />
                    </div>
                </div>
                <div className={`info_bottom_box ${isOpen ? '' : 'detail_visible'}`}>
                    <div>제품명</div>
                    {productList && 
                        <div>{productList.pro_name}</div>

                    }
                    <div>판매코드</div>
                    <div>G0000015935</div>
                    <div>모델명</div>
                    <div>4573102607607</div>
                    <div>크기, 중량</div>
                    <div>상품상세참고</div>
                    <div>사용연령 또는 체중범위</div>
                    <div>만 15세 이상</div>
                    <div>제조국</div>
                    <div>Japan</div>
                    <div>제조사</div>
                    <div className="company">BANDAI SPIRITS CO., LTD.</div>
                    <div>품질보증기준</div>
                    <div>구매일로부터 1년 (특정상품제외)</div>
                    <div>A/S 및 상담문의</div>
                    <div>고객센터 1544-4607</div>
                    <div>취급방법 및 주의사항</div>
                    <div>작은 부품 및 날카로운 부품을 포함하고 있으니 삼키거나 다치지 않도록 부모님의 지도가 필요함. 부품의 절단은 프라모델 전용 니퍼 사용을 권장함. 화기에 가까이 하지 말 것. 무리한 힘을 가하지 말 것.</div>
                    <div>재질</div>
                    <div>PE, PVC, PC, PS</div>
                    <div>A/S 및 상담문의</div>
                    <div>15세 이상</div>
                    <div>A/S 및 상담문의</div>
                    <div>혼합컬러 (상품상세설명 참조)</div>
                    <div>자율안전 확인신고 필증번호</div>
                    <div className="kc_check">BNKR15-9 / NON-KC</div>
                </div>
            </div>
        </>
    );
}

export default SectionImg;