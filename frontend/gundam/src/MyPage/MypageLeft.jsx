import { Link } from 'react-router-dom';


export default function MypageLeft() {


    return (
        <div className='mypage_menu'>
            <h2 className='MyPage_h2'><Link to={`/MyPage`}>마이페이지</Link></h2>
            <ul>
                <li><Link to={`/Cart`}>장바구니</Link></li>
                <li><Link to={`/Order`}>구매내역</Link></li>
                <li>리뷰관리</li>
                <li><Link to={`/MyInfoUp`}>회원정보변경</Link></li>
                <li>알림신청</li>
            </ul>
            <h2 className='MyPage_h3'>나의 혜택관리</h2>
            <ul>
                <li>회원등급</li>
                <li>구매실적</li>
                <li>포인트내역</li>
                <li>쿠폰내역</li>
            </ul>
        </div>
    )
}