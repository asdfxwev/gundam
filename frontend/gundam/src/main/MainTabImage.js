// import './MainTabImage.css';


const MainTabImage = ({ images }) => {
    return (
        <>
            {images.map((image, i) => (
                <li className="tabImage" key={image.id}>
                    <a href={`/ItemList/ItemDetail/${image.detail}`}>
                        <div className="tabImageFlex">
                            <img alt={image.realName} src={image.name} className="tabImg" />
                            <p className="reservationBuy"><span className="revBuy">예약구매</span></p>
                            <p className="productExplanation">{image.explanation}</p>
                            <p className="productName">{image.realName}</p>
                            <p className="productPrice">
                                <span>{image.price}</span>
                                <span>{image.won}</span>
                            </p>
                        </div>
                    </a>
                </li>
            ))}
        </>
    );
};

export default MainTabImage;
