import './BrandFigure.css';
import { useState, useEffect } from 'react';

export default function BrandFigure() {

    const BrandFigure = [
        { id: '1', name: './image/category1.png', style: 'category category1' },
        { id: '2', name: './image/category2.png', style: 'category category2' },
        { id: '3', name: './image/category3.png', style: 'category category3' },
        { id: '4', name: './image/category4.png', style: 'category category4' },
        { id: '5', name: './image/category5.png', style: 'category category5' },
        // { id: '6', name: './image/gundam3D.glb', style: 'category category6' },
    ];

    const [hoveredId, setHoveredId] = useState(null);

    const onFigureMouseOver = (id) => {
        setHoveredId(id);
    };

    const onFigureMouseOut = () => {
        setHoveredId(null);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('shows');
                }
                else {
                    entry.target.classList.add('show');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        const images1 = document.querySelectorAll('.category1');
        const images2 = document.querySelectorAll('.category2');
        const images3 = document.querySelectorAll('.category3');
        const images4 = document.querySelectorAll('.category4');
        const images5 = document.querySelectorAll('.category5');
        images1.forEach((img) => {
            observer.observe(img);
        });
        images2.forEach((img) => {
            observer.observe(img);
        });
        images3.forEach((img) => {
            observer.observe(img);
        });
        images4.forEach((img) => {
            observer.observe(img);
        });
        images5.forEach((img) => {
            observer.observe(img);
        });

        return () => {
            images1.forEach((img) => {
                observer.unobserve(img);
            });
            images2.forEach((img) => {
                observer.unobserve(img);
            });
            images3.forEach((img) => {
                observer.unobserve(img);
            });
            images4.forEach((img) => {
                observer.unobserve(img);
            });
            images5.forEach((img) => {
                observer.unobserve(img);
            });
        };
    }, []);


    return (
        <section className="BrandFigure">
            <h2 style={{fontSize:'3rem'}}>브랜드별 피규어</h2>
            <div className="FigureContainer">
                <ul className="FigureList">
                    {BrandFigure.map((figure, i) => (
                        <li key={figure.id} className="Figures">
                            <a href={`/ItemList/ItemDetail/${20 - i}`}>
                                <img onMouseOver={() => onFigureMouseOver(figure.id)} onMouseOut={onFigureMouseOut}
                                    className={`${figure.style} ${hoveredId === figure.id ? 'hovered' : ''} ${hoveredId && hoveredId !== figure.id ? 'shrink' : ''}`}
                                    src={figure.name}
                                    alt={figure.id}
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
