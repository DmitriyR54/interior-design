import './Modal.scss';

const openModal = (modal) => {
    // using insertBefore to avoid bug with position fixed and parent element on which has been applied css "transform" property
    document.body.insertBefore(modal, document.querySelector('.header'));
    // implement styles after the previous operation so modal window will be opening smoothly
    setTimeout(() => {
        // show modal window
        modal.classList.add('modal-active');
        // there are situations when extended library focuses
        modal.querySelector('.modal-inner').onclick = (event) => event.stopPropagation();
        document.body.classList.add('no-scroll');
        // let user close it via Esc button
        modal.tabIndex = 0;
        setTimeout(() => {
            modal.focus();
        }, 100);
    }, 0);
};

const closeModal = (modal, type = 'mouse') => {
    const closeFunc = () => {
        // hide modal window
        modal.classList.remove('modal-active');
        document.body.classList.remove('no-scroll');
        // remove inactive modal window from navigation via Tab button
        modal.blur();
        modal.tabIndex = -1;
    };

    if (type === 'mouse') {
        if (event.target.className.includes('modal-active')) {
            closeFunc();
        }
    } else if (type === 'keyboard') {
        closeFunc();
    }
};

export { openModal };
export { closeModal };
