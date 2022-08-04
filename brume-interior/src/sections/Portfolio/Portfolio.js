import portfolioHtml from './Portfolio.html';
import './Portfolio.scss';
// reusable components
import LazyLoad from 'Components/LazyLoad/LazyLoad';
import { openModal, closeModal } from 'Components/ModalWindow/Modal';
// external libraries
import EmblaCarouselPortfolio from 'embla-carousel';

const PortfolioSection = (container) => {
    container.innerHTML += portfolioHtml;

    window.addEventListener('DOMContentLoaded', () => {
        // list of portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio__item');

        // PORTFOLIO ITEMS FILTER
        const filterBtn = document.querySelectorAll('.portfolio__gallery-filter-btn');

        const filterPortfolio = (event) => {
            const btn = event.target;

            // remove "active" styles from all of the buttons
            filterBtn.forEach((button) => {
                button.classList.remove('btn-active');
            });
            // add "active" styles to the pressed button
            btn.classList.add('btn-active');

            // get pressed button's category value
            const category = btn.getAttribute('data-filter');

            // hide wrong portfolio items
            const hideItem = (item) => {
                // remove hidden item from navigation via Tab button
                item.tabIndex = -1;
                // width of the single portfolio item. depends on the screen size
                if (window.innerWidth > 768) {
                    item.style.marginLeft = '-25%';
                } else {
                    item.style.marginLeft = '-90%';
                }
                item.style.opacity = '0';
                item.style.overflow = 'hidden';
                // using "position: absolute" so item will not be accessible for "hover function" after hiding
                setTimeout(() => {
                    item.style.position = 'absolute';
                    item.style.zIndex = '-1';
                }, 250 /* transition value */);
            };

            // show filtered portfolio items
            const showItem = (item) => {
                // return to the default values
                item.tabIndex = 0;
                item.style.marginLeft = '0';
                item.style.opacity = '1';
                item.style.overflow = 'visible';
                item.style.position = 'static'; /* default "position" value */
                item.style.zIndex = '1';
            };

            // show all portfolio items
            if (category === 'all') {
                portfolioItems.forEach((el) => {
                    showItem(el);
                });
            } else {
                portfolioItems.forEach((el) => {
                    // hide wrong portfolio items
                    if (category != el.getAttribute('data-filter')) {
                        hideItem(el);
                    } else {
                        // and show filtered ones
                        showItem(el);
                    }
                });
            }
        };

        filterBtn.forEach((btn) => {
            btn.addEventListener('click', filterPortfolio);
        });

        // // HOVER EFFECT ON THE SINGLE PORTFOLIO ITEM
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
        // return to the default width when mouse leaves an element
        const portfolioMouseLeave = () => {
            portfolioItems.forEach((el) => {
                el.style.flex = '0 0 25%';
                el.style.transition = '0.25s ease-in-out';
            });
        };

        // hover function
        const portfolioHover = () => {
            portfolioItems.forEach((el) => {
                // add effect on the screens wider than 768px (PC)
                if (window.innerWidth > 768) {
                    el.addEventListener('mouseenter', portfolioMouseEnter);
                    el.addEventListener('mouseleave', portfolioMouseLeave);
                    el.addEventListener('focus', portfolioMouseEnter);
                    el.addEventListener('blur', portfolioMouseLeave);

                    // return element's width to the default value
                    portfolioItems.forEach((el) => {
                        el.style.flex = '0 0 25%';
                    });
                } else {
                    // and remove it starting from tablets
                    el.removeEventListener('mouseenter', portfolioMouseEnter);
                    el.removeEventListener('mouseleave', portfolioMouseLeave);
                    el.removeEventListener('focus', portfolioMouseEnter);
                    el.removeEventListener('blur', portfolioMouseLeave);

                    // return element's width to the default value
                    portfolioItems.forEach((el) => {
                        el.style.flex = '0 0 90%';
                    });
                }
            });
        };
        // apply function when user enters the page, when resizes browser window or if changes screen orientation (portrait/landscape)
        portfolioHover();
        window.addEventListener('resize', portfolioHover);
        screen.orientation.addEventListener('change', portfolioHover);

        // DETAIL INFORMATION ABOUT SINGLE PORTFOLIO ITEM
        // list of 'Detail info' buttons on the portfolio items
        const portfolioBtn = document.querySelectorAll('.portfolio__item-more');
        // modal window for portfolio section, where detail information will be displayed
        const portfolioModal = document.querySelector('.portfolio__modal');

        // index of active portfolio item
        let activeItemIndex;

        // array of downloaded portfolio information
        let portfolioData = [];
        // list of downloaded portfolio information (using string for performance improvement)
        let downloadedItems = '';

        // DOM nodes inside of the portfolio modal window
        const modalPhotos = document.querySelector('.portfolio__modal-photos');
        const modalName = document.querySelector('.portfolio__modal-name');
        const modalCategory = document.querySelector('.portfolio__modal-category');
        const modalDate = document.querySelector('.portfolio__modal-date');

        // download and render information about portfolio item
        const loadPortfolioData = (item) => {
            // name of the description json file
            const src = item.getAttribute('data-info');

            // insert downloaded data to the elements
            const renderData = () => {
                portfolioData.forEach((el) => {
                    if (el.filename === src) {
                        modalName.innerHTML = el.data.name;
                        modalCategory.innerHTML = el.data.category;
                        modalDate.innerHTML = el.data.date;
                        let images = '';
                        el.data.images.forEach((img) => {
                            // single img element HTML code
                            images += `<div class="image portfolio__modal-image"> <img data-src=${img.filename} width=${img.width} height=${img.height} class="lazy-image"> </div>`;
                        });
                        modalPhotos.innerHTML = images;
                        // download images
                        LazyLoad();

                        // use carousel for images
                        setTimeout(() => {
                            const emblaNodePortfolio = document.querySelector('.portfolio__modal-photos-wrapper');
                            EmblaCarouselPortfolio(emblaNodePortfolio);
                        }, 500);
                    }
                });
            };

            // function that returns defail information about showed portfolio item inside of the modal window
            const downloadData = new Promise((resolve, reject) => {
                resolve(import(/* webpackMode: "eager" */ `./portfolioInfo/${src}`));
            });

            if (!portfolioData.length) {
                // if array of the downloaded items is empty then we need to download info about active item without any checking
                downloadData.then((result) => {
                    downloadedItems += `${src} `;
                    const itemData = {
                        filename: src,
                        data: result.default,
                    };
                    portfolioData = [itemData, ...portfolioData];
                    renderData();
                });
            } else {
                // if active item has been downloaded already, we just render it
                if (downloadedItems.includes(src)) {
                    renderData();
                } else {
                    // download and render active item
                    downloadData.then((result) => {
                        downloadedItems += `${src} `;
                        const itemData = {
                            filename: src,
                            data: result.default,
                        };
                        portfolioData = [itemData, ...portfolioData];
                        renderData();
                    });
                }
            }
        };

        const openPortfolioModal = (index) => {
            // show modal window
            openModal(portfolioModal);
            // set which button was used to open the window so this item will be active when user closes the window (I decided to use this functionality to help people with disabilities to open the modal window via Tab button)
            activeItemIndex = index;
            // download portfolio info
            loadPortfolioData(portfolioItems[index]);
        };

        const closePortfolioModal = (type = 'mouse') => {
            closeModal(portfolioModal, type);
            // focus on the item which was used to open the modal window
            portfolioItems[activeItemIndex].focus();
        };

        // show modal window when user clicks on the 'Detail info' button
        portfolioBtn.forEach((element, index) => {
            element.addEventListener('click', () => openPortfolioModal(index));
        });
        // hide modal window when user clicks outside of it's content
        portfolioModal.addEventListener('click', () => closePortfolioModal());
        // let user close it via Esc button
        portfolioModal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closePortfolioModal('keyboard');
            }
        });

        /* smooth appearing on the screen */
        const portfolioInner = document.querySelector('.portfolio__inner');

        if ('IntersectionObserver' in window) {
            const observerCallback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        portfolioInner.style.opacity = '1';
                        portfolioInner.style.transform = 'translateX(0)';
                        observer.unobserve(portfolioInner);
                    }
                });
            };
            const observerOptions = {
                threshold: 0.05,
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            observer.observe(portfolioInner);
        } else {
            portfolioInner.style.transform = 'translateX(0)';
        }
    });
};

export { PortfolioSection };
