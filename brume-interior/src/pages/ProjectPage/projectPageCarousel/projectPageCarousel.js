import EmblaCarousel from 'embla-carousel';
import ClassNames from 'embla-carousel-class-names';
import './carouselStyles.scss';
import { parallax } from './carouselParallax';

const projectPageCarousel = (galleryPlugin) => {
    const wrap = document.querySelector('.embla');
    const viewPort = wrap.querySelector('.embla__viewport');

    const classNamesOptions = {
        selected: 'projectPage__carousel-slide-selected',
    };

    const embla = EmblaCarousel(viewPort, { loop: false, dragFree: true }, [ClassNames(classNamesOptions)]);

    const applyParallaxStyles = parallax(embla);
    embla.on('init', applyParallaxStyles);
    embla.on('scroll', applyParallaxStyles);
    embla.on('resize', applyParallaxStyles);

    /* prevent accidental click */
    const links = document.querySelectorAll('.projectPage__carousel-slide-selected');

    const checkCoordinates = (event, linkInfo) => {
        const calcX = () => {
            if (event.pageX > linkInfo.linkX && event.pageX < linkInfo.linkX + linkInfo.linkWidth) {
                return true;
            }
        };

        if (calcX()) {
            const pointElems = document.elementsFromPoint(event.pageX, event.pageY);
            const galleryImg = 'projectPage__carousel-slide-selected';
            pointElems.forEach((el) => {
                if (el.className.includes(galleryImg)) {
                    const index = [...el.parentElement.children].indexOf(el);
                    galleryPlugin.openGallery(index);
                }
            });
        }
    };

    links.forEach((link) => {
        const linkSizes = link.getBoundingClientRect();
        const linkInfo = {
            linkX: linkSizes.x,
            linkY: linkSizes.y,
            linkWidth: linkSizes.width,
            linkHeight: linkSizes.height,
        };

        let msdownPos;
        let msupPos;

        viewPort.addEventListener('mousedown', (event) => {
            msdownPos = event.pageX;
        });
        viewPort.addEventListener('mouseup', (event) => {
            msupPos = event.pageX;
            const numDiff = Math.max(msdownPos, msupPos) - Math.min(msdownPos, msupPos);
            if (numDiff <= 15) {
                checkCoordinates(event, linkInfo);
            }
        });
    });
};

export { projectPageCarousel };
