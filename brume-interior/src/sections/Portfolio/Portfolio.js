import portfolioHtml from './Portfolio.html';
import './Portfolio.scss';

const PortfolioSection = (container) => {
    container.innerHTML += portfolioHtml;

    window.addEventListener('DOMContentLoaded', () => {
        // HOVER EFFECT ON THE SINGLE PORTFOLIO ITEM
        const portfolioItems = document.querySelectorAll('.portfolio__item');
        // make element wider when mouse enters it
        const portfolioMouseEnter = (event) => {
            portfolioItems.forEach((el) => {
                if (el != event.target) {
                    el.style.flex = '0 0 22%';
                }
            });
            event.target.style.flex = '0 0 34%';
            event.target.style.transition = '0.25s ease-in-out';
        };
        // return to default width
        const portfolioMouseLeave = () => {
            portfolioItems.forEach((el) => {
                el.style.flex = '0 0 25%';
                el.style.transition = '0.25s ease-in-out';
            });
        };

        // hover function
        const portfolioHover = () => {
            portfolioItems.forEach((el) => {
                // add effect on the screens wider than 768px (pc)
                if (window.innerWidth > 768) {
                    el.addEventListener('mouseenter', portfolioMouseEnter);
                    el.addEventListener('mouseleave', portfolioMouseLeave);
                    el.addEventListener('focus', portfolioMouseEnter);
                    el.addEventListener('blur', portfolioMouseLeave);
                } else {
                    // and remove it starting from tablets
                    el.removeEventListener('mouseenter', portfolioMouseEnter);
                    el.removeEventListener('mouseleave', portfolioMouseLeave);
                    el.removeEventListener('focus', portfolioMouseEnter);
                    el.removeEventListener('blur', portfolioMouseLeave);

                    // return elements to default width
                    portfolioItems.forEach((el) => {
                        el.style.flex = '0 0 25%';
                    });
                }
            });
        };
        // apply function when user enters the page, when resizes browser window or changes screen orientation (portrait/landscape)
        portfolioHover();
        window.addEventListener('resize', portfolioHover);
        window.addEventListener('orientationChange', portfolioHover);

        // DETAIL INFORMATION ABOUT SINGLE PORTFOLIO ITEM
        const portfolioBtn = document.querySelectorAll('.portfolio__item-more');
        const portfolioModal = document.querySelector('.portfolio__modal');

        // let modalActive = false;
        /* toggle modal status */
        // !modalActive ? (modalActive = true) : (modalActive = false);

        let modalBtn;

        const openModal = (index) => {
            // show modal window
            portfolioModal.classList.add('portfolio__modal-active');
            // let user close it via Esc button
            portfolioModal.tabIndex = 0;
            portfolioModal.focus();
            // set which button was used to open the window so this item will be active when user closes the window
            modalBtn = index;
        };

        const closeModal = (modal) => {
            if (modal.className === 'portfolio__modal portfolio__modal-active') {
                // hide modal window
                portfolioModal.classList.remove('portfolio__modal-active');
                // remove inactive modal window from tabulation
                portfolioModal.blur();
                portfolioModal.tabIndex = -1;
                // focus on the item that was used to open modal window
                portfolioItems[modalBtn].focus();
            }
        };

        // show modal window
        portfolioBtn.forEach((element, index) => {
            element.addEventListener('click', () => openModal(index));
        });
        // hide modal window
        portfolioModal.addEventListener('click', () => closeModal(portfolioModal));
        // let user close it via Esc button
        portfolioModal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal(portfolioModal);
            }
        });
    });
};

export { PortfolioSection };
