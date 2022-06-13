import introHtml from './Intro.html';
import './Intro.scss';
// external libraries
import EmblaCarouselIntro from 'embla-carousel';
import AutoplayIntro from 'embla-carousel-autoplay';

const IntroSection = (container) => {
    container.innerHTML += introHtml;

    window.addEventListener('DOMContentLoaded', () => {
        /* carousel */
        /* there is a weird bug in a production mode. unless you use setTimout, exactly this carousel wont be working until screen resizing */
        setTimeout(() => {
            const emblaNodeIntro = document.querySelector('.intro__carousel');
            console.log(emblaNodeIntro);

            const emblaOptionsIntro = { loop: true };
            const emplaPluginsIntro = [AutoplayIntro()];

            const emblaIntro = EmblaCarouselIntro(emblaNodeIntro, emblaOptionsIntro, emplaPluginsIntro);

            /* carousel navigation */
            const setupDotBtns = (dotsArray, embla) => {
                dotsArray.forEach((dotNode, i) => {
                    dotNode.addEventListener('click', () => embla.scrollTo(i), false);
                });
            };

            const generateDotBtns = (dots, embla) => {
                const template = document.querySelector('#intro__carousel-dot-template').innerHTML;
                dots.innerHTML = embla.scrollSnapList().reduce((acc) => acc + template, '');
                return [].slice.call(dots.querySelectorAll('.intro__carousel-dot'));
            };

            const selectDotBtn = (dotsArray, embla) => () => {
                const previous = embla.previousScrollSnap();
                const selected = embla.selectedScrollSnap();
                dotsArray[previous].classList.remove('is-selected');
                dotsArray[selected].classList.add('is-selected');
            };

            const dots = document.querySelector('.intro__carousel-dots');
            const dotsArray = generateDotBtns(dots, emblaIntro);
            const setSelectedDotBtn = selectDotBtn(dotsArray, emblaIntro);

            setupDotBtns(dotsArray, emblaIntro);

            emblaIntro.on('select', setSelectedDotBtn);
            emblaIntro.on('init', setSelectedDotBtn);
        }, 10);
    });
};

export { IntroSection };
