import './SlideScroll.css';
import Slider from 'react-infinite-logo-slider';

export default function SlideScroll() {

    const slideScroll = [
        { id: '1', name: './image/scroll1.jpg', title: 'slideScrollImage1' },
        { id: '2', name: './image/scroll2.jpg', title: 'slideScrollImage2' },
        { id: '3', name: './image/scroll3.jpg', title: 'slideScrollImage3' },
        { id: '4', name: './image/scroll4.jpg', title: 'slideScrollImage4' },
        { id: '5', name: './image/scroll5.jpg', title: 'slideScrollImage5' },
        { id: '6', name: './image/scroll6.jpg', title: 'slideScrollImage6' },
        { id: '7', name: './image/scroll7.jpg', title: 'slideScrollImage7' },
    ];

    return (
        <section className='slideScrollContainers' >
            <div className="slideScrollContainer">
                <h2 className="gundamPerson">우리의 보물을 만들어지는 과정!</h2>
                <div className="slideScrollList">
                    <Slider
                        width="500px"
                        duration={20}
                        blurBorders={true}
                        blurBoderColor={'none'}
                        className="slideScroll"
                    >
                        {slideScroll.map((scroll) =>
                            <Slider.Slide>
                                <img className="slide" src={scroll.name} alt={scroll.id} />
                            </Slider.Slide>
                        )}
                    </Slider>
                </div>
            </div>
        </section >
    )
}