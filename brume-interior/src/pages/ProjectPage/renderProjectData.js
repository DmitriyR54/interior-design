// libraries
import { projectPageCarousel } from './projectPageCarousel/projectPageCarousel';
import { projectPageGallery, galleryPlugin } from './projectPageGallery/projectPageGallery';
import LazyLoad from 'Components/LazyLoad/LazyLoad';

const renderProjectData = (data) => {
    document.querySelector('title').innerHTML = `Brume Interior - ${data.name}`;

    /* render project's name */
    const projectTitle = document.querySelector('.projectPage__title');
    projectTitle.innerHTML = data.name;

    /* render project's description */
    const projectDescr = document.querySelector('.projectPage__description');
    projectDescr.innerHTML = data.description;

    /* render project's category */
    const projectCategory = document.querySelector('.projectPage__meta-category');
    projectCategory.innerHTML = data.category;

    /* render project's date */
    const projectDate = document.querySelector('.projectPage__meta-date');
    projectDate.innerHTML = data.date;

    /* project's gallery DOM element */
    const projectGallery = document.querySelector('.projectPage__gallery');

    /* string to collect all the project's photos */
    let projectPhotos = '';

    data.photos.map((img, index) => {
        import(/* webpackMode: "eager" */ `../../images/lazyload/${img.src}`).then((res) => {
            const imgHref = res.default;

            const imgMarkup = `<a href=${imgHref} data-lg-size="${img.width}-${img.height}" class="projectPage__carousel-slide"> <div class="projectPage__carousel-slide-inner"> <div class="projectPage__carousel-slide--parallax"> <div class="image projectPage__carousel-slide-img"> <img data-src="${img.src}" width="${img.width}" height="${img.height}" class="lazy-image"> </div> </div> </div> </a>`;

            projectPhotos += imgMarkup;

            if (data.photos.length - 1 === index) {
                projectGallery.innerHTML += projectPhotos;
                LazyLoad();
                projectPageGallery();
                projectPageCarousel(galleryPlugin);
            }
        });
    });
};

export { renderProjectData };
