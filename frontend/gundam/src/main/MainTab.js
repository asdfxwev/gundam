import './MainTab.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainTabImage from './MainTabImage';
import MainTabImageData from './MainTabImageData'

export default function MainTab() {


    const [visibleTabMenu, setVisibleTabMenu] = useState(null);

    const TabMenu = (TabMenu) => {
        if (visibleTabMenu !== TabMenu) {
            setVisibleTabMenu(TabMenu);
        }
    };

    useEffect(() => {
        setVisibleTabMenu('MainTabImage1');
    }, []);

    return (
        <section className="mainTab" >
            <div className="tabButtonContainer">
                <ul className="tabButtonList">
                    <li className="tabButton" onMouseEnter={() => TabMenu('MainTabImage1')}>
                        <NavLink to='/' >#마감임박! 종료예정 예약상품⏰</NavLink>
                    </li>
                    <li className="tabButton" onMouseEnter={() => TabMenu('MainTabImage2')}>
                        <NavLink to='/' >#시선집중! NEW 예약상품🎈</NavLink>
                    </li>
                    <li className="tabButton" onMouseEnter={() => TabMenu('MainTabImage3')}>
                        <NavLink to='/' >#잘나가는 인기완구🎁</NavLink>
                    </li>
                    <li className="tabButton" onMouseEnter={() => TabMenu('MainTabImage4')}>
                        <NavLink to='/' >#누구나 갖고싶은 프라모델🎇</NavLink>
                    </li>
                    <li className="tabButton" onMouseEnter={() => TabMenu('MainTabImage5')}>
                        <NavLink to='/' >#취향저격 피규어🔫</NavLink>
                    </li>
                </ul>
            </div>
            <div className="tabImageContainer">
                <ul className='tabImageList'>
                    {visibleTabMenu && <MainTabImage images={MainTabImageData[visibleTabMenu]} />}
                </ul>
            </div>
        </section>
    );
}
