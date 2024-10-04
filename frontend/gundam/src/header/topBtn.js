import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function TopBtn() {
    const [imageSrc, setImageSrc] = useState('./image/underGundam.png');
    const [bottomOffset, setBottomOffset] = useState(30);
    const topRef = useRef(null);
    const [showButton, setShowButton] = useState(false);
    // const orbitControlsRef = useRef(null);

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('.footer'); // Ensure this selector matches your footer element
            if (!footer) return;
            const footerRect = footer.getBoundingClientRect(); // Check if footer exists

            if (footer && window.scrollY > window.innerHeight * 0.5) {
                setShowButton(true);

            } else {
                setShowButton(false);
            }

            if (footer) {
                if (window.innerHeight - footerRect.top > 0) {
                    setBottomOffset(window.innerHeight - footerRect.top); // Adjust the offset to avoid overlapping
                } else {
                    setBottomOffset(20);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* <img src='./image/underGundam.png' alt='underGundam' style={{ pointer: 'cursor' }} onClick={scrollTop} /> */}
            {/* <img */}
            {showButton && <FontAwesomeIcon icon={faArrowUp}
                src={imageSrc}
                alt='topBtn'
                className='topBtn'
                onClick={() => {
                    scrollTop();
                }}
                style={{ bottom: `${bottomOffset}px`, transition: 'all 0.3s', cursor: 'pointer', zIndex: '15' }}
            />
            }
        </>
    )
}