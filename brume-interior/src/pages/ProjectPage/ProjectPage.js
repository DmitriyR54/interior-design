// styles
import '../../styles/styles.scss';
import '../../fonts/fonts.scss';
import './ProjectPage.scss';
// sections
import { HeaderSection } from 'Sections/Header/Header';
import { FooterSection } from 'Sections/Footer/Footer';
// components
import { renderProjectData } from './renderProjectData';
import LazyLoad from 'Components/LazyLoad/LazyLoad';

const bodyContainer = document.body;

// sections
HeaderSection(bodyContainer, 'darkTheme');
FooterSection(bodyContainer);
document.body.insertBefore(document.querySelector('.header'), document.querySelector('.main'));

/* get project name */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const projectName = urlParams.get('name');

console.log(projectName);

document.addEventListener('DOMContentLoaded', () => {
    import(`../../data/${projectName}.json`)
        .then((response) => {
            renderProjectData(response.default);
        })
        .catch((err) => console.log(err));
});
