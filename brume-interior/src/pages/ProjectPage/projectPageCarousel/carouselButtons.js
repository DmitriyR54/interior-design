/* thanks for the code example to davidcetinkaya, link for it - https://codesandbox.io/s/embla-carousel-parallax-vanilla-uk1c6 */

export const setupPrevNextBtns = (prevBtn, nextBtn, embla) => {
    prevBtn.addEventListener('click', embla.scrollPrev, false);
    nextBtn.addEventListener('click', embla.scrollNext, false);
};

export const disablePrevNextBtns = (prevBtn, nextBtn, embla) => {
    return () => {
        if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled');
        else prevBtn.setAttribute('disabled', 'disabled');

        if (embla.canScrollNext()) nextBtn.removeAttribute('disabled');
        else nextBtn.setAttribute('disabled', 'disabled');
    };
};
