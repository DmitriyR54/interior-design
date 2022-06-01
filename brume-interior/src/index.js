// libraries
import 'core-js/actual';
import _ from 'lodash';
// styles
import './styles/styles.scss';
import './fonts/fonts.scss';
// sections
import { HeaderSection } from 'Sections/Header/Header';
import { IntroSection } from 'Sections/Intro/Intro';
import { FeaturesSection } from 'Sections/Features/Features';
// components
import LazyLoad from 'Components/LazyLoad/LazyLoad';

const bodyContainer = document.body;

const mainContainer = (container) => {
    // root container
    let mainTag = document.createElement('main');
    mainTag.className = 'main';
    // sections
    IntroSection(mainTag);
    FeaturesSection(mainTag);

    return container.appendChild(mainTag);
};

// sections
HeaderSection(bodyContainer);
mainContainer(bodyContainer);
// components
LazyLoad();
