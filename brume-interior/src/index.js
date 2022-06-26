// libraries
import 'core-js/actual';
import _ from 'lodash';
import 'simplebar';
// styles
import './styles/styles.scss';
import './fonts/fonts.scss';
import 'simplebar/dist/simplebar.min.css';

// sections
import { HeaderSection } from 'Sections/Header/Header';
import { IntroSection } from 'Sections/Intro/Intro';
import { FeaturesSection } from 'Sections/Features/Features';
import { PortfolioSection } from 'Sections/Portfolio/Portfolio';
import { ServicesSection } from 'Sections/Services/Services';
import { VideoSection } from 'Sections/VideoSection/VideoSection';
import { StagesSection } from 'Sections/Stages/Stages';
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
    PortfolioSection(mainTag);
    ServicesSection(mainTag);
    VideoSection(mainTag);
    StagesSection(mainTag);

    return container.appendChild(mainTag);
};

// sections
HeaderSection(bodyContainer);
mainContainer(bodyContainer);
// components
document.addEventListener('DOMContentLoaded', () => {
    LazyLoad();
});
