// styles
import '../../styles/styles.scss';
import '../../fonts/fonts.scss';
import './ProjectPage.scss';
// sections
import { HeaderSection } from 'Sections/Header/Header';
import { FooterSection } from 'Sections/Footer/Footer';
import { ErrorPage } from './ErrorPage/ErrorPage';
// components
import { renderProjectData } from './renderProjectData';

const bodyContainer = document.body;

// sections
HeaderSection(bodyContainer, 'darkTheme');
FooterSection(bodyContainer);
document.body.insertBefore(document.querySelector('.header'), document.querySelector('.main'));

/* get project name */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const projectName = urlParams.get('name');

document.addEventListener('DOMContentLoaded', () => {
    import(`../../data/${projectName}.json`)
        .then((response) => {
            renderProjectData(response.default);
        })
        .catch((err) => {
            console.log(err);
            const projectPageInner = document.querySelector('.projectPage__inner');
            ErrorPage(projectPageInner, err);
        });
});
