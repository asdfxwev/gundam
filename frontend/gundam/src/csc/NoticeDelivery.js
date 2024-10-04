import { useState, useEffect } from 'react';
import './Notice.css';
import { useLocation } from 'react-router-dom';



export default function NoticeDelivery({ paginatedItems }) {
    const [visibleNotice, setVisibleNotice] = useState(null);
    const [noticeState, setNoticeState] = useState([]); // 문의 데이터 상태

    useEffect(() => {
        setNoticeState(paginatedItems)
    },[paginatedItems])

    function onNoticeTitle(noticeId) {
        setVisibleNotice(noticeId === visibleNotice ? null : noticeId)
    }

    // console.log(noticeState);

    return (
        <div className="noticeDeliveryContainer">
            {noticeState.map((noticeNum) => (
            <>
                <div className="noticeDeliveryGrid">
                    <div style={{ height: '50px', width: '220px' }}>{noticeNum.notice}</div>
                    <div onClick={() => onNoticeTitle(noticeNum.id)} style={{ width: '1100px', cursor: 'pointer' }}>{noticeNum.title}</div>
                    <div style={{ height: '50px', width: '220px' }}>{noticeNum.date}</div>
                </div>
                <div className={`noticeData ${visibleNotice !== noticeNum.id ? '' : 'noticeBlockData'}`}>{noticeNum.data}</div>
            </>
        ))}
        </div>
    )
}