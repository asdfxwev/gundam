import React, { useRef, useState, useEffect } from 'react';
import HeaderMenuSmallTop from "./HeaderMenuSmallTop";
import './Button.css';
import { useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
// import { gsap } from 'gsap';

export default function Button() {
    const menuSmallTop = HeaderMenuSmallTop();
    const location = useLocation();
    const [bottomOffset, setBottomOffset] = useState(30);
    const topRef = useRef(null);
    const [showButton, setShowButton] = useState(false);
    const orbitControlsRef = useRef(null);

    const isMainPage = location.pathname !== '/';
    const isLoginPage = location.pathname.includes('/Login');
    const isDetailPage = location.pathname.includes('/ItemDetail');
    const isListPage = location.pathname.includes('/ItemList');

    function scrollTop() {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        if (isLoginPage) return; // early return inside the useEffect

        const handleScroll = () => {
            const footer = document.querySelector('.footer');
            if (!footer) return;
            const footerRect = footer.getBoundingClientRect();

            if (footer && window.scrollY > window.innerHeight * 0.5 /*&& window.scrollX > window.innerWidth * .3*/) {
                if (isDetailPage) {
                    setShowButton(false);
                } else {
                    setShowButton(true);
                }
            } else {
                setShowButton(false);
            }

            if (footer) {
                if (window.innerHeight - footerRect.top > 0) {
                    setBottomOffset(window.innerHeight - footerRect.top);
                } else {
                    setBottomOffset(20);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoginPage]);

    function Model() {
        const gltf = useGLTF('./image/zgmf-x10a_freedom_gundam/scene.gltf');
        useEffect(() => {
            gltf.scene.scale.set(0.02, 0.02, 0.02);
        }, [gltf.scene]);
        return <primitive object={gltf.scene} />;
    }

    // Return null immediately if on the login page, keeping hooks at the top
    if (isLoginPage) return null;
    // if (isDetailPage) return setShowButton(false);

    return (
        <div ref={topRef}>
            <div className={`Every ${menuSmallTop ? 'smallThing' : ''} ${isMainPage ? 'noPosition' : ''}`}>
                <a href='/'><h1 className="logo">logo</h1></a>
                {showButton && (
                    <Canvas
                        style={{ height: '150px', width: '150px', cursor: 'pointer', bottom: `${bottomOffset}px` }}
                        className='topBtn'
                        onClick={() => scrollTop()}
                    >
                        <ambientLight intensity={2} />
                        <spotLight position={[10, 10, 10]} angle={15} penumbra={1} />
                        <React.Suspense fallback={null}>
                            <Model />
                        </React.Suspense>
                        <OrbitControls
                            autoRotate
                            ref={orbitControlsRef}
                            enableZoom={false}
                            enablePan={false}
                            minPolarAngle={Math.PI / 4}
                            maxPolarAngle={Math.PI / 2}
                            target={[0, 2, 0]}
                        />
                    </Canvas>
                )}
            </div>
        </div>
    );
}
