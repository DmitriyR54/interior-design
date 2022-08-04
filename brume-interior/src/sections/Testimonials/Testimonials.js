import testimonialsHtml from './Testimonials.html';
import './Testimonials.scss';

import EmblaCarousel from 'embla-carousel';

const TestimonialsSection = (container) => {
    container.innerHTML += testimonialsHtml;

    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            /* carousel */
            const emblaNodeTestimonials = document.querySelector('.testimonials__carousel');

            const emblaOptionsTestimonials = { loop: false };

            /* initialize the carousel */
            const emblaTestimonials = EmblaCarousel(emblaNodeTestimonials, emblaOptionsTestimonials);

            /* list of testimonial items */
            const testimonialsItem = emblaNodeTestimonials.querySelectorAll('.testimonials__item');

            /* add styles for active item */
            const activeItemStyles = (array, item) => {
                array.forEach((el) => {
                    el.style.opacity = 0.5;
                    el.style.transform = 'scale(0.8)';
                });
                item.style.opacity = 1;
                item.style.transform = 'scale(1)';
            };

            /* carousel navigation */
            const setupDotBtns = (dotsArray, embla) => {
                dotsArray.forEach((dotNode, i) => {
                    dotNode.addEventListener('click', () => embla.scrollTo(i), false);
                });
            };

            const generateDotBtns = (dots, embla) => {
                const template = document.querySelector('#testimonials__carousel-dot-template').innerHTML;
                dots.innerHTML = embla.scrollSnapList().reduce((acc) => acc + template, '');
                return [].slice.call(dots.querySelectorAll('.testimonials__carousel-dot'));
            };

            const selectDotBtn = (dotsArray, embla) => () => {
                const previous = embla.previousScrollSnap();
                const selected = embla.selectedScrollSnap();
                dotsArray[previous].classList.remove('is-selected');
                dotsArray[selected].classList.add('is-selected');
                /* add styles for active item */
                activeItemStyles(testimonialsItem, testimonialsItem[selected]);
            };

            /* list of carousel pagination buttons */
            const dots = document.querySelector('.testimonials__carousel-dots');
            const dotsArray = generateDotBtns(dots, emblaTestimonials);
            const setSelectedDotBtn = selectDotBtn(dotsArray, emblaTestimonials);

            setupDotBtns(dotsArray, emblaTestimonials);

            emblaTestimonials.on('select', setSelectedDotBtn);
            emblaTestimonials.on('init', setSelectedDotBtn);

            /* smooth appearing on the screen */
            if ('IntersectionObserver' in window) {
                const observerCallback = (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            emblaNodeTestimonials.style.opacity = '1';
                            observer.unobserve(emblaNodeTestimonials);
                        }
                    });
                };

                const observerOptions = {
                    threshold: 0.3,
                };

                const observer = new IntersectionObserver(observerCallback, observerOptions);

                observer.observe(emblaNodeTestimonials);
            } else {
                emblaNodeTestimonials.style.opacity = '1';
            }
        }, 500);
    });
};

export { TestimonialsSection };
