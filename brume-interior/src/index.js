// libraries
import 'core-js/actual';
import _ from 'lodash';
// sections
import { HeaderSection } from 'Sections/Header/Header';
import { IntroSection } from 'Sections/Intro/Intro';
// components
import LazyLoad from 'Components/LazyLoad/LazyLoad';
// styles
import './styles/styles.scss';
import './fonts/fonts.scss';

const bodyContainer = document.body;

const mainContainer = (container) => {
    // root container
    let mainTag = document.createElement('main');
    mainTag.className = 'main';
    // sections
    IntroSection(mainTag);

    return container.appendChild(mainTag);
};

// sections
HeaderSection(bodyContainer);
mainContainer(bodyContainer);
// components
LazyLoad();
