import { useState, useEffect } from 'react';

export default function HeaderMenuSmallTop() {
    const [menuSmallTop, setMenuSmallTop] = useState(null)
    useEffect(() => {
        function scroll() {
            if (window.scrollY > window.innerHeight * .3) {
                setMenuSmallTop(true)
            } else {
                setMenuSmallTop(false)
            }
        }
        window.addEventListener('scroll', scroll);

        return () => {
            window.removeEventListener('scroll', scroll)
        }
    }, [])
    return menuSmallTop
}