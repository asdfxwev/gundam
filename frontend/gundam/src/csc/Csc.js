import { useState } from 'react'; // React의 useState 훅을 임포트
import './Csc.css'; // CSS 파일 임포트

export default function Csc({ item }) { // 'item'을 props로 받는 Csc 컴포넌트 정의

    // 상태 변수 정의
    const [visibleNotice, setVisibleNotice] = useState(null); // 현재 보이는 공지의 ID를 저장하는 상태
    const [cscAnimating, setcscAnimating] = useState(false); // 애니메이션 중인지 여부를 저장하는 상태
    const [cscClosing, setcscClosing] = useState(false); // 닫기 애니메이션 중인지 여부를 저장하는 상태

    // 공지 제목 클릭 시 호출되는 함수
    const onNoticeTitle = (noticeId) => {
        if (noticeId === visibleNotice) { // 이미 보이는 공지를 클릭한 경우
            setcscClosing(true); // 닫기 애니메이션 시작
            setTimeout(() => { // 애니메이션 시간 동안 대기 후
                setVisibleNotice(null); // 보이는 공지를 숨김
                setcscClosing(false); // 닫기 애니메이션 상태 해제
            }, 500); // CSS 애니메이션 시간과 일치하도록 500ms 설정
        } else {
            setVisibleNotice(noticeId); // 클릭한 공지를 보이도록 설정
            setcscAnimating(true); // 열기 애니메이션 시작
            setTimeout(() => { // 애니메이션 시간 동안 대기 후
                setcscAnimating(false); // 열기 애니메이션 상태 해제
            }, 500); // CSS 애니메이션 시간과 일치하도록 500ms 설정
        }
    };
    

    return (
        <>
            {/* 공지 제목을 표시하는 부분 */}
            <div className="CscListTitles">
                <div style={{ width: '100px'}}>{item.classification}</div>
                <div style={{ width: '800px'}} onClick={() => onNoticeTitle(item.id)}>{item.title}</div>
            </div>

            {/* 공지 세부 정보를 표시하는 부분 */}
            <div className={`nonVisible ${visibleNotice !== item.id ? '' : 'Cscblock'} 
                ${cscAnimating ? 'menuAnimation' : ''} ${cscClosing ? 'cscClosing' : ''}`}>
                {item.detail}
            </div>
        </>
    )
}
