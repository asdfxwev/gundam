import IntersectionObservers from './IntersectionObservers'
import ProjectImg from './ProductImg'
import Slide from './Slide';
import MainTab from './MainTab';
import BrandFigure from './BrandFigure';
import SlideScroll from './SlideScroll';

export default function MainComponent () {

    return (
        <main style={{overflow:'hidden'}}>
            <Slide />
            {/* <Slider /> */}
            {/* <IntersectionObserverss /> */}
            <MainTab />
            <IntersectionObservers />
            <BrandFigure />
            <SlideScroll />
            <ProjectImg />
        </main>
    )
}