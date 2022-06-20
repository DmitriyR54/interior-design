import servicesHtml from './Services.html';
import './Services.scss';
// scrollbar library
import OverlayScrollbars from 'overlayscrollbars';
import 'overlayscrollbars/css/OverlayScrollbars.min.css';

const ServicesSection = (container) => {
    container.innerHTML += servicesHtml;

    window.addEventListener('DOMContentLoaded', () => {
        // TABS FUNCTIONALITY
        // list of tab buttons
        const servicesTab = document.querySelectorAll('.services__tab');
        // list of items to show
        const servicesItems = document.querySelectorAll('.services__item');

        const selectService = (event) => {
            // clicked button
            const btn = event.target;
            // remove active styles from all of the buttons
            servicesTab.forEach((el) => {
                el.classList.remove('tab-active');
            });
            // add active styles to the clicked button
            btn.classList.add('tab-active');

            // clicked button category
            const service = btn.getAttribute('data-service');

            // show only item which matches clicked button's category
            servicesItems.forEach((item) => {
                const itemService = item.getAttribute('data-service');
                if (itemService === service) {
                    item.classList.add('services__item-active');
                } else {
                    item.classList.remove('services__item-active');
                }
            });
        };

        servicesTab.forEach((btn) => {
            btn.addEventListener('click', selectService);
        });

        // SCREEN ADAPTATION
        const servicesTabsWrapper = document.querySelector('.services__tabs');
        let scrollbar;

        const showTabsList = () => {
            servicesTab.forEach((btn) => {
                // add top border for all inactive buttons
                if (!btn.classList.contains('tab-active')) {
                    btn.style.borderTop = '2px solid  #00203a';
                }
            });
            // add active styles to the wrapper
            servicesTabsWrapper.classList.add('services__tabs-show');
            servicesTabsWrapper.style.height = '200px';
            // implement a scrollbar
            scrollbar = OverlayScrollbars(servicesTabsWrapper, {});
        };

        const hideTabsList = () => {
            // current active tab button
            const activeBtn = document.querySelector('.services__tab.tab-active');
            activeBtn.style.borderTop = 'none';
            // remove active styles from the wrapper
            servicesTabsWrapper.classList.remove('services__tabs-show');
            // set the wrapper width equal to the active tab button
            servicesTabsWrapper.style.height = `${activeBtn.parentNode.clientHeight}px`;
            if (scrollbar) {
                activeBtn.parentNode.parentNode.insertBefore(activeBtn.parentNode, activeBtn.parentNode.parentNode.querySelector('li'));
                scrollbar.scroll(0, 500);
            }
        };

        const hoverTabsList = () => {
            // on the mobile devices (starting from tablets) we show minimized list of services tabs
            if (window.innerWidth <= 768) {
                hideTabsList();
                servicesTabsWrapper.addEventListener('mouseenter', showTabsList);
                servicesTabsWrapper.addEventListener('mouseleave', hideTabsList);
            } else {
                // if a scrollbar was active we need to hide it
                if (scrollbar) {
                    scrollbar.destroy();
                }
                // remove borders from all of the tabs buttons
                servicesTab.forEach((btn) => {
                    btn.style.borderTop = 'none';
                });
                servicesTabsWrapper.style.height = 'auto';
                servicesTabsWrapper.removeEventListener('mouseenter', showTabsList);
                servicesTabsWrapper.removeEventListener('mouseleave', hideTabsList);
            }
        };

        // apply function when user enters the page, when resizes browser window or if changes screen orientation (portrait/landscape)
        hoverTabsList();
        window.addEventListener('resize', hoverTabsList);
        screen.orientation.addEventListener('change', hoverTabsList);
    });
};

export { ServicesSection };
