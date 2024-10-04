import React, { useEffect, useState, useRef } from 'react';
import './slide.css';

export default function Slider() {
    const slideImages = [
        { id: 'slideImage1', name: './image/slide1.jpg', alts: 'img1' },
        { id: 'slideImage2', name: './image/slide2.jpg', alts: 'img2' },
        { id: 'slideImage3', name: './image/slide3.jpg', alts: 'img3' },
        { id: 'slideImage4', name: './image/slide4.jpg', alts: 'img4' },
        { id: 'slideImage5', name: './image/slide5.jpg', alts: 'img5' },
        { id: 'slideImage6', name: './image/slide6.jpg', alts: 'img6' },
        { id: 'slideImage7', name: './image/slide7.jpg', alts: 'img7' },
        { id: 'slideImage8', name: './image/slide8.jpg', alts: 'img8' },
        { id: 'slideImage9', name: './image/slide9.jpg', alts: 'img9' },
        { id: 'slideImage10', name: './image/slide10.jpg', alts: 'img10' },
    ];

    const [slideIdx, setSlideIdx] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isThrottled, setIsThrottled] = useState(false);
    const slideRef = useRef();
    const autoSlideRef = useRef();

    useEffect(() => {
        const handleTransitionEnd = () => {
            setIsTransitioning(false);
            if (slideIdx === 0) {
                setSlideIdx(slideImages.length);
            } else if (slideIdx === slideImages.length + 1) {
                setSlideIdx(1);
            }
        };

        slideRef.current.addEventListener('transitionend', handleTransitionEnd);
        return () => {
            slideRef.current.removeEventListener('transitionend', handleTransitionEnd);
        };
    }, [slideIdx, slideImages.length]);

    useEffect(() => {
        if (!isHovered) {
            autoSlideRef.current = setInterval(() => {
                setIsTransitioning(true);
                setSlideIdx((prevIdx) => (prevIdx + 1) %(slideImages.length + 2));
            }, 4000);
            return () => clearInterval(autoSlideRef.current);
        }
    }, [isHovered]);

    useEffect(() => {
        if (!isTransitioning) {
            slideRef.current.style.transition = 'none';
            setTimeout(() => {
                slideRef.current.style.transition = 'transform 0.7s ease-in-out';
            }, 50);
        }
    }, [isTransitioning]);

    const handleNext = () => {
        if (isThrottled) return;
        setIsThrottled(true);
        clearInterval(autoSlideRef.current);
        setIsTransitioning(true);
        setSlideIdx((prevIdx) => (prevIdx + 1) % (slideImages.length + 2));
        setTimeout(() => setIsThrottled(false), 2000);
    };

    const handlePrev = () => {
        if (isThrottled) return;
        setIsThrottled(true);
        clearInterval(autoSlideRef.current);
        setIsTransitioning(true);
        setSlideIdx((prevIdx) => (prevIdx - 1) % (slideImages.length + 2));
        setTimeout(() => setIsThrottled(false), 2000);
    };

    const handleMouseEnter = () => {
        clearInterval(autoSlideRef.current);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsTransitioning(true);
    };

    // console.log(slideIdx);
    // console.log(slideImages.length);

    return (
        <section >
            <div
                className="main_container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="slide_container">
                    <ul className="slide_list" ref={slideRef} style={{ transform: `translateX(${-slideIdx * 100}%)` }}>
                        <li className="slides">
                            <img src={slideImages[slideImages.length - 1].name} alt={slideImages[slideImages.length - 1].alts} />
                        </li>
                        {slideImages.map((image, i) => (
                            <li key={i} className="slides">
                                <img src={image.name} alt={image.alts} className={image.id} />
                            </li>
                        ))}
                        <li className="slides">
                            <img src={slideImages[0].name} alt={slideImages[0].alts} />
                        </li>
                    </ul>
                </div>
                <img
                    className="backBtn"
                    src="./image/left_btn.png"
                    alt="leftBtn"
                    onClick={handlePrev}
                />
                <img
                    className="forwardBtn"
                    src="./image/right_btn.png"
                    alt="rightBtn"
                    onClick={handleNext}
                />
            </div>
        </section>
    );
}
