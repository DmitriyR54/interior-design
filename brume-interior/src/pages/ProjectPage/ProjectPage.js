// styles
import '../../styles/styles.scss';
import '../../fonts/fonts.scss';
import './ProjectPage.scss';
// sections
import { HeaderSection } from 'Sections/Header/Header';
import { FooterSection } from 'Sections/Footer/Footer';
import { ErrorPage } from './ErrorPage/ErrorPage';
// components
import { PageLoader, HidePageLoader } from 'Components/PageLoader/PageLoader';
import { renderProjectData } from './renderProjectData';

const bodyContainer = document.body;

PageLoader(bodyContainer);

// sections
HeaderSection(bodyContainer, 'darkTheme');
FooterSection(bodyContainer);
document.body.insertBefore(document.querySelector('.header'), document.querySelector('.main'));

/* get project name */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const projectName = urlParams.get('name');

document.addEventListener('DOMContentLoaded', () => {
    HidePageLoader(bodyContainer);

    /* download specific file from the database */
    import(`../../data/${projectName}.json`)
        .then((response) => {
            /* render data if the link is correct and such a file exists */
            renderProjectData(response.default);
        })
        .catch((err) => {
            /* or show to the user an error page */
            console.log(err);
            const projectPageInner = document.querySelector('.projectPage__inner');
            ErrorPage(projectPageInner, err);
        });
});
