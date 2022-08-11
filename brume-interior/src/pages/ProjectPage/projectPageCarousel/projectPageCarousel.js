import EmblaCarousel from 'embla-carousel';
import ClassNames from 'embla-carousel-class-names';
import './carouselStyles.scss';
import { carouselParallax } from './carouselParallax';
import { setupPrevNextBtns, disablePrevNextBtns } from './carouselButtons';

const projectPageCarousel = (galleryPlugin) => {
    const wrap = document.querySelector('.projectPage__carousel');
    const viewPort = wrap.querySelector('.projectPage__carousel-viewport');

    /* set classname for the active element */
    const classNamesOptions = {
        selected: 'projectPage__carousel-slide-selected',
    };

    const prevBtn = wrap.querySelector('.projectPage__carousel-button--prev');
    const nextBtn = wrap.querySelector('.projectPage__carousel-button--next');

    const embla = EmblaCarousel(viewPort, { loop: false, dragFree: true }, [ClassNames(classNamesOptions)]);

    const applyParallaxStyles = carouselParallax(embla);
    embla.on('init', applyParallaxStyles);
    embla.on('scroll', applyParallaxStyles);
    embla.on('resize', applyParallaxStyles);

    const disablePrevAndNextBtns = disablePrevNextBtns(prevBtn, nextBtn, embla);
    setupPrevNextBtns(prevBtn, nextBtn, embla);
    embla.on('init', disablePrevAndNextBtns);
    embla.on('select', disablePrevAndNextBtns);

    /* prevent accidental click */
    /* list of the selected elements that user might click on */
    const links = document.querySelectorAll('.projectPage__carousel-slide-selected');

    /* this function prevents lightgallery.js from opening to the fullscreen mode if user intends just to drag the carousel */
    const checkCoordinates = (event, linkInfo) => {
        /* this function checks the coordinates where user has clicked and if it happened over an active carousel item, it returns true. I couldn't add an event listener to the active item itself, because it would simply open the fullscreen gallery, but I need to open it only if user didn't move mouse enough to swipe to the next element. You can read more about it at the file ProjectPage.scss, strings numbers are 25 and 36 */
        const calcX = () => {
            if (event.pageX > linkInfo.linkX && event.pageX < linkInfo.linkX + linkInfo.linkWidth) {
                return true;
            }
        };

        /* so now, after we are sure that user has clicked over an active item, we take all the elements that are located "under" a mouse and find there our active element. After that we call gallery plugin and pass an index of our element which we need to be opened  */
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
            linkWidth: linkSizes.width,
        };

        let msdownPos;
        let msupPos;

        viewPort.addEventListener('mousedown', (event) => {
            msdownPos = event.pageX;
        });
        viewPort.addEventListener('mouseup', (event) => {
            msupPos = event.pageX;
            const numDiff = Math.max(msdownPos, msupPos) - Math.min(msdownPos, msupPos);
            /* and now, when user clicks on the carousel's viewport and they weren't dragging it (we understand it by the difference between position of mousedown and mouseup events) we just call our function to check the coordinates of active carousel items and open lightgallery.js in the fullscreen mode with that specific image, that user has clicked on */
            if (numDiff <= 15) {
                checkCoordinates(event, linkInfo);
            }
        });
    });

    /* I know it's all might be a little confusing so let me explain the order of things once again: user clicks on the carousel's viewport -> we call a function checkCoordinates with information about click event and position of all carousel's active items -> function calcX checks whether a click has been made over an element or not -> if calcX has returned true, we only need to know our element's index and call a method which will open our lightgallery.js with an element that we've passed as an argument */
};

export { projectPageCarousel };
