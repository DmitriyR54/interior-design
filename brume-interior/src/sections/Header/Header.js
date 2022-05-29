import headerHtml from './Header.html';
import './Header.scss';
import 'hamburgers/_sass/hamburgers/hamburgers.scss';

const HeaderSection = (container) => {
    container.innerHTML += headerHtml;

    /* 'menu' is not just navigation links, but a burger button too */
    let menuActive = false;

    /* nav tag */
    const headerMenu = document.querySelector('.header__menu');
    /* nav burger button */
    const headerMenuBtn = headerMenu.querySelector('.header__menu-btn');

    headerMenuBtn.onclick = toggleNav;
    /* navigation links list */
    const headerMenuNav = headerMenu.querySelector('.header__nav');
    /* active navigation background */
    const headerMenuNavBg = headerMenu.querySelector('.header__nav-wrapper');

    headerMenuNavBg.onclick = (event) => {
        if (event.target.className === 'header__nav-wrapper nav-active') {
            toggleNav();
        }
    };

    function toggleNav() {
        /* toggle menu status */
        !menuActive ? (menuActive = true) : (menuActive = false);
        headerMenuBtn.classList.toggle('is-active');
        headerMenuNav.classList.toggle('nav-active');
        headerMenuNavBg.classList.toggle('nav-active');
        moveContent();
    }

    /* array of components which will be moved when user opens a navigation (typically the whole page) */
    const movingContent = [document.querySelector('.header')];

    /* this function creates effect of moving aside content */
    function moveContent() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        movingContent.forEach((el) => {
            if (menuActive) {
                /* moving content on the navigation width */
                el.style.transform = `translateX(${headerMenuNav.clientWidth}px)`;
                /* using scrollbar width so content will not "jump" when scrollbar appears after removing 'overflow: hidden' (relevant mostly for pc) */
                el.style.width = `calc(100% - ${scrollbarWidth}px)`;
                document.body.style.overflow = 'hidden';
            } else {
                el.style.transform = `translateX(0px)`;
                /* using a delay so that the scrollbar only shows up when the content is set in place */
                setTimeout(() => {
                    document.body.style.overflow = 'auto';
                    el.style.width = '100%';
                }, 500);
            }
        });
    }
};

export { HeaderSection };
