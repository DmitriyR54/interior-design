import lightGallery from 'lightgallery';
import 'lightgallery/scss/lightgallery-bundle.scss';

let galleryPlugin;

const projectPageGallery = () => {
    const galleryContainer = document.querySelector('.projectPage__gallery');

    galleryPlugin = lightGallery(galleryContainer, {
        speed: 500,
    });

    const changeMeta = (scaleValue) => {
        const meta = document.querySelectorAll('meta');
        meta.forEach((el) => {
            if (el.name === 'viewport') {
                el.content = `width=device-width, initial-scale=1.0, user-scalable=${scaleValue}`;
            }
        });
    };

    galleryContainer.addEventListener('lgBeforeOpen', () => {
        changeMeta(1);
    });

    galleryContainer.addEventListener('lgBeforeClose', () => {
        changeMeta(0);
    });
};

export { projectPageGallery, galleryPlugin };
