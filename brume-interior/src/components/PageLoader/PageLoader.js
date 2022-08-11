import './PageLoader.scss';

const PageLoader = () => {
    document.body.classList.add('no-scroll');
};

const HidePageLoader = () => {
    document.body.classList.remove('no-scroll');
    const loader = document.querySelector('.pageLoader');
    loader.style.opacity = '0';
    loader.style.zIndex = '-1';
    document.querySelector('.header').style.opacity = '1';
    document.querySelector('.main').style.opacity = '1';
    document.querySelector('.footer').style.opacity = '1';
};

export { PageLoader, HidePageLoader };
