import introHtml from './Intro.html';
import './Intro.scss';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

const IntroSection = (container) => {
    container.innerHTML += introHtml;

    window.addEventListener('DOMContentLoaded', () => {
        /* carousel */
        const emblaNode = document.querySelector('.intro__carousel');

        const emblaOptions = { loop: true };
        const emplaPlugins = [Autoplay()];

        const embla = EmblaCarousel(emblaNode, emblaOptions, emplaPlugins);

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
        const dotsArray = generateDotBtns(dots, embla);
        const setSelectedDotBtn = selectDotBtn(dotsArray, embla);

        setupDotBtns(dotsArray, embla);

        embla.on('select', setSelectedDotBtn);
        embla.on('init', setSelectedDotBtn);
    });
};

export { IntroSection };
